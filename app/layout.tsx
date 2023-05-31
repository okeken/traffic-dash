import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Nav from "./nav";
import { Suspense } from "react";

export const metadata = {
  title: "Next.js 13 + NextAuth + Tailwind CSS",
  description:
    "A user admin dashboard configured with Next.js, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.",
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-90vh">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  );
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
