"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BasicMapResult from "@/components/BasicMapResult";

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userLatParsed, setUserLatParsed] = useState<number | null>(null);
  const [userLngParsed, setUserLngParsed] = useState<number | null>(null);
  const [correctLatParsed, setCorrectLatParsed] = useState<number>(0); // remove correct coord queries once done testing
  const [correctLngParsed, setCorrectLngParsed] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // testing distance (client side for now)
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // Radius of the Earth in meters
    const φ1 = lat1 * (Math.PI / 180); // Convert latitude from degrees to radians
    const φ2 = lat2 * (Math.PI / 180); // Convert latitude from degrees to radians
    const Δφ = (lat2 - lat1) * (Math.PI / 180); // Difference in latitudes
    const Δλ = (lon2 - lon1) * (Math.PI / 180); // Difference in longitudes

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters

    return Math.round(distance);
  }

  useEffect(() => {
    const userLat = searchParams.get("userLat");
    const userLng = searchParams.get("userLng");
    const correctLat = searchParams.get("correctLat");
    const correctLng = searchParams.get("correctLng");

    console.log(`${userLat} ${userLng}`);
    console.log(`${correctLat} ${correctLat}`);
    setUserLatParsed(userLat ? parseFloat(userLat) : null);
    setUserLngParsed(userLng ? parseFloat(userLng) : null);
    setCorrectLatParsed(correctLat ? parseFloat(correctLat) : 0);
    setCorrectLngParsed(correctLng ? parseFloat(correctLng) : 0);
    setLoading(false);
  }, []);

  const nextGame = () => {
    router.push(`/game`); // might need match ID in the future
  };

  const meters = getDistance(
    userLatParsed ?? 0,
    userLngParsed ?? 0,
    correctLatParsed,
    correctLngParsed
  );

  const km = Math.round(meters / 10) / 100;
  const formatter = km > 1 ? `${km} KM` : `${meters} M`;

  const linearDistance = Math.sqrt(
    Math.pow(correctLatParsed - (userLatParsed ?? 0), 2) +
      Math.pow(correctLngParsed - (userLngParsed ?? 0), 2)
  );

  const zoomLevel = (userLatParsed && userLngParsed ? (200 - (linearDistance < 2 ? -linearDistance * 50 : linearDistance)) / 35 : 10)

  return (
    <div>
      {!loading && (
        <BasicMapResult
          userLat={userLatParsed}
          userLng={userLngParsed}
          correctLat={correctLatParsed}
          correctLng={correctLngParsed}
          zoom={zoomLevel}
        />
      )}

      {userLatParsed && userLngParsed && (
        <h2 className="text-center text-4xl text-bold mt-4">
          <b>Distance: {formatter}</b>
        </h2>
      )}

      <button
        onClick={nextGame}
        className=" m-2 mr-5 float-end bg-green-600 pl-40 pr-40 pt-2 pb-2 rounded-full border transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700"
      >
        <b>Next Round</b>
      </button>
    </div>
  );
}
