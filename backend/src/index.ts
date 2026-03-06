import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import settingsRoutes from './routes/settings';
import pagesRoutes from './routes/pages';
import postsRoutes from './routes/posts';
import mediaRoutes from './routes/media';
import servicesRoutes from './routes/services';
import departmentsRoutes from './routes/departments';
import doctorsRoutes from './routes/doctors';
import researchRoutes from './routes/research';
import cpdRoutes from './routes/cpd';
import jobsRoutes from './routes/jobs';
import formsRoutes from './routes/forms';
import appointmentsRoutes from './routes/appointments';
import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';
import analyticsRoutes from './routes/analytics';
import chatbotRoutes from './routes/chatbot';
import navRoutes from './routes/navigation';
import testimonialsRoutes from './routes/testimonials';
import faqRoutes from './routes/faq';
import categoriesRoutes from './routes/categories';
import serviceCategoriesRoutes from './routes/serviceCategories';
import departmentCategoriesRoutes from './routes/departmentCategories';

// Error handler
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// CORS & BASE MIDDLEWARE
// ============================================================
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:", "blob:", "http://localhost:5000"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX || '1000'),
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: 'Too many authentication attempts, please try again later.' },
});
app.use('/api/auth/login', authLimiter);

app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================
// STATIC FILES & ROUTES
// ============================================================
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/settings', settingsRoutes);
apiRouter.use('/pages', pagesRoutes);
apiRouter.use('/posts', postsRoutes);
apiRouter.use('/media', mediaRoutes);
apiRouter.use('/services', servicesRoutes);
apiRouter.use('/departments', departmentsRoutes);
apiRouter.use('/doctors', doctorsRoutes);
apiRouter.use('/research', researchRoutes);
apiRouter.use('/cpd', cpdRoutes);
apiRouter.use('/jobs', jobsRoutes);
apiRouter.use('/forms', formsRoutes);
apiRouter.use('/appointments', appointmentsRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/newsletter', newsletterRoutes);
apiRouter.use('/analytics', analyticsRoutes);
apiRouter.use('/chatbot', chatbotRoutes);
apiRouter.use('/navigation', navRoutes);
apiRouter.use('/testimonials', testimonialsRoutes);
apiRouter.use('/faq', faqRoutes);
apiRouter.use('/categories', categoriesRoutes);
apiRouter.use('/service-categories', serviceCategoriesRoutes);
apiRouter.use('/department-categories', departmentCategoriesRoutes);

app.use('/api', apiRouter);

// Health check
app.get('/health', (_, res) => {
    res.json({
        status: 'OK',
        service: 'AMSH Hospital API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// ============================================================
// ERROR HANDLING
// ============================================================
app.use(errorHandler);

// 404 handler
app.use('*', (_, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ============================================================
// SERVER START
// ============================================================
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        app.listen(PORT, () => {
            console.log(`
🏥 AMSH Hospital API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Server running on port ${PORT}
🌍 Environment: ${process.env.NODE_ENV}
📊 API Base: http://localhost:${PORT}/api
❤️  Health: http://localhost:${PORT}/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

export default app;
