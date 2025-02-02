"use client";

import { type Area as CroppedAreaPixels } from "react-easy-crop";
import { create } from "zustand";

type FilesProps = {
  currentFile: File | undefined;
  files: File[];
  setCurrentFile: (file: File | undefined) => void;
  addFiles: (file: File) => void;
};
export const useFiles = create<FilesProps>((set) => ({
  currentFile: undefined,
  files: [],
  setCurrentFile: (file) => set({ currentFile: file }),
  addFiles: (file) => set((state) => ({ files: [...state.files, file] })),
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
  mainImage: string | undefined;
  setMainImage: (src: string) => void;
  croppedImage: string | undefined;
  setCroppedImage: (imageSrc: string | undefined) => void;
  croppedAreaPixels: CroppedAreaPixels | null;
  setCroppedAreaPixels: (areaPixels: CroppedAreaPixels) => void;
};
export const useCroppedImage = create<CroppedImage>((set) => ({
  mainImage: undefined,
  setMainImage: (src: string) => set({ mainImage: src }),

  croppedImage: undefined,
  setCroppedImage: (imageSrc: string | undefined) =>
    set({ croppedImage: imageSrc }),

  croppedAreaPixels: null,
  setCroppedAreaPixels: (areaPixels: CroppedAreaPixels) =>
    set({ croppedAreaPixels: areaPixels }),
}));
