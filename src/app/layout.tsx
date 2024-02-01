import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}>
        <div className="flex">
          <div className="bg-red-600 h-screen w-[200px]"></div>
          <div className="p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
