import ChatbotButton from "@/components/chatbot/ChatbotButton";
import CoreValuesSection from "@/components/home/CoreValuesSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import ResearchCPDSection from "@/components/home/ResearchCPDSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopSwiper from "@/components/home/TopSwiper";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <TopSwiper />
        <CoreValuesSection />
        <ServicesSection />
        <DepartmentsSection />
        <ResearchCPDSection />
        <NewsSection />
        <TestimonialsSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatbotButton />
    </>
  );
}
