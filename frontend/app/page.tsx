import ChatbotButton from "@/components/chatbot/ChatbotButton";
import AboutSection from "@/components/home/AboutSection";
import CoreValuesSection from "@/components/home/CoreValuesSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import NewsSection from "@/components/home/NewsSection";
import ResearchCPDSection from "@/components/home/ResearchCPDSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <CoreValuesSection />
        <DepartmentsSection />
        <ResearchCPDSection />
        <NewsSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatbotButton />
    </>
  );
}
