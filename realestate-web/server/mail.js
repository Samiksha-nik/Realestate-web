const nodemailer = require('nodemailer');

const SITE_NAME = 'Ananya Realty Advisory LLP';
const CONTACT_PHONE = '+91 98675 35431';

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

function isMailConfigured() {
  return Boolean(getTransport());
}

function formatDetails(fields) {
  return Object.entries(fields || {})
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:6px 0;color:#eee;">
            ${String(value)}
          </td>
        </tr>`
    )
    .join('');
}

function resolveName({ userName, fields }) {
  return (
    userName ||
    fields?.['Full Name'] ||
    [fields?.['First Name'], fields?.['Last Name']]
      .filter(Boolean)
      .join(' ') ||
    fields?.Name ||
    'Website visitor'
  );
}

function buildOwnerHtml({
  formType,
  fromName,
  replyEmail,
  phone,
  message,
  fields,
}) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;">New ${formType}</h2>

      <table style="width:100%;">
        <tr>
          <td>Name</td>
          <td>${fromName}</td>
        </tr>

        <tr>
          <td>Email</td>
          <td>${replyEmail}</td>
        </tr>

        <tr>
          <td>Phone</td>
          <td>${phone}</td>
        </tr>

        <tr>
          <td>Message</td>
          <td>${message}</td>
        </tr>

        ${formatDetails(fields)}
      </table>
    </div>
  `;
}

function buildUserHtml({ formType, fromName }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;">
        Thank you, ${fromName}
      </h2>

      <p>
        We have received your
        <strong>${formType}</strong> enquiry.
      </p>
    </div>
  `;
}

function getFromAddress() {
  const name = process.env.MAIL_FROM_NAME || SITE_NAME;
  const address = process.env.SMTP_USER || getOwnerEmail();

  return `"${name}" <${address}>`;
}

async function sendFormEmails({
  formType,
  fields,
  userEmail,
  userName,
  attachment,
}) {
  const transport = getTransport();

  if (!transport) {
    throw new Error('EMAIL_NOT_CONFIGURED');
  }

  const fromName = resolveName({ userName, fields });

  const replyEmail =
    userEmail || fields?.Email || '';

  const phone =
    fields?.Phone ||
    fields?.['Contact No.'] ||
    'Not provided';

  const message =
    fields?.Message ||
    fields?.['Cover Letter'] ||
    fields?.Details ||
    '—';

  if (!replyEmail) {
    throw new Error('USER_EMAIL_REQUIRED');
  }

  const ownerEmail = getOwnerEmail();

  const ownerMail = {
    from: getFromAddress(),
    to: ownerEmail,
    replyTo: replyEmail,
    subject: `[Ananya Realty] ${formType} — ${fromName}`,
    html: buildOwnerHtml({
      formType,
      fromName,
      replyEmail,
      phone,
      message,
      fields,
    }),
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
      ...ownerMail,
      to: replyEmail,
      subject: `Thank you for contacting ${SITE_NAME} — ${formType} submission`,
      html: `${buildUserHtml({ formType, fromName })}<hr style="border-color:#333;margin:24px 0"/>${buildOwnerHtml({
        formType,
        fromName,
        replyEmail,
        phone,
        message,
        fields,
      })}`,
    });
  } else {
    await Promise.all([transport.sendMail(ownerMail), transport.sendMail(userMail)]);
  }

  return { ok: true };
}

module.exports = {
  isMailConfigured,
  sendFormEmails,
};