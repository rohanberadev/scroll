"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { motion } from "motion/react";

export default function CreatePost() {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="flex h-[250px] w-full cursor-pointer flex-col items-center justify-center gap-y-4 rounded-md border-[1px] border-dashed border-gray-600 lg:h-[300px] lg:gap-y-6"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <div className="flex flex-col items-center">
        <h1 className="font-bold">Upload file</h1>
        <p className="text-xs text-gray-400">
          Drag and drop or click to upload.
        </p>
      </div>
      <motion.div
        className={cn(
          "flex h-[100px] w-[100px] items-center justify-center rounded-md bg-stone-900 shadow-md transition-all duration-200",
          hover ? "scale-110" : "",
        )}
      >
        <FiUpload className="h-8 w-8" />
      </motion.div>
    </motion.div>
  );
}
