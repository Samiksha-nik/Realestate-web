import nodemailer from 'nodemailer';

const SITE_NAME = 'Ananya Realty Advisory LLP';
const CONTACT_PHONE = '+91 98675 35431';

/** Read at runtime — .env is loaded after this module is imported from index.js */
function getOwnerEmail() {
  return (process.env.OWNER_EMAIL || 'info@ananyarealty.com').trim();
}
function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

export function isMailConfigured() {
  return Boolean(getTransport());
}

function formatDetails(fields) {
  return Object.entries(fields || {})
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#eee;">${String(value)}</td></tr>`)
    .join('');
}

function resolveName({ userName, fields }) {
  return (
    userName ||
    fields?.['Full Name'] ||
    [fields?.['First Name'], fields?.['Last Name']].filter(Boolean).join(' ') ||
    fields?.Name ||
    'Website visitor'
  );
}

function buildOwnerHtml({ formType, fromName, replyEmail, phone, message, fields }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;margin:0 0 8px;">New ${formType}</h2>
      <p style="color:#aaa;margin:0 0 20px;font-size:14px;">${SITE_NAME} website</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:6px 12px 6px 0;color:#888;">Name</td><td style="padding:6px 0;">${fromName}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${replyEmail}" style="color:#c9a227;">${replyEmail}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#888;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Message</td><td style="padding:6px 0;white-space:pre-wrap;">${message}</td></tr>
        ${formatDetails(fields)}
      </table>
    </div>
  `;
}

function buildUserHtml({ formType, fromName }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;margin:0 0 16px;">Thank you, ${fromName}</h2>
      <p style="line-height:1.6;margin:0 0 12px;">
        We have received your <strong>${formType}</strong> enquiry with ${SITE_NAME}.
        Our team will contact you shortly.
      </p>
      <p style="line-height:1.6;margin:0;color:#aaa;font-size:14px;">
        Regards,<br/>
        ${SITE_NAME}<br/>
        <a href="mailto:${getOwnerEmail()}" style="color:#c9a227;">${getOwnerEmail()}</a> · ${CONTACT_PHONE}
      </p>
    </div>
  `;
}

/** One inbox when visitor email === owner: avoids Gmail threading/hiding a duplicate “to self” mail. */
function buildCombinedThankYouAndOwnerHtml({ formType, fromName, replyEmail, phone, message, fields }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;margin:0 0 16px;">Thank you, ${fromName}</h2>
      <p style="line-height:1.6;margin:0 0 12px;">
        We have received your <strong>${formType}</strong> enquiry with ${SITE_NAME}.
        Our team will contact you shortly.
      </p>
      <p style="line-height:1.6;margin:0 0 28px;color:#aaa;font-size:14px;">
        Regards,<br/>
        ${SITE_NAME}<br/>
        <a href="mailto:${getOwnerEmail()}" style="color:#c9a227;">${getOwnerEmail()}</a> · ${CONTACT_PHONE}
      </p>
      <div style="border-top:1px solid #333;padding-top:24px;margin-top:8px;">
        <h2 style="color:#c9a227;margin:0 0 8px;font-size:18px;">Your submission (team copy)</h2>
        <p style="color:#aaa;margin:0 0 16px;font-size:13px;">Because this enquiry used the same address as the team inbox, details are included below in one message.</p>
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:6px 12px 6px 0;color:#888;">Name</td><td style="padding:6px 0;">${fromName}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${replyEmail}" style="color:#c9a227;">${replyEmail}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#888;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Message</td><td style="padding:6px 0;white-space:pre-wrap;">${message}</td></tr>
          ${formatDetails(fields)}
        </table>
      </div>
    </div>
  `;
}

function getFromAddress() {
  const name = process.env.MAIL_FROM_NAME || SITE_NAME;
  const address = process.env.SMTP_USER || getOwnerEmail();
  return `"${name}" <${address}>`;
}

export async function sendFormEmails({ formType, fields, userEmail, userName, attachment }) {
  const transport = getTransport();
  if (!transport) {
    const err = new Error('EMAIL_NOT_CONFIGURED');
    err.status = 503;
    throw err;
  }

  const fromName = resolveName({ userName, fields });
  const replyEmail = userEmail || fields?.Email || '';
  const phone = fields?.Phone || fields?.['Contact No.'] || 'Not provided';
  const message =
    fields?.Message || fields?.['Cover Letter'] || fields?.Details || '—';

  if (!replyEmail) {
    const err = new Error('USER_EMAIL_REQUIRED');
    err.status = 400;
    throw err;
  }

  const ownerEmail = getOwnerEmail();
  const subject = `[Ananya Realty] ${formType} — ${fromName}`;
  const ownerMail = {
    from: getFromAddress(),
    to: ownerEmail,
    replyTo: replyEmail,
    subject,
    html: buildOwnerHtml({ formType, fromName, replyEmail, phone, message, fields }),
    attachments: attachment ? [attachment] : [],
  };

  const userMail = {
    from: getFromAddress(),
    to: replyEmail,
    subject: `Thank you for contacting ${SITE_NAME}`,
    html: buildUserHtml({ formType, fromName }),
  };

  const sameMailbox = replyEmail.trim().toLowerCase() === ownerEmail.trim().toLowerCase();

  if (sameMailbox) {
    await transport.sendMail({
      from: getFromAddress(),
      to: replyEmail,
      replyTo: replyEmail,
      subject: `Thank you for contacting ${SITE_NAME} — copy of your ${formType}`,
      html: buildCombinedThankYouAndOwnerHtml({
        formType,
        fromName,
        replyEmail,
        phone,
        message,
        fields,
      }),
      attachments: attachment ? [attachment] : [],
    });
  } else {
    await Promise.all([transport.sendMail(ownerMail), transport.sendMail(userMail)]);
  }

  return { ok: true };
}
