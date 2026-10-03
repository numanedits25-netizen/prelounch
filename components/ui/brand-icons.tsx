// Minimal brand glyphs (lucide v1 ships no brand icons).
type P = { className?: string };
export const InstagramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
  </svg>
);
export const LinkedinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M6.9 8.8H3.8V20h3.1V8.8ZM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.2 13.6c0-3-1.6-4.9-4.2-4.9-1.5 0-2.4.8-2.9 1.5V8.8H10V20h3.1v-5.9c0-1.5.6-2.6 2-2.6 1.3 0 1.9.9 1.9 2.6V20h3.2v-6.4Z" />
  </svg>
);
export const TiktokIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.6 3c.4 2 1.7 3.4 3.9 3.6v3.1c-1.4.1-2.7-.3-3.9-1.1v6.1c0 3.4-2.5 5.8-5.7 5.8-3.1 0-5.6-2.4-5.6-5.5 0-3.4 3-5.9 6.5-5.4v3.2c-1.6-.4-3.3.6-3.3 2.2 0 1.3 1 2.3 2.4 2.3 1.5 0 2.5-1 2.5-2.7V3h3.2Z" />
  </svg>
);
export const XIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
  </svg>
);
