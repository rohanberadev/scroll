"use client";

import { createPostFormSchema } from "@/common/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cropper, { type Area as CroppedAreaPixels } from "react-easy-crop";
import { debounce } from "lodash";

import { useDialog, useFiles } from "@/common/store";
import { useCallback, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  caption: z
    .string()
    .min(3, { message: "Description should be atleast 3 character(s) long." }),
  media: z
    .any({
      message: "Please select a file.",
    })
    .refine((file) => file instanceof File && file.size <= 1024 * 1024 * 5, {
      message: "File size must be smaller than 5MB.",
    })
    .refine(
      (file) =>
        file instanceof File &&
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      { message: "Only PNG, JPG and JPEG files are allowed." },
    ),
});

const ImageDialog = ({ file }: { file: File }) => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  // const src = URL.createObjectURL(file);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const onCropComplete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: any, croppedAreaPixels: CroppedAreaPixels) => {
      if (src) {
        console.log("called");
        setCroppedAreaPixels(croppedAreaPixels);
      }
    },
    [src],
  );

  const onImageLoad = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (file: File) => {
      setSrc(URL.createObjectURL(file));
    },
    [],
  );

  useEffect(() => {
    onImageLoad(file);
    console.log("hey render");
  }, []);

  return (
    <AspectRatio ratio={5 / 6}>
      {src && (
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={5 / 6}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      )}
    </AspectRatio>
  );
};

export default function CreatePostForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, setFiles, currentFile, setCurrentFile } = useFiles();
  const { isOpen, onClose, onOpen } = useDialog();

  const convertArrayToFileList = (filesArray: File[]) => {
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files; // returns a FileList
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      caption: "",
      media: undefined,
    },
  });

  const onSubmit = async () => {
    type FormData = z.infer<typeof createPostFormSchema>;
    const formData: FormData = {
      caption: form.getValues().caption,
      media: convertArrayToFileList(files),
    };
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input placeholder="caption" {...field} />
              </FormControl>
              <FormDescription>
                This is your caption for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="media"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Media</FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  id="file"
                  placeholder="caption"
                  {...fieldProps}
                  type="file"
                  accept="images/*"
                  onChange={(e) => {
                    const newFile = e.target.files?.item(0);
                    setCurrentFile(newFile ?? undefined);
                    e.target.value = "";
                    onOpen();
                  }}
                />
              </FormControl>

              <Dialog
                open={isOpen}
                onOpenChange={() => {
                  setCurrentFile(undefined);
                  onClose();
                }}
              >
                <DialogContent className="bg-black lg:absolute lg:left-[60%]">
                  <DialogHeader>
                    <DialogTitle>This is the image preview</DialogTitle>
                    {/* <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription> */}
                  </DialogHeader>
                  {currentFile && <ImageDialog file={currentFile} />}
                </DialogContent>
              </Dialog>

              {/* {files.map((file, index) => {
                const src = URL.createObjectURL(file);
                return (
                  <Image
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="object-cover"
                    width={300}
                    height={400}
                  />
                );
              })} */}

              <Button
                className="flex"
                type="button"
                onClick={() => {
                  const fileInput = document.getElementById("file");
                  fileInput?.click();
                }}
              >
                Upload
              </Button>

              <FormDescription>
                This is your media for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="block">
          Submit
        </Button>
      </form>
    </Form>
  );
}
