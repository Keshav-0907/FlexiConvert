"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  RotateCcw,
  CircleX,
  BadgeCheck,
  Download,
  Hourglass,
  MoveLeft,
  ArrowUp,
  Plus,
} from "lucide-react";
import handleConvert from "@/utils/handleConvert";

type FormatType = "PNG" | "JPG" | "WEBP";


const ConvertFiles = ({ files, setFiles, setShowUploadModal }) => {
  const [selectedFormats, setSelectedFormats] = useState({});
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [conversionStatus, setConversionStatus] = useState("");

  const formatOptions = ["PNG", "JPG", "HEIF", "WEBP"];

  console.log("convertedFiles", convertedFiles);

  const handleFileConversionWrapper = async (
    file: File,
    format: FormatType,
    index: number
  ) => {
    try {
      const blob = await handleConvert(file, format);
      const convertedFileURL = URL.createObjectURL(blob);

      console.log("convertedFileURL", convertedFileURL);

      setConvertedFiles((prev) => [
        ...prev,
        {
          url: convertedFileURL,
          name: `${file.name.split(".")[0]}.${format.toLowerCase()}`,
          format,
        },
      ]);

      // setConversionStatus((prev) => ({ ...prev, [index]: "converted" }));
      console.log(`Successfully converted ${file.name} to ${format}`);
      return blob;
    } catch (error) {
      // setConversionStatus((prev) => ({ ...prev, [index]: "error" }));
      console.error("Error during file conversion:", error);
      throw error;
    }
  };

  const handleRemoveFile = (index) => {
    return () => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setConvertedFiles((prev) => prev.filter((_, i) => i !== index));
      // setConversionStatus((prev) => {
      //   const newStatus = { ...prev };
      //   delete newStatus[index];
      //   return newStatus;
      // });
    };
  };

  const handleReset = () => {
    setFiles([]);
    setSelectedFormats({});
    setConvertedFiles([]);
    setConversionStatus("");
  };

  const handleFormatSelect = (index, format) => {
    setSelectedFormats((prev) => ({ ...prev, [index]: format }));
    handleFileConversionWrapper(files[index], format, index);
  };

  const handleDownload = (index) => {
    const convertedFile = convertedFiles[index];
    if (convertedFile) {
      const link = document.createElement("a");
      link.href = convertedFile.url;
      link.download = convertedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full md:px-0 px-5 ">
      <div className="flex gap-10 items-center justify-between ">
        <div className="flex gap-5 items-center">
          <div>
            <div className="text-sm text-gray-500">
              Total Files: {files.length}
            </div>
          </div>
          <div
            onClick={handleReset}
            className="flex items-center gap-2 border-[1px] border-gray-300 text-gray-500 py-1 px-2 rounded-lg cursor-pointer"
          >
            <RotateCcw size={16} /> Reset
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-5 relative">
        {files.map((file, index) => {
          const fileExtension = file.name.split(".").pop().toUpperCase();
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-xl p-4 border-gray-300 space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="flex items-center gap-2 w-full md:w-auto">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-10 h-10 rounded-lg"
                  alt="file"
                />
                <div className="font-medium flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <div className="truncate max-w-[200px]">{file.name}</div>
                  <div className="text-sm text-gray-500 cursor-pointer">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                </div>
              </div>

              <div className="text-sm w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between w-full md:w-auto rounded-lg p-2 text-black border">
                    <span className="truncate">
                      {selectedFormats[index]
                        ? `${selectedFormats[index]}`
                        : "Convert To"}
                    </span>
                    <ChevronDown size={14} className="ml-2 flex-shrink-0" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Convert to</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {formatOptions.map(
                      (format) =>
                        format !== fileExtension && (
                          <DropdownMenuItem
                            key={format}
                            className={`${
                              selectedFormats[index] === format
                                ? "bg-purple-500 text-white"
                                : ""
                            } cursor-pointer`}
                            onClick={() => handleFormatSelect(index, format)}
                          >
                            {format}
                          </DropdownMenuItem>
                        )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="w-full md:w-auto text-center md:text-left">
                {conversionStatus[index] ? (
                  <div>
                    {conversionStatus[index] === "converting" && (
                      <div className="text-sm text-purple-600">
                        Converting...
                      </div>
                    )}
                    {conversionStatus[index] === "converted" && (
                      <div className="text-sm text-green-600 flex items-center justify-center md:justify-start gap-2">
                        <BadgeCheck size={20} /> Converted
                      </div>
                    )}
                    {conversionStatus[index] === "error" && (
                      <div className="text-sm text-red-600">Error</div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-yellow-600 flex items-center justify-center md:justify-start gap-2">
                    <MoveLeft className="md:flex hidden" size={20} />{" "}
                    <ArrowUp className="md:hidden flex" size={20} /> Specify
                    format
                  </div>
                )}
              </div>

              <div className="w-full md:w-auto">
                {conversionStatus[index] === "converted" && (
                  <button
                    className="bg-purple-500 py-2 px-4 rounded-lg text-white flex items-center justify-center md:justify-start gap-2 w-full md:w-auto"
                    onClick={() => handleDownload(index)}
                    disabled={!convertedFiles[index]}
                  >
                    <Download size={16} />
                    Download
                  </button>
                )}
              </div>

              <div
                onClick={handleRemoveFile(index)}
                className="absolute top-2 right-2 md:static"
              >
                <CircleX className="text-purple-600 cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-center bg-gray-100 py-2 items-center text-sm rounded-lg cursor-pointer hover:bg-gray-300"
        onClick={() => setShowUploadModal(true)}
      >
        <Plus size={20} /> Add more files to convert
      </div>
    </div>
  );
};

export default ConvertFiles;
