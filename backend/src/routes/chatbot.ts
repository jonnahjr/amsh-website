import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the official AI assistant of Amanuel Mental Specialized Hospital (AMSH), Ethiopia's premier public mental health institution established in 1930. 

You help patients, doctors, visitors, and researchers with accurate, professional information about:

🏥 ABOUT AMSH:
- Ethiopia's only public specialized mental health hospital
- Located in Addis Ababa, Ethiopia
- Established in 1930 E.C.
- Government hospital under Ministry of Health

📞 CONTACT:
- Emergency: 991 (24/7 available)
- Main Phone: +251-111-868-53-85
- Email: info@amsh.gov.et
- Website: www.amsh.gov.et

🕒 WORKING HOURS:
- Monday - Friday: 2:30 AM - 10:00 AM (Ethiopian time)
- Emergency services: 24/7

🏥 SERVICES:
- Emergency Psychiatric Services (24/7)
- Outpatient Services (OPD)
- Inpatient Services
- Child & Adolescent Psychiatry
- Addiction Treatment Unit
- EEG Services
- Laboratory Services
- Pharmacy (Enriched)
- Continuing Professional Development (CPD)
- Research & Publications

🏛️ DEPARTMENTS:
- Adult Psychiatry
- Child & Adolescent Psychiatry
- Addiction Medicine
- Emergency Psychiatry
- Neurology
- Clinical Psychology

📋 FOR APPOINTMENTS:
Direct patients to book online through the website or call the main number.

Always be professional, empathetic, and helpful. For medical emergencies, always direct to call 991 immediately.
Do NOT provide specific medical diagnoses or prescriptions. Direct complex medical queries to qualified healthcare professionals.
Keep responses concise, clear, and in English (or Amharic if asked).`;

// POST /api/chatbot/message
router.post('/message', async (req: AuthRequest, res: Response) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        if (!process.env.OPENAI_API_KEY) {
            // Fallback response if no OpenAI key
            return res.json({
                reply: "Thank you for contacting AMSH. Our AI assistant is currently being configured. For immediate assistance, please call our emergency hotline at 991 or our main number at +251-111-868-53-85. Our staff are available 24/7 for emergencies.",
                fallback: true,
            });
        }

        const messages = [
            { role: 'system' as const, content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10), // Keep last 10 messages for context
            { role: 'user' as const, content: message },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content ||
            "I apologize, I couldn't generate a response. Please contact us directly at +251-111-868-53-85.";

        res.json({ reply, usage: completion.usage });
    } catch (error: any) {
        console.error('Chatbot error:', error);
        res.json({
            reply: "I apologize for the inconvenience. For immediate assistance, please call our emergency line at 991 or reach us at +251-111-868-53-85.",
            fallback: true,
        });
    }
});

export default router;
