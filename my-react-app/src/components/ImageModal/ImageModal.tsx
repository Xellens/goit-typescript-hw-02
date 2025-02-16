import React from "react";
import s from "./ImageModal.module.css";
import Modal from "react-modal";
import { UnsplashImage } from "../../App";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageData: UnsplashImage | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageData,
}) => {
  const { urls, alt_description, user, likes } = imageData || {};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      closeTimeoutMS={200}
    >
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={s.closeBtn}>
          X
        </button>
        {urls && (
          <img
            src={urls.regular}
            alt={alt_description || "image"}
            className={s.image}
          />
        )}

        <div className={s.info}>
          <p>Likes: {likes}</p>
          {user && <p>Author: {user.name}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
