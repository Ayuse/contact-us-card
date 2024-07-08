"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bug from "@/assets/bug.svg";
import moduleName from "@/assets/feedback.svg";
import question from "@/assets/question.svg";
import close from "@/assets/close.svg";
import comments from "@/assets/comments.svg";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/app/lib/utils";

import useMeasure from "react-use-measure";
import Content from "./Content";

const Contact = () => {
  const [showCard, setShowCard] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<null | string>(null);
  const [hoverWidth, setHoverWidth] = React.useState("100%");
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowCard(!showCard);
        setCurrentStep(0);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const [elementRef, bounds] = useMeasure();
  const closeCard = () => {
    setShowCard(!showCard);
    setCurrentStep(0);
  };
  const ref = React.useRef(null);
  const handleTabClick = (link: { name: string; step: number }) => {
    setCurrentStep(link.step);
    setActiveTab(link.name);
  };
  const [currentStep, setCurrentStep] = useState(0);
  useOnClickOutside(ref, () => {
    setShowCard(!showCard);
    setCurrentStep(0);
  });
  const links = [
    { name: "Bug Report", icon: bug, step: 1 },
    { name: "Question", icon: question, step: 2 },
    // { name: "Feedback", icon: feedback, step: 3 },
  ];
  return (
    <motion.button className="bg-white h-[100vh] w-[100vw] text-black flex items-center justify-center relative">
      <motion.div
        layout
        className="flex-col drop-shadow-xl bg-white rounded-3xl border overflow-hidden gap-10"
        animate={{ height: bounds.height }}
        transition={{
          duration: showCard ? 0.7 : 0.7,
          type: "spring",
          bounce: !showCard ? 0.4 : 0.4,
        }}
      >
        <motion.div className={cn("p-5")} ref={elementRef}>
          <motion.div
            className="flex items-center justify-around cursor-pointer gap-4 w-full text-nowrap"
            onClick={() => closeCard()}
          >
            <motion.h1
              className="text-xl w-[107px]"
              animate={{ color: showCard ? "#39424a" : "inherit" }}
            >
              Get in touch
            </motion.h1>
            <AnimatePresence mode="popLayout">
              {!showCard && (
                <motion.div
                  className="h-7 w-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Image src={comments} alt="" objectFit="contain" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {showCard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => setShowCard(!showCard)}
                >
                  <div className="bg-[#fcfcfc] border border-[#edeff2] p-3 px-5 w-6 h-5 flex items-center justify-center rounded-md ">
                    <h2 className="text-sm text-[#5e7182]">esc</h2>
                  </div>
                  <Image src={close} alt="" objectFit="contain" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence initial={false}>
            {showCard && (
              <div>
                <motion.div
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="h-px w-full bg-[#edeff2] mt-3" />
                  <div className="flex justify-around bg-[#F8F8FA] border border-[#edeff2] px-1 py-1 rounded-md mt-5 cursor-pointer w-[250px]">
                    {links.map((link, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between text-[#888ea5] relative ",
                          activeTab === link.name && "text-[#161a26]"
                        )}
                        tabIndex={0}
                        onClick={() => handleTabClick(link)}
                      >
                        {activeTab === link.name && (
                          <motion.div
                            layoutId="tab-indicator"
                            className="w-full h-full bg-white absolute rounded-md drop-shadow-sm"
                          />
                        )}
                        <div className="flex p-2">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="pr-1 z-10"
                          >
                            <Image
                              src={link.icon}
                              alt=""
                              width={22}
                              height={22}
                            />
                          </motion.div>
                          <div className="z-10">{link.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, filter: "blur(5px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1, type: "spring" }}
                    >
                      <Content currentStep={currentStep} elementRef />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default Contact;
