import React from "react";
import { useTheme } from "@/hooks/useTheme";

const Hero = () => {

  return (
      <div className={`py-20 flex items-center justify-center`}>
        <div className="text-black flex flex-col gap-5 items-center">
          <div className="text-center font-bold">
            <div className="text-5xl text-purple-600">FlexiConvert</div>
            <div className="text-sm text-purple-400">
              Convert your Images, Securely and easily
            </div>
          </div>
          <div className="md:text-sm text-[10px] text-gray-600 md:w-2/3 px-2 text-center">
            FlexiConvert is a free online tool that lets you easily convert
            images between different formats without needing to download any
            software. Currently supporting a wide range of image formats, just
            upload your file, choose your desired output format, and get
            started!
          </div>
        </div>
      </div>
  );
};

export default Hero;
