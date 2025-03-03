import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/lib/react-query/ReactQueryProvider";
import BillingContextProvider from "@/provider/BillingContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Powered image generation",
  description: "Generated images using using ai powered flux models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ReactQueryProvider>
          <BillingContextProvider>{children}</BillingContextProvider>
          <Toaster position="bottom-right"/>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
