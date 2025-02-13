"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex w-full items-center justify-center pt-8">
        Invalid Request
      </div>
    );
  }

  const verifyEmail = api.user.verifyEmail.useQuery({ token });

  return (
    <div className="flex w-full flex-col items-center gap-y-8 pt-8">
      {verifyEmail.isLoading && (
        <h1 className="text-2xl">Verifying your email please wait...</h1>
      )}

      {verifyEmail.isError && (
        <h1 className="text-2xl">{verifyEmail.error.message}</h1>
      )}

      {verifyEmail.isSuccess && (
        <h1 className="text-2xl">{verifyEmail.data.success}</h1>
      )}
    </div>
  );
}
