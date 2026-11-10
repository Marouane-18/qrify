export const QR_TYPES = [
  {
    id: 'url',
    label: 'Website URL',
    shortLabel: 'URL',
    iconName: 'Globe',
    description: 'Open a website, landing page, or online portfolio',
    placeholder: 'https://example.com',
  },
  {
    id: 'text',
    label: 'Plain Text',
    shortLabel: 'Text',
    iconName: 'FileText',
    description: 'Display any raw text message, code, or memo',
    placeholder: 'Enter your text or note here...',
  },
  {
    id: 'email',
    label: 'Email',
    shortLabel: 'Email',
    iconName: 'Mail',
    description: 'Pre-compose an email with subject and message',
    placeholder: 'contact@example.com',
  },
  {
    id: 'phone',
    label: 'Phone Call',
    shortLabel: 'Phone',
    iconName: 'Phone',
    description: 'Prompt a direct phone call when scanned',
    placeholder: '+1 (555) 019-2834',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    shortLabel: 'WhatsApp',
    iconName: 'MessageSquare',
    description: 'Direct WhatsApp chat with an optional pre-filled text',
    placeholder: '+15551234567',
  },
  {
    id: 'wifi',
    label: 'Wi-Fi Network',
    shortLabel: 'Wi-Fi',
    iconName: 'Wifi',
    description: 'Instantly connect phones to your Wi-Fi without typing passwords',
    placeholder: 'MyHomeWiFi',
  },
  {
    id: 'location',
    label: 'Location',
    shortLabel: 'Location',
    iconName: 'MapPin',
    description: 'Open Google Maps or GPS coordinates on mobile',
    placeholder: '48.8584, 2.2945',
  },
  {
    id: 'vcard',
    label: 'Contact Card (vCard)',
    shortLabel: 'vCard',
    iconName: 'UserCheck',
    description: 'Save full contact information directly to phone address book',
    placeholder: 'John Doe',
  },
];

export const ERROR_LEVELS = [
  {
    level: 'L',
    name: 'Low (7%)',
    description: 'Best for simple data and clean scans with no logo',
  },
  {
    level: 'M',
    name: 'Medium (15%)',
    description: 'Standard balance of density and error resilience',
  },
  {
    level: 'Q',
    name: 'Quartile (25%)',
    description: 'Recommended when placing small logos in the center',
  },
  {
    level: 'H',
    name: 'High (30%)',
    description: 'Maximum resilience. Best for custom logos and outdoor prints',
  },
];

export const COLOR_PRESETS = [
  {
    id: 'classic',
    name: 'Classic Monochrome',
    fg: '#000000',
    bg: '#FFFFFF',
    border: '#E4E4E7',
  },
  {
    id: 'linearDark',
    name: 'Linear Dark',
    fg: '#5E6AD2',
    bg: '#0F1117',
    border: '#23263B',
  },
  {
    id: 'midnight',
    name: 'Midnight Electric',
    fg: '#818CF8',
    bg: '#0B0F19',
    border: '#1E293B',
  },
  {
    id: 'stripe',
    name: 'Stripe Indigo',
    fg: '#635BFF',
    bg: '#FFFFFF',
    border: '#E2E8F0',
  },
  {
    id: 'emerald',
    name: 'Emerald Minimal',
    fg: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  {
    id: 'sunset',
    name: 'Sunset Rose',
    fg: '#E11D48',
    bg: '#FFF1F2',
    border: '#FECDD3',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Amber',
    fg: '#F59E0B',
    bg: '#18181B',
    border: '#3F3F46',
  },
  {
    id: 'ocean',
    name: 'Ocean Cyan',
    fg: '#0284C7',
    bg: '#F0F9FF',
    border: '#BAE6FD',
  },
];

export const PRESET_LOGOS = [
  {
    id: 'none',
    name: 'None',
    src: null,
  },
  {
    id: 'web',
    name: 'Web',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%234F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>',
  },
  {
    id: 'mail',
    name: 'Email',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  },
  {
    id: 'qrify',
    name: 'QRify Mark',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="%236366F1"/><rect x="5" y="5" width="9" height="9" rx="2" stroke="white" stroke-width="2"/><rect x="7.5" y="7.5" width="4" height="4" fill="white"/><rect x="18" y="5" width="9" height="9" rx="2" stroke="white" stroke-width="2"/><rect x="20.5" y="7.5" width="4" height="4" fill="white"/><rect x="5" y="18" width="9" height="9" rx="2" stroke="white" stroke-width="2"/><rect x="7.5" y="20.5" width="4" height="4" fill="white"/><rect x="18" y="18" width="4" height="4" fill="white"/></svg>',
  },
];
