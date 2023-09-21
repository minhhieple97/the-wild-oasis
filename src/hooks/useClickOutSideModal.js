import { useRef } from "react";
import { useEffect } from "react";

export const useClickOutSideModal = (handler, listenCapturing = true) => {
  const containerRef = useRef();
  useEffect(() => {
    const handleClickEvent = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClickEvent, listenCapturing);
    return () => document.removeEventListener("click", handleClickEvent, listenCapturing);
  }, [handler, listenCapturing]);
  return { containerRef };
};