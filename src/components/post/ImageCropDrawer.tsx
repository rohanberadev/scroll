"use client";

import { useCroppedImage, useDrawer, useImage } from "@/common/store";
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
import { useCallback, useState } from "react";
import Cropper, { type Area as CroppedAreaPixels } from "react-easy-crop";
import getCroppedImage from "./cropImage";

const ImageCropper = (props: { src: string }) => {
  const { src } = props;
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

const MyDrawerContent = () => {
  const { currentImage } = useImage();

  return (
    <div className="absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2">
      {currentImage && <ImageCropper src={currentImage} />}
    </div>
  );
};

export default function ImageCropDrawer() {
  const { currentImage, setCurrentImage, addImage, images } = useImage();
  const { croppedAreaPixels } = useCroppedImage();
  const { onClose, isOpen } = useDrawer();

  const handleClose = () => {
    if (currentImage) {
      URL.revokeObjectURL(currentImage);
      setCurrentImage(undefined);
    }
    onClose();
  };

  const showCroppedImage = async () => {
    if (currentImage && croppedAreaPixels) {
      const croppedImage = await getCroppedImage(
        currentImage,
        croppedAreaPixels,
      );
      if (croppedImage) {
        addImage(croppedImage);
      }
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
        <MyDrawerContent />
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
