"use client";

import CombinedMap from "@/components/maps/CombinedMap";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    { lat: 42.338847, lng: -71.093807 },
    { lat: 42.339908, lng: -71.0882075 },
    { lat: 32.328695, lng: -90.1821474 },
    { lat: 4.9283746, lng: -75.6232877 },
    { lat: -34.0911616, lng: 18.5324254 },
    { lat: -34.2199301, lng: 18.8347113 },
    { lat: -24.5895433, lng: 25.9474501 },
    { lat: -19.997675, lng: 23.4166986 },
    { lat: 28.1964639, lng: -177.3940806 },
    { lat: 37.8893633, lng: 41.1291598 },
    { lat: 37.6368667, lng: 25.0442779 },
    { lat: 35.3506333, lng: 24.3084846 },
    { lat: 39.9511955, lng: 3.1839338 },
    { lat: 46.9865257, lng: 3.1530328 },
    { lat: 52.1629893, lng: 10.5444657 },
    { lat: 51.6497352, lng: 17.8141469 },
    { lat: 57.153593, lng: 24.8535052 },
    { lat: 62.2393208, lng: 23.7721738 },
    { lat: 57.7826978, lng: 14.1691228 },
    { lat: 63.4723116, lng: 10.900804 },
    { lat: 68.0901948, lng: 21.7019334 },
    { lat: 70.9963697, lng: 24.6622668 },
    { lat: 69.4250283, lng: 30.8264528 },
    { lat: 54.8595128, lng: 21.1060301 },
    { lat: 47.5017751, lng: 19.0348446 },
    { lat: 45.7543865, lng: 22.9041277 },
    { lat: 43.2073264, lng: 23.5515444 },
    { lat: 41.5496983, lng: 20.0592464 },
    { lat: 39.9139284, lng: 20.0270992 },
    { lat: 42.6114027, lng: 19.0288015 },
    { lat: 45.1164333, lng: 15.5860029 },
    { lat: 42.0483112, lng: 13.9309836 },
    { lat: 43.9435158, lng: 12.4448551 },
    { lat: 47.4064937, lng: 8.3974203 },
    { lat: 43.7315207, lng: 7.41717 },
    { lat: 56.541929, lng: -79.2225907 }

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
