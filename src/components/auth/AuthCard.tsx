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
  AuthForm: React.ReactElement;
};

export default function AuthCard({
  headerTitle,
  headerDescription,
  footerLinkHref,
  footerLinkLabel,
  AuthForm,
}: Props) {
  return (
    <Card className="flex w-[400px] flex-col rounded-lg border-gray-200 bg-transparent text-gray-100 max-lg:h-screen max-lg:w-full max-lg:border-none max-lg:px-4 max-lg:py-12">
      <CardHeader>
        <CardTitle className="text-start text-4xl">{headerTitle}</CardTitle>
        <CardDescription className="text-start">
          {headerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 max-lg:flex max-lg:items-center max-lg:justify-center">
        {AuthForm}
      </CardContent>
      <CardFooter className="self-center text-sm text-stone-500 transition-all duration-300 hover:text-stone-300 hover:underline">
        <Link href={footerLinkHref}>{footerLinkLabel}</Link>
      </CardFooter>
    </Card>
  );
}
