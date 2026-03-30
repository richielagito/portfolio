"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar.jsx";
import Header from "@/components/Header.jsx";
import Scrollytelling from "@/components/Scrollytelling.jsx";
import LoadingScreen from "@/components/LoadingScreen.jsx";

export default function HomeClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading-screen" onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen overflow-x-clip selection:bg-neutral-800 selection:text-white">
        <Navbar />
        <Header onLoaded={handleLoadComplete} startAnimation={!isLoading} />
        <Scrollytelling />
        {children}
      </div>
    </>
  );
}
