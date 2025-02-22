"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NavBar() {
  const tabs = [
    { tab: "Home", link: "/" },
    { tab: "Singleplayer", link: "/game" },
    { tab: "Login", link: "/login" },
    { tab: "Contact", link: "/#contact"}
  ];

  const router = useRouter();

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1); // Extract the hash after `#`
    if (hash) {
      const section = document.getElementById(hash); // Get the section with the matching ID
      if (section) {
        // Smooth scroll to the section
        window.scrollTo({
          top: section.offsetTop - 100, // Adjust the offset for the navbar (if necessary)
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a href="#" className="text-xl font-bold text-gray-200">
            PlonkStars
          </a>
          <ul className="flex space-x-6">
            {tabs.map((tab) => (
              <li key={tab.tab} className="relative hover:text-gray-300">
                <a href={tab.link}>{tab.tab}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
