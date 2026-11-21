import { FileUploadDropzone } from "@/components/saas/forms/file-upload-dropzone";

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
