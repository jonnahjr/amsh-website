import path from 'path';
import fs from 'fs';

// ============================================================
// AMSH UNIVERSAL STORAGE DISCOVERY (PRODUCTION PERSISTENCE)
// ============================================================
// This utility ensures that uploaded files are stored in the most 
// persistent location available on the server, preventing data loss 
// when the backend code is updated or redeployed.

const rootDir = path.resolve(__dirname, '../../../'); 
const projectRoot = path.resolve(rootDir, '..');

const paths = {
    safeHarbor: path.resolve(projectRoot, 'uploads'),       // /httpdocs/uploads (Top Level)
    internalStorage: path.resolve(rootDir, 'storage/uploads'), // /httpdocs/backend/storage/uploads
    internalPublic: path.resolve(rootDir, 'public/uploads'),   // /httpdocs/backend/public/uploads
};

/**
 * Returns the best directory for SAVING new uploads.
 * Priority: Top-level uploads > Internal storage > Internal public
 */
export const getUploadBaseDir = () => {
    // 1. Try Safe Harbor (Survived redeploys)
    if (fs.existsSync(paths.safeHarbor)) return paths.safeHarbor;
    
    // 2. Try Internal Storage
    if (fs.existsSync(paths.internalStorage)) return paths.internalStorage;

    // 3. Last resort: Internal public (Self-heal: Create it)
    if (!fs.existsSync(paths.internalPublic)) {
        fs.mkdirSync(paths.internalPublic, { recursive: true });
    }
    return paths.internalPublic;
};

/**
 * Returns all possible directories where files might be stored.
 * Used for SERVING files with fallbacks.
 */
export const getStaticDirs = () => {
    return [paths.safeHarbor, paths.internalStorage, paths.internalPublic];
};

/**
 * Returns diagnostic info about the storage state.
 */
export const getStorageDiagnostics = () => {
    const check = (p: string) => ({
        path: p,
        exists: fs.existsSync(p),
        writable: false // Placeholder
    });

    return {
        rootDir,
        projectRoot,
        paths: {
            safeHarbor: check(paths.safeHarbor),
            internalStorage: check(paths.internalStorage),
            internalPublic: check(paths.internalPublic)
        }
    };
};
