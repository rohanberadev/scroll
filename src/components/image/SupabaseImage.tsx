"use client";

import { getSignedUrl } from "@/server/supabase/storage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export function SupabasePublicImage(props: { publicUrl: string }) {
  const { publicUrl } = props;

  return (
    <Image
      src={publicUrl}
      fill
      loading="lazy"
      alt="image post"
      className="object-cover"
      unselectable="on"
    />
  );
}

export function SupabaseSignedImage(props: {
  file: {
    path: string;
    id: string;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
  };
}) {
  const { file } = props;

  const {
    data: image,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`signed-image${file.id}}`],
    queryFn: () => getSignedUrl(file),
    enabled: Boolean(file),
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ClipLoader size={64} color="white" />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isSuccess && image) {
    return (
      <Image
        src={image.signedUrl}
        fill
        loading="lazy"
        alt="image post"
        className="object-cover"
        unoptimized
        unselectable="on"
      />
    );
  }
}
