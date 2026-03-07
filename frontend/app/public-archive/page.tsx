import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Public Archive | Emmanuel Mental Specialized Hospital',
    description: 'Historical records, public archives, and past communications from Emmanuel Mental Specialized Hospital.',
};

export default function PublicArchivePage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-gray-50 min-h-screen">
                <section className="relative min-h-[40vh] bg-blue-950 flex items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
                                Public <span className="text-gray-400 italic font-medium">Archive</span>
                            </h1>
                            <p className="text-lg text-blue-100/60 max-w-2xl mx-auto leading-relaxed font-medium">
                                Browse historical communications, past health campaigns, and recorded media spanning over 90 years.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container-custom py-16 text-center">
                        <div className="text-6xl mb-6">🗄️</div>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Archive Processing</h2>
                        <p className="text-gray-500 max-w-lg mx-auto mb-8">
                            We are carefully curating decades of institutional records into a digital database. The public archive search will be online soon.
                        </p>
                        <Link href="/news" className="text-blue-600 font-bold hover:text-blue-800 transition-colors uppercase tracking-widest text-sm">
                            ← Return to News
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
