import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
