"use client";
import UploadFile from "./UploadFile";
import React from "react";
import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const UploadFileModal = ({ setShowUploadModal, setFiles, files }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const filesToAdd = Array.isArray(acceptedFiles[0])
      ? acceptedFiles.flat()
      : acceptedFiles;

    setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
    console.log("acceptedFiles", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setShowUploadModal(false)}
    >
      <div className="bg-white p-4 rounded-xl">
        <div
          {...getRootProps()}
          className=" px-5 h-60 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer "
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
      </div>
    </div>
  );
};

export default UploadFileModal;
