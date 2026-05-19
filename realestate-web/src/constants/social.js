export const WHATSAPP_NUMBER = '919004015431';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello! I’m interested in discussing a project mandate opportunity with Ananya Realty Advisory.';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/ananyarealtyadvisory/',
  linkedin: 'https://www.linkedin.com/company/ananya-realty-advisory/',
  facebook: 'https://www.facebook.com/ananyarealtyadvisory',
};

/** Opens WhatsApp chat with optional pre-filled message (works on web & desktop app). */
export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}
