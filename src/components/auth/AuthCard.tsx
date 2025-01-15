import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {
  headerTitle: string;
  headerDescription: string;
  footerLinkHref: string;
  footerLinkLabel: string;
};

export default function AuthCard({
  headerTitle,
  headerDescription,
  footerLinkHref,
  footerLinkLabel,
}: Props) {
  return (
    <Card className="flex h-[600px] w-[400px] flex-col rounded-lg border-gray-200 bg-transparent text-gray-100 max-lg:h-screen max-lg:w-full max-lg:border-none">
      <CardHeader>
        <CardTitle className="text-start text-4xl">{headerTitle}</CardTitle>
        <CardDescription className="text-start">
          {headerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1"></CardContent>
      <CardFooter className="self-center text-sm text-stone-500 transition-all duration-300 hover:text-stone-300 hover:underline">
        <Link href={footerLinkHref}>{footerLinkLabel}</Link>
      </CardFooter>
    </Card>
  );
}
