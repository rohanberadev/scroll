"use client";

import { useCroppedImage } from "@/common/store";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area as CroppedAreaPixels } from "react-easy-crop";
import getCroppedImage from "./cropImage";

type ImageCropperProps = {
  src: string;
  files: File[];
  setFiles: (file: File) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageCropper = ({ src, files, setFiles }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { setCroppedAreaPixels } = useCroppedImage();

  const onCropComplete = useCallback(
    (croppedArea: unknown, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
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
  // const [src, setSrc] = useState<string | undefined>(undefined);
  const { setMainImage, mainImage } = useCroppedImage();

  useEffect(() => {
    setMainImage(URL.createObjectURL(currentFile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2">
      {mainImage && (
        <ImageCropper src={mainImage} files={files} setFiles={setFiles} />
      )}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const { croppedAreaPixels, mainImage, setCroppedImage } = useCroppedImage();

  const showCroppedImage = async () => {
    if (mainImage && croppedAreaPixels) {
      const croppedImage = await getCroppedImage(mainImage, croppedAreaPixels);
      setCroppedImage(croppedImage);

      URL.revokeObjectURL(mainImage);
    }
    handleClose();
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
        <DrawerFooter className="bottom-0 z-50">
          <Button onClick={showCroppedImage}>Submit</Button>
          <DrawerClose onClick={() => onClose()} asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
