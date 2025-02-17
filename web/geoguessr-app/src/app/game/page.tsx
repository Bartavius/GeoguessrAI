"use client";

import CombinedMap from "@/components/CombinedMap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface location {
  lat: number; 
  lng: number;
}

export default function Game() {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const locations: location[] = [
    { lat: 12.3460211, lng: 92.7708896 },
    { lat: 14.959757, lng: 101.830178 },
    { lat: -25.356141, lng: 131.049524 },
    { lat: -11.485286, lng: -40.601977 },
    { lat: 42.892982, lng:  -80.465330 },
    { lat: -0.457913, lng: 37.052430 },
    { lat: 1.039672, lng: 121.949726 },
    { lat: 41.936227, lng: -6.144174 },
  ];

  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  const [correctLat, setCorrectLat] = useState<number>(randomLocation.lat); //remove random func later once hooked
  const [correctLng, setCorrectLng] = useState<number>(randomLocation.lng);

  console.log(correctLat, correctLng);

  const router = useRouter();

  const submitGuess = () => {
    if (lat !== null && lng !== null) {
      router.push(`/game/result?userLat=${lat}&userLng=${lng}&correctLat=${correctLat}&correctLng=${correctLng}`); // will remove query for correct location later once peroperly hooked to backend
    } else {
      router.push(`/game/result?userLat=null&userLng=null&correctLat=${correctLat}&correctLng=${correctLng}`);
    }
  };

  return (
    <div>
      <div className="combined-map-container border-4">
        <CombinedMap setLat={setLat} setLng={setLng} lat={correctLat} lng={correctLng}/>
        <button
          onClick={submitGuess}
          className=" mr-5 float-end bg-green-600 pl-40 pr-40 pt-2 pb-2 rounded-full border transition duration-150 ease-in-out hover:bg-green-700"
        >
          <b>Submit</b>
        </button>
      </div>
    </div>
  );
}
