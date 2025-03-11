import { useState, useEffect } from "react";

export const useVisibleBlogs = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(window.innerWidth < 768 ? 2 : 4);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateVisibleBlogs = (event: MediaQueryListEvent) => {
      setVisibleBlogs(event.matches ? 2 : 4);
    };

    mediaQuery.addEventListener("change", updateVisibleBlogs);
    return () => mediaQuery.removeEventListener("change", updateVisibleBlogs);
  }, []);

  return visibleBlogs;
};