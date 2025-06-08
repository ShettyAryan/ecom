import type { Metadata } from "next";
import { Providers } from "./provider";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'], // add other weights if needed
});

export const metadata: Metadata = {
  title: "QuickCart - Aryan Shetty",
  description: "E-Commerce Website with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Toaster />
        <PageLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
