import { Widget } from "@uploadcare/react-widget";

const AddImage = ({ setFormData }) => {
  return (
    <>
      <Widget
        publicKey="a55eb928ec10d4fe67a5"
        id="file"
        onFileSelect={(file) => {
          if (file) {
            file.progress((info) => {
              console.log("file progress: ", info.progress);
            });
            file.done((info) => {
              console.log("file uploaded: ", info.cdnUrl);
              setFormData((prevState) => {
                return { ...prevState, image: info.cdnUrl };
              });
            });
          }
        }}
        onChange={(info) => {
          console.log("upload completed: ", info);
        }}
      />
    </>
  );
};

export default AddImage;
