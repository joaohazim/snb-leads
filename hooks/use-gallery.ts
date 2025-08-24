"use client";

import { useState } from "react";

export function useGallery(images: string[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const navigate = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    isOpen,
    currentIndex,
    openGallery,
    closeGallery,
    navigate,
  };
}