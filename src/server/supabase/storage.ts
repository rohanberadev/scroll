import supabase from "@/utils/supabase/server";

export async function uploadImages(
  images: { id: number; src: string }[],
  username: string,
  type: "PUBLIC" | "PRIVATE" | "DRAFT",
) {
  try {
    let bucket: string;
    if (type === "PRIVATE") {
      bucket = "post-private";
    } else if (type === "DRAFT") {
      bucket = "post-draft";
    } else {
      bucket = "post-public";
    }

    const results = await Promise.all(
      images.map(async (image) => {
        const imageResponse = await fetch(image.src);
        const blob = await imageResponse.blob();
        const file = new File([blob], `${crypto.randomUUID()}.webp`, {
          type: "image/webp",
        });
        return supabase.storage
          .from(bucket)
          .upload(`${username}/${file.name}`, file, {
            upsert: false,
          });
      }),
    );

    const uploadedImages = results.map((result) => {
      const { data, error } = result;

      if (error) {
        return { fail: error.message };
      } else {
        return { success: data };
      }
    });

    return { success: uploadedImages };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "Something went wrong!" };
  }
}
