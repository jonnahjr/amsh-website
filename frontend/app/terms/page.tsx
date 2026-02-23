import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';

export default function TermsPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="section bg-white">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-black text-gray-900 mb-8">Terms & Conditions</h1>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <p><strong>Effectivity Date: May 2024</strong></p>
                        <p>
                            By accessing or using the Amanuel Mental Specialized Hospital (AMSH) website, you agree to be bound by these Terms and Conditions.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Not a Substitute for Medical Advice</h2>
                        <p>
                            The content on this website is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified mental health provider with any questions you may have regarding a medical condition.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Appointment Requests</h2>
                        <p>
                            Submitting an appointment request form does not guarantee an appointment. All appointments are subject to confirmation by hospital staff based on availability and medical urgency.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Professional Conduct</h2>
                        <p>
                            Users are expected to provide accurate information when using our forms. Harassment, abuse, or misuse of our communication channels will result in a permanent ban from digital services and potential legal action.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
