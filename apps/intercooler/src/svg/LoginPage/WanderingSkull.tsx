import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

interface WanderingSkullProps {}

export const WanderingSkull: React.FC<WanderingSkullProps> = (props) => {
  const skullRef = useRef(null);
  const x = useMotionValue(0);

  function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const generateWanderPoints = (
    min: number,
    max: number,
    length: number = 10
  ): number[] => {
    const wanderPoints = [0];
    for (let i = 0; i < length; i++) {
      wanderPoints.push(randomIntFromInterval(min, max));
    }
    wanderPoints.push(0);
    return wanderPoints;
  };

  return (
    <motion.svg
      width={749}
      height={729}
      fill="none"
      ref={skullRef}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        bottom: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      {...props}
    >
      <motion.g
        drag
        dragConstraints={skullRef}
        style={{ x }}
        filter="url(#a)"
        animate={{
          x: generateWanderPoints(-800, 1600),
          y: generateWanderPoints(-1000, 1),
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <motion.path
          d="M498.308 632.022c-15.733.537-28.569 12.314-29.27 26.916-.261 4.839.835 9.658 3.18 13.989 2.346 4.331 5.861 8.025 10.205 10.724v4.83c0 1.199.514 2.348 1.429 3.195.915.848 2.155 1.324 3.449 1.324h2.439c.324 0 .634-.119.863-.331.228-.212.357-.499.357-.799v-6.693c-.01-.587.22-1.155.645-1.59a2.577 2.577 0 0 1 1.642-.755 2.62 2.62 0 0 1 .98.13c.314.105.601.268.844.48.243.212.436.467.568.751.132.284.2.59.199.899v6.778c0 .3.129.587.358.799.228.212.539.331.862.331h4.878c.324 0 .634-.119.863-.331.228-.212.357-.499.357-.799v-6.693c-.01-.587.22-1.155.645-1.59a2.577 2.577 0 0 1 1.642-.755 2.62 2.62 0 0 1 .98.13c.314.105.601.268.844.48.243.212.436.467.568.751.132.284.2.59.199.899v6.778c0 .3.129.587.358.799.228.212.539.331.862.331h2.439c1.294 0 2.535-.476 3.45-1.324.915-.847 1.429-1.996 1.429-3.195v-4.83c5.496-3.437 9.632-8.441 11.782-14.252a26.278 26.278 0 0 0 .13-17.95c-2.065-5.838-6.128-10.892-11.573-14.398-5.446-3.506-11.977-5.271-18.603-5.029Zm-9.787 38.383a6.447 6.447 0 0 1-3.388-.952 5.764 5.764 0 0 1-2.246-2.535 5.263 5.263 0 0 1-.347-3.264 5.532 5.532 0 0 1 1.669-2.892 6.262 6.262 0 0 1 3.122-1.546 6.544 6.544 0 0 1 3.523.322 6.013 6.013 0 0 1 2.737 2.08 5.358 5.358 0 0 1 1.028 3.138c-.008 1.496-.653 2.929-1.795 3.986-1.142 1.058-2.688 1.656-4.303 1.663Zm21.953 0a6.444 6.444 0 0 1-3.388-.952 5.764 5.764 0 0 1-2.246-2.535 5.256 5.256 0 0 1-.347-3.264 5.532 5.532 0 0 1 1.669-2.892 6.258 6.258 0 0 1 3.122-1.546 6.544 6.544 0 0 1 3.523.322 6.019 6.019 0 0 1 2.737 2.08 5.358 5.358 0 0 1 1.028 3.138c-.008 1.496-.653 2.929-1.795 3.986-1.142 1.058-2.689 1.656-4.303 1.663Z"
          fill="url(#b)"
          shapeRendering="crispEdges"
        />
      </motion.g>
      <defs>
        <linearGradient
          id="b"
          x1={515.859}
          y1={636.436}
          x2={487.3}
          y2={686.9}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A393EB" />
          <stop offset={1} stopColor="#F5C7F7" stopOpacity={0.87} />
        </linearGradient>
        <filter
          id="a"
          x={469}
          y={632}
          width={70}
          height={69}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={5} dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
      </defs>
    </motion.svg>
  );
};
