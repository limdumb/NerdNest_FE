import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
  threshold = 0,
  rootMargin = "0px",
  root = null
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef.current, threshold, rootMargin, root]);

  return { targetRef, isIntersecting };
};

export default useIntersectionObserver;
