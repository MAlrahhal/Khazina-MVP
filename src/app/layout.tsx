import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "خزينة | الذكاء المالي المؤسسي",
  description: "منصة ذكاء مالي مدعومة بالذكاء الاصطناعي لدعم قرارات الشركات",
  icons: {
    icon: "/brand/khazina-logo.png",
    apple: "/brand/khazina-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
