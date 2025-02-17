"use client";

import CombinedMap from "@/components/CombinedMap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Game() {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const router = useRouter();

  const submitGuess = () => {
    if (lat !== null && lng !== null) {
      router.push(`/game/result?userLat=${lat}&userLng=${lng}`);
    } else {
      router.push(`/game/result?userLat=null&userLng=null`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submitGuess();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="combined-map-container border-4">
        <CombinedMap setLat={setLat} setLng={setLng} />
        <button
          onClick={submitGuess}
          className=" mr-5 float-end bg-green-600 pl-40 pr-40 pt-2 pb-2 rounded-full border transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700"
        >
          <b>Submit</b>
        </button>
      </div>
    </div>
  );
}
