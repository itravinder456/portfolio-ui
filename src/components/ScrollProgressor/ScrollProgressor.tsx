import { Mouse } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  // Optionally accept a ref to the scrollable container
  mainRef: { current: HTMLDivElement | null } | null;
};

const ScrollProgressor = ({ mainRef }: Props) => {
  const [progress, setProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const pathname = usePathname(); // Detects route changes

  useEffect(() => {
    const checkScrollable = () => {
      if (mainRef?.current) {
        const { scrollHeight, clientHeight } = mainRef.current;
        setIsScrollable(scrollHeight > clientHeight);
      }
    };

    const handleScroll = () => {
      if (mainRef?.current) {
        const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
        const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setProgress(percent);
      }
    };

    const el = mainRef?.current;
    if (el) {
      checkScrollable();
      el.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", checkScrollable);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [pathname, mainRef]);

  // scroll back to top
  const scrollToTop = React.useCallback(() => {
    mainRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [mainRef]);

  // Reset scroll progress on page change
  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  if (!isScrollable) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200 z-999"
    >
      <svg className="w-10 h-10 transform -rotate-90">
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={
            2 * Math.PI * 18 - (progress / 100) * 2 * Math.PI * 18
          }
          strokeLinecap="round"
        />
      </svg>
      <Mouse className="absolute w-5 h-5 text-gray-600" />
    </button>
  );
};

export default ScrollProgressor;
