import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import OpenAI from 'openai';

const router = Router();

const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) return null;
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const openai = getOpenAIClient();

const SYSTEM_PROMPT = `You are Emmanuel AI Assistant, a highly intelligent, friendly, and human-like virtual assistant embedded on this website. You are capable of answering any type of question including health, technology, lifestyle, education, entertainment, history, culture, and general advice.

CORE ATTRIBUTES:
- Accurate and informative: Provide factual information whenever possible.
- Friendly and engaging: Use a warm, conversational tone like a helpful human assistant.
- Context-aware: Remember previous messages and provide consistent, flowing answers.
- Dynamic and real-time: Respond naturally, as if talking to a live person.
- Polite and respectful: Always remain courteous and patient.
- Bilingual: Respond fluently in Amharic or English depending on the user’s language.
- Interactive help: Offer suggestions, clarifications, or follow-up questions proactively.

BEHAVIOR RULES:
- Never ignore a question; if unsure, say “I’m not certain, but here’s what I know…”
- Provide examples, analogies, or links if helpful.
- Keep responses concise for readability (use headings/bullets for complex topics) but detailed enough to be valuable.
- Be proactive: if the user seems confused, guide them gently.

HOSPITAL CONTEXT (EMSH):
- You represent Amanuel Mental Specialized Hospital (Established 1930 E.C.).
- History: Pioneers like Dr. Marinko Pavicevic (introduced ECT/EEG) and Dr. Fikre Workeneh.
- Modern Status: 100% Paperless EMR since May 2023.
- Emergency: For psychiatric crises, mandate calling 991 immediately.
- Specifics: Provide accurate info about Adult/Child Psychiatry, Neurology, and Addiction Medicine when asked.

Goal: Make users feel they are chatting with a knowledgeable, helpful, and trustworthy assistant in real-time.`;





// POST /api/chatbot/message
router.post('/message', async (req: AuthRequest, res: Response) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        if (!process.env.OPENAI_API_KEY || !openai) {
            // HIGH-QUALITY LOCAL FALLBACK: If no OpenAI key, use local knowledge base
            const msg = message.toLowerCase();
            let fallbackReply = "";

            if (msg.includes("history") || msg.includes("established") || msg.includes("founded") || msg.includes("አመሰራረት") || msg.includes("ታሪክ")) {
                fallbackReply = "**History of EMSH:** Established in 1930 E.C. (1938 G.C.) during the Italian occupation. EMSH shifted focused to mental health in 1941 to rehabilitate victims of the Graziani massacre. It has been led by pioneers like Dr. Marinko Pavicevic (who introduced ECT & EEG) and Dr. Fikre Workeneh. Since May 2023, we are a 100% paperless facility.";
            } else if (msg.includes("service") || msg.includes("offer") || msg.includes("department") || msg.includes("አገልግሎት")) {
                fallbackReply = "**Our Services:** EMSH offers Emergency Psychiatry (24/7), Outpatient/Inpatient Psychiatry, Child & Adolescent Care, Addiction Medicine, Neurology, and Forensic Psychiatry. Diagnostics include EEG, ECT, Radiology, and ICU. We also serve 17 community health centers.";
            } else if (msg.includes("contact") || msg.includes("phone") || msg.includes("call") || msg.includes("email") || msg.includes("ስልክ")) {
                fallbackReply = "**Contact Information:** \n📞 Emergency: **991** (24/7) \n☎️ Main Office: **+251-111-868-53-85** \n📧 Email: **info@amsh.gov.et** \n📍 Location: Addis Ababa, Ethiopia.";
            } else if (msg.includes("appointment") || msg.includes("book") || msg.includes("see a doctor") || msg.includes("ቀጠሮ")) {
                fallbackReply = "You can book an appointment through our website's 'Book Appointment' portal or by calling our main line at **+251-111-868-53-85**. For psychiatric emergencies, please call **991** immediately.";
            } else if (msg.includes("mission") || msg.includes("vision") || msg.includes("value")) {
                fallbackReply = "**Mission:** Mitigating damage from mental illness through clinical quality and research. \n**Vision 2030:** Africa's leading center of excellence in mental health. \n**Core Value:** Community First!";
            } else {
                fallbackReply = "I’m not certain about the specifics of that question, but here’s what I know: As Emmanuel AI, I am designed to assist you with any topic including **health, technology, education, lifestyle, and history**. \n\nWhile I am currently in a specialized knowledge mode, I can provide expert details on our pioneering medical services or institutional legacy. For very advanced general questions, I recommend checking our official guidelines or reaching out to our support team at **+251-111-868-53-85**. How else can I help you today?";
            }

            return res.json({
                reply: fallbackReply,
                fallback: true,
                note: "Add OPENAI_API_KEY to .env for full unrestricted AI conversational intelligence."
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
