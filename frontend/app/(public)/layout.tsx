'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import ChatbotButton from "@/components/chatbot/ChatbotButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
