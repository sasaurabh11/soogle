"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Photo from "./Photo";
import Link from "next/link";

export default function SearchBar({ query } : any) {
  const [search, setSearch] = useState("Search Soogle");
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searches = [
    { search: "Saurabh's projects", param: "Saurabh-projects" },
    { search: "life", param: "life" },
    { search: "why hire Saurabh", param: "why-hire-saurabh" },
  ];
  const path = usePathname();

  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);

  useEffect(() => {
    setShowSearch(false);
  }, [search, path]);

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSearch(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full gap-y-6 font-ropaSans ${
        path === "/" && "relative"
      }`}
      style={{ zIndex: 80 }}
    >
      {path === "/" && (
        <div className="absolute -top-44 lg:-top-56">
          <div className="">
            <Photo />
          </div>
          <h2 className="text-white text-6xl lg:text-7xl xl:text-8xl">
            Soogle
          </h2>
        </div>
      )}

      <div
        ref={dropdownRef} // Attach ref to the dropdown container
        className={`flex flex-col items-center shadow-lg ${
          (path !== "/" && "md:absolute w-full top-6 left-48 md:w-2/5 ") ||
          "absolute lg:top-10 w-11/12 md:w-2/3 lg:w-2/5"
        } ${showSearch ? "rounded-3xl" : "rounded-full"} py-2 bg-accent-color`}
      >
        <div className="flex items-center w-full px-4">
          <div
            className="bg-no-repeat w-5 h-5 bg-cover"
            style={{
              backgroundImage: showSearch
                ? "url(icons/arrow.svg)"
                : "url(icons/search.svg)",
            }}
            onClick={() => setShowSearch(!showSearch)}
          />
          <div
            className={`flex-grow px-4 py-2 bg-accent-color focus:outline-none ${
              search === "Search Soogle" ? "text-accent-text" : "text-white"
            }`}
            onClick={() => setShowSearch(!showSearch)}
          >
            {(query && searches.find((item) => item.param === query)?.search) ||
              search}
          </div>

          <div className="flex flex-row justify-center items-center gap-x-2">
            <div
              className="bg-no-repeat w-5 h-5 bg-cover cursor-pointer"
              onMouseEnter={() => setTooltip2(!tooltip2)}
              onMouseLeave={() => setTooltip2(!tooltip2)}
              style={{ backgroundImage: "url(icons/microphone.svg)" }}
            />
            <Link
              className="bg-no-repeat w-5 h-5 bg-cover"
              href={"https://calendly.com/rumeza/one-on-one"}
              target="_blank"
              onMouseEnter={() => setTooltip(!tooltip)}
              onMouseLeave={() => setTooltip(!tooltip)}
              style={{ backgroundImage: "url(icons/calendar.svg)" }}
            />
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              book a call
            </div>
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip2 ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              Nothing bro
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="w-full">
            <div className="border-b border-accent-text mx-4" />
            <h2 className="px-4 font-semibold text-md text-accent-text mt-2">
              Trending searches
            </h2>
            {searches.map((item, idx) => (
              <Link
                className="px-4 flex flex-row items-center w-full gap-x-2 text-[#E5DFFF] py-2 rounded-lg hover:bg-white hover:bg-opacity-5"
                href={`/search?q=${encodeURIComponent(item.param)}`}
                key={idx}
                onClick={() => {
                  setShowSearch(false); // Hide dropdown
                }}
              >
                <div
                  className="bg-no-repeat w-5 h-3 bg-cover"
                  style={{ backgroundImage: "url(icons/trending.svg)" }}
                />
                {item.search}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
