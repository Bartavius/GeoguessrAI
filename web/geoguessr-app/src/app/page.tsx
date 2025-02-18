"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToGame = () => {
    router.push("/game");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <span className="text-6xl">GeoGuessr Clone
      <span className="text-sm"> <br />The styling and connecting to a backend are to be completed. I just gotta focus on my midterms for now...</span>
      </span>
      <img src="/user-marker.webp" alt="user-marker"/>
      <button
        className="bg-green-600 pr-64 pl-64 pt-5 pb-5 rounded-full border-4 hover:bg-green-500 transition ease-in-out duration-300 text-2xl hover:scale-110 active:scale-100 active:bg-green-800"
        onClick={navigateToGame}
      >
        {" "}
        Start{" "}
      </button>
    </div>
  );
}
