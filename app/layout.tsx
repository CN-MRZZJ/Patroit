import type { Metadata, Viewport } from "next";
import "./globals.css";
import Watermark from "@/components/Watermark";

const orgName = process.env.NEXT_PUBLIC_ORG_NAME ?? "";

export const metadata: Metadata = {
  title: "成绩录入",
  description: "体育项目成绩录入系统",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        {children}
        <Watermark orgName={orgName} />
      </body>
    </html>
  );
}
