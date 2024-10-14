import { useState, useRef, useEffect, LegacyRef } from "react";

// Define the type for the initial visibility state
type InitialVisibilityState = boolean;

// Define the return type of the useVisibility hook
interface UseVisibilityReturn {
  ref: LegacyRef<any>;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useVisibility = (
  initialIsVisible: InitialVisibilityState
): UseVisibilityReturn => {
  const [isVisible, setIsVisible] =
    useState<InitialVisibilityState>(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      ref.current !== event.target &&
      (event.target as HTMLElement).scrollHeight > 200
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
};

export default useVisibility;
