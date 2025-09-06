"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...props
}: Readonly<ImageWithFallbackProps>) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image {...props} alt={alt ?? "image"} src={imgSrc} onError={handleError} />
  );
};

export default ImageWithFallback;
