import { useEffect, useState } from "react";

export function useClickOutside(
  ref: React.RefObject<null | HTMLInputElement>,
  callback: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

export function useLockBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY);

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

export function useViewportWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const updateWidth = () => setWidth(window.innerWidth);
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return width;
}

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
