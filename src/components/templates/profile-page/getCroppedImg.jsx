// canvasUtils.js

// این تابع یک تصویر را از URL می‌گیرد و آن را به عنوان یک عنصر تصویر HTML برمی‌گرداند
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.src = url;
  });

// این تابع زاویه را از درجه به رادیان تبدیل می‌کند
const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;

export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc); // استفاده از await برای بارگذاری تصویر
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

  // مقیاس دادن به ابعاد تصویر
    const scaledWidth = image.width / 2;
    const scaledHeight = image.height / 2;
    
  const safeArea = Math.max(image.width, image.height) * 2;


    canvas.width = safeArea;
    canvas.height = safeArea;
  
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
    
    ctx.drawImage(
      image,
      safeArea / 2 - image.width / 2,
      safeArea / 2 - image.height / 2
    );


  const data = ctx.getImageData(
    safeArea / 2 - image.width / 2  + pixelCrop.x,
    safeArea / 2 - image.height / 2 + pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );


  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
    ctx.putImageData(data, 0, 0);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
          if (blob) {
            const fileName = imageSrc.name;
            const fileType = imageSrc.type;
            const lastModified = imageSrc.lastModified;
            const croppedFile = new File([blob], fileName, { type: fileType, lastModified });
            resolve(croppedFile);
          } else {
            reject(new Error('Canvas is empty'));
          }
        }, 'image/jpeg');
      });
  };
