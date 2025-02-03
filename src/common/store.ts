"use client";

import { type Area as CroppedAreaPixels } from "react-easy-crop";
import { create } from "zustand";

type FilesProps = {
  currentImage: string | undefined;
  images: Array<{ id: number; src: string }>;
  setCurrenImage: (src: string | undefined) => void;
  addImage: (src: string) => void;
  removeImage: (id: number) => void;
};
export const useImage = create<FilesProps>((set) => ({
  currentImage: undefined,
  images: [],
  setCurrenImage: (src) => set({ currentImage: src }),
  addImage: (src) =>
    set((state) => ({
      images: [...state.images, { id: state.images.length, src }],
    })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((image) => image.id !== id),
    })),
}));

type DrawerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useDrawer = create<DrawerProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type CroppedImage = {
  croppedImage: string | undefined;
  setCroppedImage: (imageSrc: string | undefined) => void;
  croppedAreaPixels: CroppedAreaPixels | null;
  setCroppedAreaPixels: (areaPixels: CroppedAreaPixels) => void;
};
export const useCroppedImage = create<CroppedImage>((set) => ({
  croppedImage: undefined,
  setCroppedImage: (imageSrc: string | undefined) =>
    set({ croppedImage: imageSrc }),

  croppedAreaPixels: null,
  setCroppedAreaPixels: (areaPixels: CroppedAreaPixels) =>
    set({ croppedAreaPixels: areaPixels }),
}));
