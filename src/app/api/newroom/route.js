import { NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";

import { stat, mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { sanitizeFilename } from "../../../../utils/replaceName";

import { authOptions } from "../auth/[...nextauth]/route";

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

export async function POST(req) {

  try {
    await connectDB();
    console.log("1");
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    console.log("session", session);
    const user = await User.findOne({ phone: session.user.phone });


    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
    console.log("2");
    const formData = await req.formData();

    const address = await formData.get("address");
    const location = await formData.get("location");
    const about = await formData.get("about");
    const exclusive = await formData.get("exclusive");
    const disabledPeople = await formData.get("disabledPeople");
    const area = await formData.get("area");
    const region = await formData.get("region");
    const type_residance = await formData.get("restype");
    const yard = await formData.get("yard");
    const capacity = await formData.get("capacity");
    const maxCapacity = await formData.get("maxCapacity");
    const room = await formData.get("room");
    const bed = await formData.get("bed");

    const options = await formData.get("options");
    const checktime = await formData.get("checktime");
    const price = await formData.get("price");
    const discount = await formData.get("discount");
    const rules = await formData.get("rules");
    console.log("3");
    const images = [];
    let index = 0;
    let finalFilePaths = [];

    while (formData.has(`images-${index}`)) {
      const image = await formData.get(`images-${index}`);
      images.push(image);
      index++;
    }
    console.log("4");
    for (const imgFile of images) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      // const pathDist = join(process.cwd(), "/public/images/residanceImages");
      // const relativeUploadDir = `${imgFile.name}-${Date.now().toString()}`;
      // const uploadDir = join(pathDist, relativeUploadDir);

      // try {
      //   await stat(uploadDir);
      // } catch (error) {
      //   if (error.code === "ENOENT") {
      //     await mkdir(uploadDir, { recursive: true });
      //   } else {
      //     console.error(
      //       "Error while trying to create directory when uploading a file",
      //       e
      //     );

      //     return NextResponse.json(
      //       { error: `Something went wrong.${error}` },
      //       { status: 500 }
      //     );
      //   }
      // }
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const fileExtension = extname(imgFile.name);
      const originalFilename = imgFile.name.replace(/\.[^/.]+$/, "");
      const sanitizedFilename = sanitizeFilename(originalFilename);
      const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
      /////////// await writeFile(`${uploadDir}/${filename}`, buffer);

      const client = new S3Client({
        region: "default",
        endpoint: process.env.LIARA_ENDPOINT,
        credentials: {
          accessKeyId: process.env.LIARA_ACCESS_KEY,
          secretAccessKey: process.env.LIARA_SECRET_KEY,
        },
      });

      const params = {
        Body: buffer,
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: "jajiga-rooms/" + filename,
      };

      // async/await
      try {
        await client.send(new PutObjectCommand(params));
        console.log("5");
      } catch (error) {
        console.log(error);
      }

      // callback
      client.send(new PutObjectCommand(params), (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          const finalFilePath = `${process.env.GOAL_HOST_URL}/jajiga-rooms/${filename}`;
          finalFilePaths.push(finalFilePath);
        }
      });
      // const finalFilePath =
      //   process.env.NEXT_PUBLIC_IMAGE_PATH + `${relativeUploadDir}/${filename}`;
    }
    // send to database-----------------
    console.log("user-------------", {
      address: JSON.parse(address),
      location: JSON.parse(location),
      about: JSON.parse(about),
      exclusive: JSON.parse(exclusive),
      disabledPeople: JSON.parse(disabledPeople),
      area: +area,
      region: JSON.parse(region),
      type_residance: JSON.parse(type_residance),
      yard: +yard,
      capacity: +capacity,
      maxCapacity: +maxCapacity,
      room: +room,
      bedroom: JSON.parse(bed),
      options: JSON.parse(options),
      checktime: JSON.parse(checktime),
      price: JSON.parse(price),
      discount: +discount,
      rules: JSON.parse(rules),
      images: finalFilePaths,
      userId: user._id,
    });
    const newProfile = await Room.create({
      address: JSON.parse(address),
      location: JSON.parse(location),
      about: JSON.parse(about),
      exclusive: JSON.parse(exclusive),
      disabledPeople: JSON.parse(disabledPeople),
      area: +area,
      region: JSON.parse(region),
      type_residance: JSON.parse(type_residance),
      yard: +yard,
      capacity: +capacity,
      maxCapacity: +maxCapacity,
      room: +room,
      bedroom: JSON.parse(bed),
      options: JSON.parse(options),
      checktime: JSON.parse(checktime),
      price: JSON.parse(price),
      discount: +discount,
      rules: JSON.parse(rules),
      images: finalFilePaths,
      userId: user._id,
    });

    return NextResponse.json({ data: "success" }, { status: 201 });
  } catch (error) {
    console.log("مشکلی در سرور پیش آمده است");
    return NextResponse.json({ data: "error" }, { status: 500 });
  }
}
