
const ImageUploader = ({ onUpload }) => {
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      onUpload(files);
    };
  
    return (
      <input type="file" multiple onChange={handleFileChange} />
    );
  };
  
  export default ImageUploader;