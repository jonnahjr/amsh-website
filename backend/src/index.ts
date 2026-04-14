import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { prisma as prismaService } from './core/db/prisma.service';


const PORT = process.env.PORT || 5000;

// Re-export prisma for legacy routes compatibility
export const prisma = prismaService;

// ============================================================
// AMSH PRODUCTION-GRADE SERVER START
// ============================================================
const startServer = async () => {
  try {
    // 🛡️ Try to connect to Supabase
    await prismaService.connect();
    console.log('✅ AMSH: Production Database Connected (Supabase/Prisma)');
  } catch (error) {
    console.error('⚠️ AMSH: Database connection failed. Please check backend/.env credentials.');
    console.error(error);
    // We continue starting the server so the health check/APIs can return proper error JSONs instead of crashing.
  }

  // 🚀 Start Express Application
  app.listen(PORT, () => {
    console.log(`
🏥 AMSH Institutional Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🚀 Server Live: http://localhost:${PORT}/api/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  });
};

startServer();

// Graceful Shutdown Support
process.on('SIGTERM', async () => {
  console.log('SIGTERM: Disconnecting from Database...');
  await prismaService.disconnect();
  process.exit(0);
});
