import { useState } from "react";
import SearchResults from "./search-results";
import LoaderCircleIcon from "@/public/icons/loader-circle.svg";
import MagnifyingGlassIcon from "@/public/icons/magnifying-glass.svg";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-5 lg:h-158">
      <label className="relative top-3.5 flex h-10 w-full items-center lg:top-3">
        {isLoading ? (
          <LoaderCircleIcon className="size-6" />
        ) : (
          <MagnifyingGlassIcon className="size-6" />
        )}
        <input
          autoFocus
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="h-full w-4/5 flex-1 appearance-none border-0 bg-transparent py-3 ps-2 pe-0 pr-2 text-base leading-tight -outline-offset-2 outline-none"
        />
      </label>
      <SearchResults query={query} onChange={setIsLoading} />
    </div>
  );
}
