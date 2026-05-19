import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  submitWebsiteForm,
  isEmailConfigured,
  getEmailConfigErrorMessage,
} from '@/lib/emailService';

/**
 * @param {Object} options
 * @param {string} options.formType
 * @param {() => void} [options.onSuccess]
 * @param {string} [options.successMessage]
 * @param {boolean} [options.showSuccessToast]
 */
export function useWebsiteFormSubmit({
  formType,
  onSuccess,
  successMessage = "Thank you! We've received your message and sent a confirmation to your email.",
  showSuccessToast = true,
}) {
  const [sending, setSending] = useState(false);

  const submit = useCallback(
    async ({ fields, userEmail, userName, resumeFile = null }) => {
      setSending(true);
      try {
        const configured = await isEmailConfigured();
        if (!configured) {
          toast.error(
            'Email service is not configured. Add SMTP settings to .env and run npm run dev (see .env.example).',
          );
          return false;
        }

        await submitWebsiteForm({ formType, fields, userEmail, userName, resumeFile });
        if (showSuccessToast && successMessage) {
          toast.success(successMessage);
        }
        onSuccess?.();
        return true;
      } catch (error) {
        console.error('[form submit]', formType, error);
        toast.error(getEmailConfigErrorMessage(error));
        return false;
      } finally {
        setSending(false);
      }
    },
    [formType, onSuccess, successMessage, showSuccessToast],
  );

  return { submit, sending };
}
