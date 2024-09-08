"use client";
import Image from "next/image";
import Hero from "./_components/Hero";
import UploadFile from "./_components/UploadFile";
import ConvertFiles from "./_components/ConvertFiles";
import { useEffect, useState } from "react";
import UploadFileModal from "./_components/UploadFileModal";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  console.log("files", files);
  return (
    <div className="w-full relative">
      <Hero />
      <div className="flex items-center justify-center flex-col w-full">
        {files.length === 0 ? (
          <UploadFile setFiles={setFiles} />
        ) : (
          <ConvertFiles files={files} setFiles={setFiles} setShowUploadModal={setShowUploadModal}/>
        )}
      </div>
      <div>
        {
          showUploadModal && <UploadFileModal setShowUploadModal={setShowUploadModal} setFiles={setFiles} files={files}/>
        }
      </div>
    </div>
  );
}
