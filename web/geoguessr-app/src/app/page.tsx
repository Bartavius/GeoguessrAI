"use client";

import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const navigateToGame = () => {
    router.push("/game");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-20">
        <NavBar />
      </div>

      <div
        className="flex-grow z-10 flex flex-col items-center justify-center gap-8 px-4 text-center pt-24 sm:pt-28 md:pt-32"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        {/* Logo goes here */}

        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Plonk Stars
        </h1>
        <button
          className="bg-green-600 px-8 sm:px-16 md:px-32 lg:px-48 py-3 sm:py-4 md:py-5 rounded-full border-4 hover:bg-green-500 transition transform duration-300 text-lg sm:text-xl md:text-2xl lg:text-3xl hover:scale-105 active:scale-100 active:bg-green-800"
          onClick={navigateToGame}
        >
          Start
        </button>
      </div>

      <div className="relative w-full">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto min-h-[20vh] md:min-h-[25vh]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#5000ca"
            fillOpacity="1"
            d="M0,160L40,176C80,192,160,224,240,213.3C320,203,400,149,480,149.3C560,149,640,203,720,202.7C800,203,880,149,960,112C1040,75,1120,53,1200,53.3C1280,53,1360,75,1400,85.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      <div id="contact" className="bg-[#5000ca] w-full min-h-screen -mt-2 transition ease-in-out">
        <div className="mt-16">
          <div className="p-12">
            <span className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Who we are
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
