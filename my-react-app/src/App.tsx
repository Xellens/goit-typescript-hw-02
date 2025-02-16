import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

const ACCESS_KEY = "Yr0MZnS7XWlVT9kqX8vZXuzq61OaU7CghJu8iImCbts";
const PER_PAGE = 12;

export interface UnsplashUrls {
  small: string;
  regular: string;
}

export interface UnsplashUser {
  name: string;
}

export interface UnsplashImage {
  id: string;
  alt_description?: string;
  urls: UnsplashUrls;
  user?: UnsplashUser;
  likes?: number;
}

interface AppState {
  searchQuery: string;
  images: UnsplashImage[];
  page: number;
  loading: boolean;
  error: string | null;
  showModal: boolean;
  modalData: UnsplashImage | null;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<AppState["searchQuery"]>("");
  const [images, setImages] = useState<AppState["images"]>([]);
  const [page, setPage] = useState<AppState["page"]>(1);
  const [loading, setLoading] = useState<AppState["loading"]>(false);
  const [error, setError] = useState<AppState["error"]>(null);
  const [showModal, setShowModal] = useState<AppState["showModal"]>(false);
  const [modalData, setModalData] = useState<AppState["modalData"]>(null);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      toast.error("Please enter something to search.");
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: searchQuery,
              page: page,
              per_page: PER_PAGE,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        const fetchedImages: UnsplashImage[] = response.data.results;

        if (fetchedImages.length === 0 && page === 1) {
          toast.error(`No images found for "${searchQuery}"`);
        }

        setImages((prevImages) => [...prevImages, ...fetchedImages]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (imageData: UnsplashImage) => {
    setModalData(imageData);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalData(null);
    setShowModal(false);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {loading && <Loader />}

      {!loading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {showModal && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          imageData={modalData}
        />
      )}
    </div>
  );
};

export default App;
