import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: "%s | Emmanuel Mental Specialized Hospital",
    default: "Emmanuel Mental Specialized Hospital - Specialized Psychiatric Institution",
  },
  description: "Emmanuel Mental Specialized Hospital (EMSH) provides comprehensive mental health care in Ethiopia. Services include psychiatry, child psychiatry, addiction treatment, emergency care, and CPD training.",
  keywords: ["mental health", "psychiatry", "Ethiopia", "hospital", "EMSH", "Addis Ababa", "mental health care"],
  authors: [{ name: "EMSH IT Department" }],
  creator: "Emmanuel Mental Specialized Hospital",
  publisher: "Ministry of Health, Ethiopia",
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: "https://www.EMSH.gov.et",
    siteName: "Emmanuel Mental Specialized Hospital",
    title: "Emmanuel Mental Specialized Hospital",
    description: "Specialized public mental health institution providing comprehensive psychiatric care since 1930 E.C.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EMSH Hospital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Mental Specialized Hospital",
    description: "Specialized mental health institution since 1930 E.C.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
