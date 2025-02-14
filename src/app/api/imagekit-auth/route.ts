import { env } from "@/env";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY,
  privateKey: env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
