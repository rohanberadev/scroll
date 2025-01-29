"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { useCallback, useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Cropper, { type Area as CroppedAreaPixels } from "react-easy-crop";

type ImageCropperProps = {
  src: string;
  files: File[];
  setFiles: (file: File) => void;
};

const ImageCropper = ({ src, files, setFiles }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const onCropComplete = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      croppedArea: any,
      croppedAreaPixels: CroppedAreaPixels,
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
      console.log(croppedAreaPixels);
    },
    [],
  );

  return (
    <Cropper
      image={src}
      crop={crop}
      zoom={zoom}
      aspect={5 / 6}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
      classes={{ containerClassName: "max-h-[500px]" }}
    />
  );
};

type MyDrawerContentProps = {
  currentFile: File;
  files: File[];
  setFiles: (file: File) => void;
};

const MyDrawerContent = ({
  currentFile,
  files,
  setFiles,
}: MyDrawerContentProps) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSrc(URL.createObjectURL(currentFile));

    return () => {
      if (src) {
        URL.revokeObjectURL(src);
      }
    };
  }, []);

  return (
    // absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center
    <div className="absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2">
      {src && <ImageCropper src={src} files={files} setFiles={setFiles} />}
    </div>
  );
};

type ImageCropDrawer = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentFile: File;
  files: File[];
  setFiles: (file: File) => void;
  setCurrentFile: (file: File | undefined) => void;
};

export default function ImageCropDrawer({
  isOpen,
  onOpen,
  onClose,
  currentFile,
  files,
  setFiles,
  setCurrentFile,
}: ImageCropDrawer) {
  const handleClose = () => {
    setCurrentFile(undefined);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="flex h-full w-full border-none bg-black">
        <DrawerHeader className="z-40">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <MyDrawerContent
          currentFile={currentFile}
          files={files}
          setFiles={setFiles}
        />
        <DrawerFooter className="z-50">
          <Button>Submit</Button>
          <DrawerClose onClick={() => onClose()} asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
