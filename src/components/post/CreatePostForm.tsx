<<<<<<< HEAD
"use client";

// import { createPostFormSchema } from "@/common/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDrawer, useFiles } from "@/common/store";
import { useEffect, useState } from "react";
import ImageCropDrawer from "./ImageCropDrawer";
import { IoAddSharp } from "react-icons/io5";

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
  type: z.enum(["DRAFT", "PUBLIC", "PRIVATE"]).default("PUBLIC"),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImagePreviewList = ({ files }: { files: File[] }) => {
  return files.map((file, index) => <ImagePreview file={file} key={index} />);
};

export default function CreatePostForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, setFiles, currentFile, setCurrentFile } = useFiles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDrawer();

  console.log(currentFile);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertArrayToFileList = (filesArray: File[]) => {
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files; // returns a FileList
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      media: undefined,
    },
  });

  const onSubmit = async () => {
    // type FormData = z.infer<typeof createPostFormSchema>;
    // const formData: FormData = {
    //   caption: form.getValues().caption,
    //   media: convertArrayToFileList(files),
    // };
    console.log(form.getValues);
  };

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
        <Input placeholder="caption" className="mt-1 border-gray-600" />
        <p className="mt-2 text-xs text-gray-600">
          This is your caption for your post.
        </p>
        <p></p>
      </div>

      <Input
        className="hidden"
        id="file"
        placeholder="media"
        type="file"
        accept="images/*"
        onChange={(e) => {
          const newFile = e.target.files?.item(0);
          setCurrentFile(newFile ?? undefined);
          e.target.value = "";
          onOpen();
        }}
      />

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

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Media</label>
        <div className="mt-1 flex h-[350px] w-full items-center gap-x-2 overflow-x-auto rounded-sm border-[1px] border-gray-600 p-2">
          <div
            className="flex h-full min-w-[200px] cursor-pointer items-center justify-center rounded-sm border-[1px] border-dashed border-gray-600"
            onClick={() => {
              const fileInput = document.getElementById("file");
              fileInput?.click();
            }}
          >
            <div className="flex flex-col items-center justify-center gap-y-2">
              <IoAddSharp className="h-12 w-12 text-gray-400" />
              <span className="text-xs text-gray-400">
                Add your photos here.
              </span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          This is your media for your post.
        </p>
        <p></p>
      </div>

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Type</label>
        <Select>
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
      </div>

      <Button type="submit" className="block">
        Submit
      </Button>
    </form>
  );
}

// <Form {...form}>
// <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//   <FormField
//     control={form.control}
//     name="caption"
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel>Caption</FormLabel>
//         <FormControl>
//           <Input
//             placeholder="caption"
//             {...field}
//             className="border-gray-600"
//           />
//         </FormControl>
//         <FormDescription>
//           This is your caption for your post.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     )}
//   />

//   <FormField
//     control={form.control}
//     name="media"
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     render={({ field: { value, onChange, ...fieldProps } }) => (
//       <FormItem>
//         <FormLabel>Media</FormLabel>
//         <FormControl>
//           <Input
//             className="hidden"
//             id="file"
//             placeholder="media"
//             {...fieldProps}
//             type="file"
//             accept="images/*"
//             onChange={(e) => {
//               const newFile = e.target.files?.item(0);
//               setCurrentFile(newFile ?? undefined);
//               e.target.value = "";
//               onOpen();
//             }}
//           />
//         </FormControl>

//         {files && <ImagePreviewList files={files} />}

//         {currentFile && (
//           <ImageCropDrawer
//             currentFile={currentFile}
//             files={files}
//             setFiles={setFiles}
//             isOpen={isOpen}
//             onOpen={onOpen}
//             onClose={onClose}
//             setCurrentFile={setCurrentFile}
//           />
//         )}

//         <div className="flex h-[350px] w-full items-center gap-x-2 overflow-x-auto rounded-sm border-[1px] border-gray-600 p-2">
//           <div
//             className="flex h-full min-w-[200px] items-center justify-center rounded-sm border-[1px] border-dashed border-gray-600"
//             onClick={() => {
//               const fileInput = document.getElementById("file");
//               fileInput?.click();
//             }}
//           >
//             <div className="flex flex-col items-center justify-center gap-y-2">
//               <IoAddSharp className="h-12 w-12 text-gray-400" />
//               <span className="text-xs text-gray-400">
//                 Add your photos here.
//               </span>
//             </div>
//           </div>
//         </div>

//         <FormDescription>
//           This is your media for your post.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     )}
//   />

//   <FormField
//     control={form.control}
//     name="type"
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel>Type</FormLabel>
//         <FormControl>
//           <Select onValueChange={field.onChange} value={field.value}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Public" />
//             </SelectTrigger>
//             <SelectContent className="bg-black text-gray-400">
//               <SelectItem value="PUBLIC">Public</SelectItem>
//               <SelectItem value="PRIVATE">Private</SelectItem>
//               <SelectItem value="DRAFT">Draft</SelectItem>
//             </SelectContent>
//           </Select>
//         </FormControl>
//         <FormDescription>
//           This is your visibility type for your post.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     )}
//   />

//   <Button type="submit" className="block">
//     Submit
//   </Button>
// </form>
// </Form>
=======
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDrawer, useFiles } from "@/common/store";
import { useEffect, useState } from "react";
import ImageCropDrawer from "./ImageCropDrawer";
import { IoAddSharp } from "react-icons/io5";

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
  type: z.enum(["DRAFT", "PUBLIC", "PRIVATE"]).default("PUBLIC"),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImagePreviewList = ({ files }: { files: File[] }) => {
  return files.map((file, index) => <ImagePreview file={file} key={index} />);
};

export default function CreatePostForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, setFiles, currentFile, setCurrentFile } = useFiles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDrawer();

  console.log(currentFile);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertArrayToFileList = (filesArray: File[]) => {
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files; // returns a FileList
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      media: undefined,
    },
  });

  const onSubmit = async () => {
    // type FormData = z.infer<typeof createPostFormSchema>;
    // const formData: FormData = {
    //   caption: form.getValues().caption,
    //   media: convertArrayToFileList(files),
    // };
    console.log(form.getValues);
  };

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
        <Input placeholder="caption" className="mt-1 border-gray-600" />
        <p className="mt-2 text-xs text-gray-600">
          This is your caption for your post.
        </p>
        <p></p>
      </div>

      <Input
        className="hidden"
        id="file"
        placeholder="media"
        type="file"
        accept="images/*"
        onChange={(e) => {
          const newFile = e.target.files?.item(0);
          setCurrentFile(newFile ?? undefined);
          e.target.value = "";
          onOpen();
        }}
      />

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

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Media</label>
        <div className="mt-1 flex h-[350px] w-full items-center gap-x-2 overflow-x-auto rounded-sm border-[1px] border-gray-600 p-2">
          <div
            className="flex h-full min-w-[200px] cursor-pointer items-center justify-center rounded-sm border-[1px] border-dashed border-gray-600"
            onClick={() => {
              const fileInput = document.getElementById("file");
              fileInput?.click();
            }}
          >
            <div className="flex flex-col items-center justify-center gap-y-2">
              <IoAddSharp className="h-12 w-12 text-gray-400" />
              <span className="text-xs text-gray-400">
                Add your photos here.
              </span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          This is your media for your post.
        </p>
        <p></p>
      </div>

      <div className="mb-8">
        <label className="ml-1 text-sm text-gray-400">Type</label>
        <Select>
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
      </div>

      <Button type="submit" className="block">
        Submit
      </Button>
    </form>
  );
}
>>>>>>> 25b580c869b1cdc966040dbcb0cfd347906db2fc
