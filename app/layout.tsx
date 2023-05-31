import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Nav from "./nav";
import { Suspense } from "react";
import Loader from "./loader";

export const metadata = {
  title: "Organic Traffic Tracker",
  description: "A Organic Traffic Tracker dashboard For Sales Analysis",
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
