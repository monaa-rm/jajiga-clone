import Compressor from 'compressorjs';

export function compressImage(file) {
  return new Promise((resolve, reject) => { // برای اطمینان از Async بودن
      new Compressor(file, {
          quality: 0.6,
          success(result) {
              resolve(result);
          },
          error(err) {
              reject(err);
          }
      });
  });
}
