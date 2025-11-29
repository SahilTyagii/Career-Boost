"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

const SEARCH_DEBOUNCE_MS = 300;

interface Props {
  routeType: string;
  role: string;
}

function Searchbar({ routeType, role }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // query after debounce delay
  useEffect(() => {
    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(
          `${role === "tnp" ? "/tnp" : "/teacher"}${routeType}?q=` + search
        );
      } else {
        router.push(`${role === "tnp" ? "/tnp" : "/teacher"}${routeType}`);
      }
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, routeType, role]);

  return (
    <div className="searchbar">
      {isSearching ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-1 border-t-transparent" />
      ) : (
        <Image
          src="/assets/search-gray.svg"
          alt="search"
          width={24}
          height={24}
          className="object-contain"
        />
      )}
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Search communities" : "Search creators"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
