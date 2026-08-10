import { FileUploadDropzone } from "@/components/free/file-upload-dropzone";

export default function Example() {
  return (
    <FileUploadDropzone
      accept="image/*,.pdf"
      maxSizeMB={5}
      multiple
      onFilesChange={(files) => console.log("files changed", files.length)}
    />
  );
}
