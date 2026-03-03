import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: {
    template: "%s | Amanuel Mental Specialized Hospital",
    default: "Amanuel Mental Specialized Hospital - Specialized Psychiatric Institution",
  },
  description: "Amanuel Mental Specialized Hospital (AMSH) provides comprehensive mental health care in Ethiopia. Services include psychiatry, child psychiatry, addiction treatment, emergency care, and CPD training.",
  keywords: ["mental health", "psychiatry", "Ethiopia", "hospital", "AMSH", "Addis Ababa", "mental health care"],
  authors: [{ name: "AMSH IT Department" }],
  creator: "Amanuel Mental Specialized Hospital",
  publisher: "Ministry of Health, Ethiopia",
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: "https://www.amsh.gov.et",
    siteName: "Amanuel Mental Specialized Hospital",
    title: "Amanuel Mental Specialized Hospital",
    description: "Specialized public mental health institution providing comprehensive psychiatric care since 1930.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AMSH Hospital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanuel Mental Specialized Hospital",
    description: "Specialized mental health institution since 1930.",
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
