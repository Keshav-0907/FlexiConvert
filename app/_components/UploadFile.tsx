"use client";
import React from "react";
import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import toast from "react-hot-toast";

const UploadFile = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log("acceptedFiles", acceptedFiles);
    toast.success("Successfully Added the File!");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="md:w-2/3 px-5 h-60 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100"
    >
      <div className="flex flex-col items-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-500">Drop the files here ...</p>
        ) : (
          <div className="flex items-center flex-col">
            <CloudUpload className="text-purple-600" size={64} />
            <div className="text-gray-600 text-sm">
              Drag and drop your file here or click to browse
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
