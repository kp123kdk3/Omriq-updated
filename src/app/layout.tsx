import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Omriq | The AI Operating Layer for Hotels",
    template: "%s | Omriq",
  },
  description:
    "Omriq is an AI voice agents platform for hotels. Trained on each property’s operations to reduce missed calls, improve bookings, and integrate with core hotel systems.",
  metadataBase: new URL("https://omriq.com"),
  openGraph: {
    title: "Omriq | The AI Operating Layer for Hotels",
    description:
      "AI voice agents trained for your hotel. Answer calls, handle requests, and integrate with hotel systems.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <div className="min-h-dvh">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
