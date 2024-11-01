import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { join, extname } from "path";
import { writeFile, mkdir, stat } from "fs/promises";
import sanitizeFilename from "sanitize-filename";
import { authOptions } from "../[...nextauth]/route";

export async function PATCH(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log("مشکلی در سرور پیش آمده است");
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
  try {
    const formData = await req.formData();
    const imgFile = formData.get("user-image");

    if (!imgFile || typeof imgFile.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Invalid image file" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ phone: session.user.phone });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(await imgFile.arrayBuffer());
    console.log("Buffer size:", buffer.length); // برای بررسی اندازه بافر

    const pathDist = join(process.cwd(), "/public/images/user");
    const relativeUploadDir = `${Date.now().toString()}`;
    const uploadDir = join(pathDist, relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (error) {
      if (error.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file",
          error
        );
        return NextResponse.json(
          { error: `Something went wrong.${error}` },
          { status: 500 }
        );
      }
    }

    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(imgFile.name);
    let originalFilename = imgFile.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    if (originalFilename.length > 255) {
      originalFilename = originalFilename.slice(0, 255);
    }
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;

    if (filename.length > 255) {
      return NextResponse.json(
        { error: "نام فایل بیش از حد طولانی است" },
        { status: 400 }
      );
    }

    await writeFile(`${uploadDir}/${filename}`, buffer);

    const finalFilePath =
      process.env.NEXT_PUBLIC_USER_IMAGE_PATH +
      `${relativeUploadDir}/${filename}`;
    user.image = finalFilePath;
    await user.save();

    return NextResponse.json(
      { data: finalFilePath },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "ذخیره تصویر با مشکل مواجه شد" },
      { status: 500 }
    );
  }
}
