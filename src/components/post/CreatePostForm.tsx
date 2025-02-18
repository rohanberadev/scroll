"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDrawer, useImage } from "@/common/store";
import { cn } from "@/lib/utils";
import { uploadImages } from "@/server/supabase/storage";
import { api } from "@/trpc/react";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import ImageCropDrawer from "./ImageCropDrawer";

export default function CreatePostForm(props: { username: string }) {
  const { username } = props;

  const {
    images,
    setCurrentImage,
    currentImage,
    removeImage,
    removeAllImage,
    isUploadStart,
    setUploadStart,
  } = useImage();
  const { onOpen } = useDrawer();

  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState<{
    type: "caption" | "images" | "postType";
    message: string;
  }>();
  const [error, setError] = useState("");

  const [caption, setCaption] = useState("");
  const [postType, setPostType] = useState("PUBLIC");

  const createPost = api.post.create.useMutation();

  async function onSubmit() {
    setFormError(undefined);

    // Validate form inputs
    if (!caption) {
      setFormError({ type: "caption", message: "Caption is required" });
      return;
    }
    if (!postType) {
      setFormError({ type: "postType", message: "Post type is missing" });
      return;
    }
    if (images.length === 0) {
      setFormError({
        type: "images",
        message: "Please select an image for the post",
      });
      return;
    }
    if (images.length > 5) {
      setFormError({
        type: "images",
        message: "You can upload at most 5 images per post",
      });
      return;
    }

    setUploadStart(true);

    try {
      // Upload images first
      const results = await uploadImages(
        images,
        username,
        postType as "PUBLIC" | "PRIVATE" | "DRAFT",
      );

      if (results.error) {
        setError(results.error);
        setUploadStart(false);
        return;
      }

      const mediaData = results.success
        ?.map((r) => r.success)
        .filter((r) => r !== undefined);
      const failedUploads = results.success
        ?.map((r) => r.fail)
        .filter((r) => r !== undefined);

      if (failedUploads && failedUploads.length > 0) {
        console.error("Some images failed to upload:", failedUploads);
        setError("Some images failed to upload. Please try again.");
        setUploadStart(false);
        return;
      }

      if (!mediaData || mediaData.length === 0) {
        setError("No images uploaded successfully.");
        setUploadStart(false);
        return;
      }

      // Create post
      await createPost
        .mutateAsync({
          caption,
          postType: postType as "PUBLIC" | "PRIVATE" | "DRAFT",
          media: mediaData,
        })
        .then(({ success }) => {
          setSuccess(success);
        })
        .catch((error) => {
          if (error instanceof Error) {
            setError(error.message ?? "Failed to create post");
          }

          setError("Failed to create post");
          return;
        });

      // Clean up image URLs
      images.forEach((image) => URL.revokeObjectURL(image.src));
      removeAllImage();
      setCaption("");
      setPostType("PUBLIC");
    } catch (error) {
      console.error("Error during post submission:", error);
      setError("Something went wrong while creating the post.");
    } finally {
      setUploadStart(false);
    }
  }

  return (
    <form
      className="pt-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit();
      }}
    >
      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Caption</label>
        <Input
          placeholder="caption"
          className="mt-1 border-gray-600"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <p className="mt-2 text-xs text-gray-600">
          This is your caption for your post.
        </p>
        {formError && formError.type === "caption" ? (
          <p className="mt-2 text-sm text-red-600">{formError.message}</p>
        ) : null}
      </div>

      <Input
        className="hidden"
        id="file"
        placeholder="media"
        type="file"
        accept="images/*"
        onChange={(e) => {
          const newImage = e.target.files?.item(0);
          if (newImage) {
            const imageSrc = URL.createObjectURL(newImage);
            setCurrentImage(imageSrc ?? undefined);
            e.target.value = "";
            onOpen();
          }
        }}
      />

      {currentImage && <ImageCropDrawer />}

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Media</label>
        <div className="mt-1 flex h-[350px] w-full select-none items-center gap-x-4 overflow-x-auto rounded-sm border-[1px] border-gray-600 p-2">
          {images.map(({ id, src }) => (
            <div
              key={id}
              className="relative flex h-full min-w-[200px] max-w-[200px] items-center justify-center rounded-sm border-[1px] border-gray-600"
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img src={src} className="object-contain" />
              <button
                className={cn(
                  "absolute right-0 top-0 p-2",
                  isUploadStart ? "hidden" : "",
                )}
                disabled={isUploadStart}
                onClick={async () => {
                  removeImage(id);
                  URL.revokeObjectURL(src);
                }}
              >
                <Trash2Icon className="text-red-600 hover:text-red-400" />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="flex h-full min-w-[200px] cursor-pointer items-center justify-center rounded-sm border-[1px] border-dashed border-gray-600"
            onClick={() => {
              const fileInput = document.getElementById("file");
              fileInput?.click();
            }}
            disabled={isUploadStart}
          >
            <div className="flex flex-col items-center justify-center gap-y-2">
              <IoAddSharp className="h-12 w-12 text-gray-400" />
              <span className="text-xs text-gray-400">
                Add your photos here.
              </span>
            </div>
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          This is your media for your post.
        </p>
        {formError && formError.type === "images" ? (
          <p className="mt-2 text-sm text-red-600">{formError.message}</p>
        ) : null}
      </div>

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Type</label>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="mt-1 w-[180px] border-gray-600">
            <SelectValue placeholder="Public" />
          </SelectTrigger>
          <SelectContent className="border-gray-600 bg-black text-gray-400">
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </SelectContent>
        </Select>

        <p className="mt-2 text-xs text-gray-600">
          This is your visibility type for your post.
        </p>
        {formError && formError.type === "postType" ? (
          <p className="mt-2 text-sm text-red-600">{formError.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        className="block"
        disabled={isUploadStart}
        onClick={onSubmit}
      >
        {isUploadStart ? (
          <ClipLoader size={24} color="white" />
        ) : (
          <span>Submit</span>
        )}
      </Button>
    </form>
  );
}
