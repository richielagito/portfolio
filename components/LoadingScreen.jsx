"use client";

import React from "react";
import { m } from "motion/react";
import Image from "next/image";

const LoadingScreen = () => {
    return (
        <m.div 
            initial={{ height: "100vh" }} 
            exit={{ height: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }} 
            className="fixed top-0 left-0 w-full z-[100] bg-[#fafafa] overflow-hidden origin-top"
        >
            {/* Inner fixed-size container perfectly centered relative to the viewport */}
            <div className="h-[100vh] w-full flex flex-col items-center justify-center">
                <div className="relative w-8 h-8 md:w-12 md:h-12">
                    {/* Logo */}
                    <Image src="/logoRLdark.svg" alt="Logo" width={100} height={100} className="object-contain" priority />
                </div>
            </div>
        </m.div>
    );
};

export default LoadingScreen;
