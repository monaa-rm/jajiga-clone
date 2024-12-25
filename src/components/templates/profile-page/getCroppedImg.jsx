// canvasUtils.js

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
  });

const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;

export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  try {
    const image = await createImage(imageSrc);

    console.log('Image loaded:', image);  // Debugging line to check if image is loaded

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // تعیین ابعاد canvas بر اساس ابعاد تصویر
    const safeArea = Math.max(image.width, image.height);
    canvas.width = safeArea;
    canvas.height = safeArea;

    // چرخش تصویر
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // رسم تصویر
    ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);
    console.log('Canvas dimensions:', canvas.width, canvas.height);  // Debugging line to check canvas size

    // بررسی ابعاد pixelCrop
    if (pixelCrop.width <= 0 || pixelCrop.height <= 0) {
      throw new Error('Invalid pixelCrop dimensions');
    }

    // محدود کردن محدوده کراپ
    const cropX = Math.max(0, pixelCrop.x);
    const cropY = Math.max(0, pixelCrop.y);
    const cropWidth = Math.min(pixelCrop.width, image.width - cropX);
    const cropHeight = Math.min(pixelCrop.height, image.height - cropY);

    console.log('Crop area:', cropX, cropY, cropWidth, cropHeight);  // Debugging line to check crop area

    const data = ctx.getImageData(
      safeArea / 2 - image.width / 2 + cropX,
      safeArea / 2 - image.height / 2 + cropY,
      cropWidth,
      cropHeight
    );

    // تنظیم ابعاد نهایی canvas به اندازه کراپ شده
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.putImageData(data, 0, 0);

    // تبدیل canvas به فایل blob و بازگرداندن آن
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const fileName = imageSrc.name || 'cropped-image.jpg';
          const fileType = imageSrc.type || 'image/jpeg';
          const lastModified = imageSrc.lastModified || Date.now();
          const croppedFile = new File([blob], fileName, { type: fileType, lastModified });
          resolve(croppedFile);
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg');
    });
  } catch (error) {
    console.error('Error during image cropping:', error);
    throw error;
  }
};
