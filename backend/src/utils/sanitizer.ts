/**
 * CMS-Grade HTML Sanitizer
 * Removes potentially malicious tags and attributes while preserving formatting.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  // 1. Remove obvious script/malicious tags
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');

  // 2. Remove on* event handlers (onclick, onmouseover, alert, etc.)
  sanitized = sanitized.replace(/\son\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/\son\w+='[^']*'/gi, '');
  sanitized = sanitized.replace(/\son\w+=[^\s>]+/gi, '');

  // 3. Remove javascript: pseudo-protocol
  sanitized = sanitized.replace(/href\s*=\s*["']?javascript:[^"'>]*["']?/gi, 'href="#"');

  return sanitized.trim();
};
