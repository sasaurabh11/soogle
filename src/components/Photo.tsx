"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function Photo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] rounded-full overflow-hidden shadow-lg absolute z-10 mix-blend-lighten">
          <Image
            src="/bg-photo.jpg"
            priority
            quality={100}
            fill
            alt="photo"
            className="object-cover"
          />
        </div>

        <motion.svg
          className="w-[101px] h-[101px] xl:w-[150px] xl:h-[150px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "15 120 25 25" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}

export default Photo;
