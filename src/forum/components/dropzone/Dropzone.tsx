import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>Drag and drop some files here, click to select files</p>
      )}
    </div>
  );
}
