import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const isProd = process.env.NODE_ENV === 'production';

// Global Security Headers — configured to NOT interfere with CORS or image loading
export const securityHeaders = helmet({
  // CRITICAL: Must be false so cross-origin images (from api.amsh.gov.et) load on amsh.gov.et
  crossOriginResourcePolicy: { policy: 'cross-origin' },

  // Allow images/media to be embedded cross-origin
  crossOriginEmbedderPolicy: false,

  // Robust CSP Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "https://api.amsh.gov.et", "https://*.amsh.gov.et", "http://localhost:*"],
      connectSrc: ["'self'", "https://api.amsh.gov.et", "https://*.amsh.gov.et", "http://localhost:*"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
});

// Global Rate Limiter: Prevent scraping/DoS
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: { error: 'Too many requests from this IP.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict Auth Rate Limiter: Prevent brute force
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many login attempts. Please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});
