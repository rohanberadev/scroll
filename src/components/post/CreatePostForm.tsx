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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDrawer, useFiles } from "@/common/store";
import { useEffect, useState } from "react";
import ImageCropDrawer from "./ImageCropDrawer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  caption: z
    .string()
    .min(3, { message: "Description should be atleast 3 character(s) long." }),
  media: z
    .instanceof(File)
    .optional()
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

const ImagePreview = ({ file }: { file: File }) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSrc(URL.createObjectURL(file));

    return () => {
      if (src) {
        URL.revokeObjectURL(src);
      }
    };
  }, []);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Preview"
        className="object-cover"
        width={300}
        height={400}
      />
    );
  }
};

const ImagePreviewList = ({ files }: { files: File[] }) => {
  return files.map((file, index) => <ImagePreview file={file} key={index} />);
};

export default function CreatePostForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, setFiles, currentFile, setCurrentFile } = useFiles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDrawer();

  console.log(currentFile);

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
                  placeholder="media"
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

              {files && <ImagePreviewList files={files} />}

              {currentFile && (
                <ImageCropDrawer
                  currentFile={currentFile}
                  files={files}
                  setFiles={setFiles}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  setCurrentFile={setCurrentFile}
                />
              )}

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
