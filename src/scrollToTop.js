// src/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ reset scroll position whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
