import { useEffect, useState, useRef, MutableRefObject } from 'react';

interface UseInViewOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useInView(
  targetRef: MutableRefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  const { once = true, rootMargin = '0px', threshold = 0.1 } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && targetRef.current) {
            observer.unobserve(targetRef.current);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, once, rootMargin, threshold]);

  return isInView;
}
