import { create } from "zustand";

interface FilesProps {
  currentFile: File | undefined;
  files: File[];
  setCurrentFile: (file: File | undefined) => void;
  setFiles: (file: File) => void;
}
export const useFiles = create<FilesProps>((set) => ({
  currentFile: undefined,
  files: [],
  setCurrentFile: (file) => set({ currentFile: file }),
  setFiles: (file) => set((state) => ({ files: [...state.files, file] })),
}));

interface DrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useDrawer = create<DrawerProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
