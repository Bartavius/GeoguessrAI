"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BasicMapResult from "@/components/BasicMapResult";

export default function Results() {
  const searchParams = useSearchParams();
    const router = useRouter();

  const [userLatParsed, setUserLatParsed] = useState<number | null>(null);
  const [userLngParsed, setUserLngParsed] = useState<number | null>(null);

  useEffect(() => {
    const userLat = searchParams.get("userLat");
    const userLng = searchParams.get("userLng");

    console.log(`${userLat} ${userLng}`)

    setUserLatParsed(userLat ? parseFloat(userLat) : null);
    setUserLngParsed(userLng ? parseFloat(userLng) : null);


  }, [searchParams]);

  const correctlat = 42.345446; // will need to call API for correct location later
  const correctlng = -71.081856;

  const nextGame = () => {
    router.push(`/game`); // might need match ID in the future
  }

  return (
    <div>
      <BasicMapResult
        userLat={userLatParsed}
        userLng={userLngParsed}
        correctLat={correctlat}
        correctLng={correctlng}
      />

<button onClick={nextGame} className=" m-2 mr-5 float-end bg-green-600 pl-40 pr-40 pt-2 pb-2 rounded-full border transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700"><b>Next Round</b></button>
        
    </div>
  );
}