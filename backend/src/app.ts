import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { securityHeaders, globalLimiter } from './core/middlewares/security.middleware';
import { errorHandler } from './core/middlewares/error.middleware';
import { prisma } from './core/db/prisma.service';
import { authenticate, authorize } from './middleware/auth';

// V1 Modular Routes
import authRoutes from './modules/auth/auth.routes';
import postsRoutes from './modules/posts/posts.routes';

// Legacy Routes (Converted/Existing)
import legacyAuthRoutes from './routes/auth';
import legacySettingsRoutes from './routes/settings';
import legacyDoctorsRoutes from './routes/doctors';
import legacyDepartmentsRoutes from './routes/departments';
import legacyDeptCatsRoutes from './routes/departmentCategories';
import legacyServicesRoutes from './routes/services';
import legacyServiceCatsRoutes from './routes/serviceCategories';
import legacyFormsRoutes from './routes/forms';
import legacyCPDRoutes from './routes/cpd';
import legacyResearchRoutes from './routes/research';
import legacyJobsRoutes from './routes/jobs';
import legacyAnalyticsRoutes from './routes/analytics';
import legacyContactRoutes from './routes/contact';
import legacyAppointRoutes from './routes/appointments';
import legacyChatbotRoutes from './routes/chatbot';
import legacyFacebookRoutes from './routes/facebook';
import legacyFAQRoutes from './routes/faq';
import legacyMediaRoutes from './routes/media';
import legacyNavRoutes from './routes/navigation';
import legacyNewsletterRoutes from './routes/newsletter';
import legacyPagesRoutes from './routes/pages';
import legacyTestimonialsRoutes from './routes/testimonials';
import legacyUsersRoutes from './routes/users';
import legacyCategoriesRoutes from './routes/categories';
import institutionsRoutes from './routes/institutions';

const app = express();

// ============================================================
// 🌐 STEP 1: Universal CORS — must be the VERY FIRST middleware
// This handles ALL requests including /uploads before any other middleware
// ============================================================

// Global Pre-flight CORS interceptor (High Priority)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow established origins or echo the current origin for development/flexibility
  // but NEVER use '*' when credentials are included
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Configure CORS for standard Express usage
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Standard validation
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Cookie',
    'Range',
    'Cache-Control',
  ],
  exposedHeaders: ['Content-Length', 'Content-Range', 'Content-Disposition'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS globally — this must come before everything
app.use(cors(corsOptions));

// Handle OPTIONS preflight explicitly for all routes
app.options('*', cors(corsOptions));

// ============================================================
// 🔒 STEP 2: Security headers (after CORS — helmet must not override CORS)
// ============================================================
app.use(morgan('dev'));
app.use(securityHeaders);

import { getStaticDirs, getStorageDiagnostics } from './core/utils/storage';

// ============================================================
// 📁 STEP 3: Automated Storage Discovery (Persistence Guaranteed)
// ============================================================

const staticDirs = getStaticDirs();

console.log('📂 AMSH Persistent Storage Engine 🚀');
staticDirs.forEach(dir => {
  console.log(`   - Path: ${dir} [${fs.existsSync(dir) ? 'FOUND' : 'MISSING'}]`);
});

const staticOptions = {
  setHeaders: (res: Response) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
  },
};

// Universal Static Asset Proxy Tunnel with Force-CORS
const forceStaticCors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
};

// Universal Static Asset Proxy Tunnel with Case-Insensitive & Deep Fallback
const robustStaticServe = (req: Request, res: Response, next: NextFunction) => {
  const relativePath = req.path;
  const decodedPath = decodeURIComponent(relativePath);
  
  const sendWithHeaders = (filePath: string) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.sendFile(filePath);
  };

  // Try exact and case-insensitive in each static directory
  for (const dir of staticDirs) {
    const fullPath = path.join(dir, decodedPath);
    
    // 1. Exact match
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return sendWithHeaders(fullPath);
    }
    
    // 2. Case-insensitive in same folder
    const parentDir = path.dirname(fullPath);
    if (fs.existsSync(parentDir) && fs.statSync(parentDir).isDirectory()) {
      const files = fs.readdirSync(parentDir);
      const filename = path.basename(fullPath).toLowerCase();
      const match = files.find(f => f.toLowerCase() === filename);
      if (match) return sendWithHeaders(path.join(parentDir, match));
    }
  }

  // 3. NUCLEAR FALLBACK: Deep Recursive Search (max 2 levels)
  // Sometimes files are in storage/uploads/s4/ but requested as /s5/ or root.
  const targetFile = path.basename(decodedPath).toLowerCase();
  for (const baseDir of staticDirs) {
    if (!fs.existsSync(baseDir)) continue;
    
    const searchRecursively = (currentDir: string, depth: number): string | null => {
      if (depth > 2) return null;
      try {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        // Check files in current dir
        const match = entries.find(e => e.isFile() && e.name.toLowerCase() === targetFile);
        if (match) return path.join(currentDir, match.name);
        
        // Search subdirectories
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const found = searchRecursively(path.join(currentDir, entry.name), depth + 1);
            if (found) return found;
          }
        }
      } catch (e) { /* ignore read errors */ }
      return null;
    };

    const foundPath = searchRecursively(baseDir, 0);
    if (foundPath) {
      console.log(`🔍 [RECOVERY] Found ${targetFile} at ${foundPath}`);
      return sendWithHeaders(foundPath);
    }
  }
  
  console.log(`❌ [404] Could not find any version of ${decodedPath}`);
  next();
};

// Apply Serving Routes
app.use('/uploads', forceStaticCors, robustStaticServe);
app.use('/api/uploads', forceStaticCors, robustStaticServe);
app.use('/api/media-assets', forceStaticCors, robustStaticServe);

// Also keep express.static as final backup for folders or index files
staticDirs.forEach(dir => {
  app.use('/api/uploads', forceStaticCors, express.static(dir, staticOptions));
});

// Diagnostics endpoint to help debug 404s
app.get('/api/debug/storage', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), (req, res) => {
  res.json({
    cwd: process.cwd(),
    diagnostics: getStorageDiagnostics(),
    notes: 'Safe Harbor (project root uploads) is the most persistent location.'
  });
});

// ============================================================
// 📦 STEP 4: Body parsers and cookie parser
// ============================================================
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());

// ============================================================
// 🧪 Health Check
// ============================================================
app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'UP', 
      database: 'CONNECTED',
      client: 'AMSH Institutional Platform',
      cors: 'ENABLED',
    });
  } catch (error: any) {
    res.status(503).json({ 
      status: 'DOWN', 
      database: 'DISCONNECTED',
      error: error.message,
      hint: 'Check if DATABASE_URL is correct and the database server is reachable.'
    });
  }
});

// ============================================================
// 🚀 API Routes
// ============================================================
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postsRoutes);

app.use('/api/auth', legacyAuthRoutes);
app.use('/api/settings', legacySettingsRoutes);
app.use('/api/doctors', legacyDoctorsRoutes);
app.use('/api/departments', legacyDepartmentsRoutes);
app.use('/api/department-categories', legacyDeptCatsRoutes);
app.use('/api/services', legacyServicesRoutes);
app.use('/api/service-categories', legacyServiceCatsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/forms', legacyFormsRoutes);
app.use('/api/cpd', legacyCPDRoutes);
app.use('/api/research', legacyResearchRoutes);
app.use('/api/jobs', legacyJobsRoutes);
app.use('/api/analytics', legacyAnalyticsRoutes);
app.use('/api/contact', legacyContactRoutes);
app.use('/api/appointments', legacyAppointRoutes);
app.use('/api/chatbot', legacyChatbotRoutes);
app.use('/api/facebook', legacyFacebookRoutes);
app.use('/api/faq', legacyFAQRoutes);
app.use('/api/media', legacyMediaRoutes);
app.use('/api/navigation', legacyNavRoutes);
app.use('/api/newsletter', legacyNewsletterRoutes);
app.use('/api/pages', legacyPagesRoutes);
app.use('/api/testimonials', legacyTestimonialsRoutes);
app.use('/api/users', legacyUsersRoutes);
app.use('/api/categories', legacyCategoriesRoutes);
app.use('/api/institutions', institutionsRoutes);

// 🚨 Global Error Hub
app.use(errorHandler);

export default app;
