"use client";

import { useMemo } from "react";
import imageUpload from "@/assets/image-upload.svg";
import Image from "next/image";

const Content = ({ currentStep }: any) => {
  const content = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mt-6 w-[400px]">
            <h2>Send a Screenshot</h2>
            <div className="h-40 w-full border border-[#B9BCCD] rounded-md mt-3">
            <div className="flex flex-col items-center justify-center h-full">
                <Image src={imageUpload} alt="upload" />
                <p className="text-[#B9BCCD] mt-3">
                  Drag and drop your image here
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mt-6 w-[400px]">
            <h2>What did you find</h2>
            <div className="h-60 w-full border border-[#B9BCCD] rounded-md mt-3">
              
            </div>
          </div>
        );
      case 3:
        return (
          <div className="mt-6 w-[400px]">
            <h2>FAQ</h2>
            <div className="h-80 w-full border border-[#B9BCCD] rounded-md mt-3"></div>
          </div>
        );
      default:
        return null;
    }
  }, [currentStep]);

  return <>{content}</>;
};

export default Content;

<div className="flex justify-between p-3">
  <h1
    className="text-xl font-medium"
  >
    Get in touch
  </h1>
</div>;
