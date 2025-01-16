"use client";

import { auth } from "@/server/auth";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const testStream = api.test.generate.useQuery();

  return (
    <main>
      <div className="text-4xl text-white">Home</div>
    </main>
  );
}
