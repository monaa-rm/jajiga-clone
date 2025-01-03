import heic2any from "heic2any"; // اطمینان از وجود این ماژول

export function convertHEIC(file) {
  return new Promise((resolve, reject) => {
    // بررسی اینکه ورودی از نوع Blob است
    if (!(file instanceof Blob)) {
      reject(new Error("Input must be a Blob."));
      return;
    }

    // ایجاد یک FileReader برای خواندن فایل
    const reader = new FileReader();
    // وقتی که فایل به پایان خواندن رسید
    reader.onloadend = () => {
      // استفاده از heic2any برای تبدیل HEIC به JPEG
      heic2any({
        blob: new Blob([reader.result]), // استفاده از Blob از نتیجه خواندن
        toType: "image/jpeg", // تبدیل به JPEG
      })
        .then((convertedBlob) => {
          resolve(convertedBlob); // برگشت دادن Blob JPEG نهایی
        })
        .catch((error) => {
          reject(error); // در صورت بروز خطا
        });
    };

    // در صورت بروز خطا در خواندن فایل
    reader.onerror = (error) => {
      reject(new Error("Error reading the file: " + error.message));
    };


    
export const normalConvertHEICToJPEG = async (heicBlob) => {
  try {
    const jpegBlob = await heic2any({
      blob: heicBlob,
      toType: "image/jpeg",
      quality: 0.8, // کیفیت JPEG را تنظیم کنید (0 تا 1)
    });
    return jpegBlob;
  } catch (error) {
    console.error("Error converting HEIC to JPEG:", error);
    throw new Error("Failed to convert HEIC to JPEG"); // خطا را به تابع فراخوان ریدایرکت می کنیم.
  }
};


    // خواندن فایل HEIC به‌صورت ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}
