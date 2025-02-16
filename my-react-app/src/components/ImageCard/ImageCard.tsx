import React from "react";
import s from "./ImageCard.module.css";
import { UnsplashImage } from "../../App";

interface ImageCardProps {
  image: UnsplashImage;
  onClick: (imageData: UnsplashImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const { urls, alt_description } = image;

  const handleClick = () => {
    onClick(image);
  };

  return (
    <div className={s.card}>
      <img
        src={urls.small}
        alt={alt_description || "image"}
        className={s.image}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
