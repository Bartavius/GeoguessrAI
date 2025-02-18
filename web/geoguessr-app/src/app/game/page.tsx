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
    { lat: 78.223728, lng: 15.633955 },
    { lat: 13.904834, lng: -4.555679 },
    { lat: -3.489353, lng: 36.162594 },
    { lat: 0.823337, lng: 24.454135 },
    { lat: 29.1037529, lng: -13.4728803 },
    { lat: 0.359676, lng: 6.702448 },
    { lat: 23.587131, lng: 58.457222 },
    { lat: 39.043605, lng: 125.75801 },
    { lat: 43.0662479, lng: 131.9122197 },
    { lat: 46.7711772, lng: 142.3433649 },
    { lat: 6.542121, lng: -58.2291451 },
    { lat: -25.0688603, lng: -130.0959588 },
    { lat: 81.4123871, lng: -76.8393025 },
    { lat: 81.6647089, lng: -76.4930553 },
    { lat: -77.7128275, lng: 162.5976575 },
    { lat: -62.1503456, lng: -58.9429835 },
    { lat: -52.1858144, lng: -58.8390295 },
    { lat: 38.716615, lng: -27.3497239 },

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
      <div className="combined-map-container">
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
