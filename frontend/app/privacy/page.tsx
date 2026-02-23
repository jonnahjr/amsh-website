import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';

export default function PrivacyPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="section bg-white">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <p><strong>Last Updated: May 2024</strong></p>
                        <p>
                            Amanuel Mental Specialized Hospital (AMSH) is committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy describes how we collect, use, and protect your data when you use our website and services.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us through our appointment booking forms, contact forms, job applications, and newsletter subscriptions. This may include your name, email address, phone number, and medical history shared for appointment purposes.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Medical Confidentiality</h2>
                        <p>
                            Any medical information shared through our platforms is handled with the highest level of confidentiality in accordance with Ethiopian healthcare laws and medical ethics. This data is only accessible to authorized medical personnel involved in your care.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Use of Information</h2>
                        <p>
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Process and confirm your medical appointments</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Evaluate job and research applications</li>
                            <li>Send hospital announcements and health newsletters</li>
                            <li>Improve our website and services through anonymous analytics</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Data Security</h2>
                        <p>
                            We implement robust security measures, including SSL encryption and restricted access protocols, to protect your data from unauthorized access, alteration, or disclosure.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
