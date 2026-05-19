export const FORM_TYPES = {
  CONTACT: 'Contact Us',
  ENQUIRY: 'Enquiry',
  HERO_ENQUIRY: 'Homepage — Enquire Now',
  CAREER: 'Career Application',
  NEWSLETTER: 'Newsletter Subscription',
};

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * @param {Object} options
 * @param {string} options.formType
 * @param {Record<string, string>} options.fields
 * @param {string} [options.userEmail]
 * @param {string} [options.userName]
 * @param {FormData} [options.formData] - Pre-built multipart (career + resume)
 * @param {File} [options.resumeFile]
 */
export async function submitWebsiteForm({
  formType,
  fields,
  userEmail,
  userName,
  formData = null,
  resumeFile = null,
}) {
  let body = formData;

  if (!body) {
    body = new FormData();
    body.append('formType', formType);
    body.append('fields', JSON.stringify(fields || {}));
    if (userEmail) body.append('userEmail', userEmail);
    if (userName) body.append('userName', userName);
    if (resumeFile) body.append('resume', resumeFile);
  }

  const response = await fetch(`${API_BASE}/api/send-email`, {
    method: 'POST',
    body,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.error || 'SEND_FAILED');
    err.status = response.status;
    throw err;
  }

  return data;
}

export async function isEmailConfigured() {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data.mailConfigured);
  } catch {
    return false;
  }
}

export function getEmailConfigErrorMessage(error) {
  if (error?.message === 'EMAIL_NOT_CONFIGURED' || error?.status === 503) {
    return 'Email is not configured yet. Add SMTP settings to .env and run npm run dev (see .env.example).';
  }
  if (error?.message === 'USER_EMAIL_REQUIRED' || error?.status === 400) {
    return error.message === 'USER_EMAIL_REQUIRED'
      ? 'Please enter a valid email address.'
      : error.message;
  }
  return error?.message || 'Could not send your message. Please try again or call us directly.';
}
