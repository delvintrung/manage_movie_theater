import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { ChatWidget } from "@/components/chat/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Theater My Life - Premium Cinema Experience",
  description: "Book your movie tickets online with Theater My Life. Experience the best in cinema with comfortable seating, premium sound, and the latest blockbusters.",
  keywords: "cinema, movie tickets, theater, booking, entertainment",
  authors: [{ name: "Theater My Life" }],
  openGraph: {
    title: "Theater My Life - Premium Cinema Experience",
    description: "Book your movie tickets online with Theater My Life",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
