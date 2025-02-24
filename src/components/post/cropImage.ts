"use client";

import { type Area as CroppedAreaPixels } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) =>
      reject(new Error(error.message)),
    );
    image.src = url;
  });
}

export default async function getCroppedImage(
  imageSrc: string,
  pixelCrop: CroppedAreaPixels,
): Promise<string | undefined> {
  const image = await createImage(imageSrc).catch(() => null);

  if (!image) {
    throw new Error("Cannot create image!");
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  if (!ctx) {
    throw new Error("Cannot get canvas context!");
  }

  // Draw only the cropped part of the image
  ctx.drawImage(
    image,
    pixelCrop.x, // Source x (cropping start point)
    pixelCrop.y, // Source y (cropping start point)
    pixelCrop.width, // Source width
    pixelCrop.height, // Source height
    0, // Destination x
    0, // Destination y
    pixelCrop.width, // Destination width
    pixelCrop.height, // Destination height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (file) => {
        if (file) resolve(URL.createObjectURL(file));
        else reject(new Error("Cannot create a image blob!"));
      },
      "image/jpeg",
      0.7,
    );
  });
}
