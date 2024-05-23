import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const useResponsiveImage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [imageSrc, setImageSrc] = useState("/bg-mobile.png");

  useEffect(() => {
    if (isDesktop) {
      setImageSrc("/bg-desktop.png");
    } else {
      setImageSrc("/bg-mobile.png");
    }
  }, [isDesktop]);

  return imageSrc;
};
export default useResponsiveImage;