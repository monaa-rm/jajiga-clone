import ProfilePage from "@/components/templates/profile-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";  // استفاده از notFound برای ریدایرکت به صفحه 404
import User from "../../../models/User";
import connectDB from "../../../utils/connectDb";


export async function generateMetadata({ params, }) {
  const siteURL = 'http://localhost:3000';
  const session = await getServerSession(authOptions);
  return {
     title:`${session?.user?.name} | حساب کاربری`,
     description: `حساب کاربری،ویرایش حساب کاربری`,
     alternates: {
        canonical: `${siteURL}/profile`,
     },
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}



const Profile = async () => {
  // بررسی نشست کاربر
  const session = await getServerSession(authOptions);
  
  // در صورتی که نشست وجود نداشته باشد، به صفحه اصلی ریدایرکت می‌کنیم
  if (!session) {
    notFound();  // می‌توانید از notFound برای ارجاع به صفحه 404 استفاده کنید یا از redirect
    return null;  // برای اطمینان از برگشت null به عنوان کامپوننت
  }
  
  console.log("1");

  // اتصال به دیتابیس
  await connectDB();

  // جستجو برای کاربر
  const data = await User.findOne({ phone: session?.user?.phone });

  // اگر کاربری یافت نشد، به صفحه اصلی ریدایرکت می‌کنیم
  if (!data) {
    console.log("2");
    notFound();  // یا می‌توانید از redirect استفاده کنید
    return null;  // برگشت null برای اطمینان از نداشتن خروجی
  }
  
  console.log("3" ,data);

  // ارسال داده‌ها به صفحه پروفایل
  return <ProfilePage user={JSON.parse(JSON.stringify(data))} />;
};

export default Profile;
