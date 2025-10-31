import Modal from "./modal";
import SearchBar from "./searchbar";
import { useState, useRef } from "react";
import { useClickOutside } from "../lib/hooks";
import MagnifyingGlassIcon from "@/public/icons/magnifying-glass.svg";

export default function Search() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useClickOutside(modalRef, setShowModal);

  return (
    <div className="flex">
      <button
        onClick={() => setShowModal(!showModal)}
        className="group/search cursor-pointer transition-opacity duration-200 xl:flex xl:min-w-[36.0625rem] xl:flex-row-reverse xl:items-start xl:[justify-content:start] xl:gap-3 xl:rounded-[3.875rem] xl:bg-[#F0F0F0] xl:px-4 xl:py-3"
      >
        <span className="sr-only xl:not-sr-only xl:text-base xl:leading-5.5 xl:font-normal xl:text-[rgba(0,0,0,0.4)] xl:not-italic">
          Search for products...
        </span>
        <MagnifyingGlassIcon className="size-6 shrink-0 text-black group-hover/search:text-[rgba(0,0,0,0.4)] xl:text-[rgba(0,0,0,0.4)]" />
      </button>
      <Modal
        ref={modalRef}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <SearchBar />
      </Modal>
    </div>
  );
}
