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
  // remove duplicate fields
  const filteredFields = { ...fields };

  delete filteredFields.Name;
  delete filteredFields.Email;
  delete filteredFields.Phone;
  delete filteredFields.Message;
  delete filteredFields['Contact No.'];
  delete filteredFields['First Name'];
  delete filteredFields['Last Name'];

  return `
    <div style="
      font-family: Georgia, serif;
      max-width: 560px;
      margin: 0 auto;
      background: #111;
      color: #eee;
      padding: 28px;
      border-radius: 12px;
    ">
      <h2 style="color:#c9a227;margin-bottom:24px;">
        New ${formType}
      </h2>

      <table style="
        width:100%;
        border-collapse:collapse;
      ">
        <tr>
          <td style="padding:8px 12px 8px 0;color:#999;">
            Name
          </td>

          <td style="padding:8px 0;">
            ${fromName}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 12px 8px 0;color:#999;">
            Email
          </td>

          <td style="padding:8px 0;">
            ${replyEmail}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 12px 8px 0;color:#999;">
            Phone
          </td>

          <td style="padding:8px 0;">
            ${phone}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 12px 8px 0;color:#999;">
            Message
          </td>

          <td style="padding:8px 0;">
            ${message}
          </td>
        </tr>

        ${formatDetails(filteredFields)}
      </table>
    </div>
  `;
}

function buildUserHtml({ fromName }) {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#111;color:#eee;padding:28px;border-radius:12px;">
      <h2 style="color:#c9a227;margin:0 0 20px;font-size:22px;font-weight:600;">
        Thank you for reaching out
      </h2>

      <p style="line-height:1.7;margin:0 0 14px;font-size:15px;color:#eee;">
        Dear ${fromName},
      </p>

      <p style="line-height:1.7;margin:0 0 14px;font-size:15px;color:#ddd;">
        One of our team members will get in touch with you within the next 24 hours to assist you further.
      </p>

      <p style="line-height:1.6;margin:0;font-size:14px;color:#aaa;">
        Regards,<br/>
        ${SITE_NAME}<br/>
        <a href="mailto:${getOwnerEmail()}" style="color:#c9a227;text-decoration:none;">${getOwnerEmail()}</a>
        · ${CONTACT_PHONE}
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
    html: buildUserHtml({ fromName }),
  };

  const sameMailbox = replyEmail.trim().toLowerCase() === ownerEmail.trim().toLowerCase();

  if (sameMailbox) {
    await transport.sendMail({
      ...ownerMail,
      to: replyEmail,
      subject: `Thank you for contacting ${SITE_NAME} — ${formType} submission`,
      html: `${buildUserHtml({ fromName })}<hr style="border-color:#333;margin:24px 0"/>${buildOwnerHtml({
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