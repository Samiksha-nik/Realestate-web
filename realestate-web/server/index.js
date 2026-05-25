const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { isMailConfigured, sendFormEmails } = require('./mail');

// Load .env from server folder (public_html/server/.env on MilesWeb)
// override: true — so a fresh .env wins over stale cPanel env vars after you rotate App Password
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const app = express();
const PORT = Number(process.env.PORT || 3001);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('INVALID_FILE_TYPE'));
    }
  },
});

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'Ananya Realty mail API',
    health: '/api/health',
    mailConfigured: isMailConfigured(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mailConfigured: isMailConfigured(),
  });
});

app.post('/api/send-email', upload.single('resume'), async (req, res) => {
  try {
    let fields = req.body.fields;
    if (typeof fields === 'string') {
      fields = JSON.parse(fields);
    }

    const formType = req.body.formType;
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;

    if (!formType) {
      return res.status(400).json({ error: 'formType is required' });
    }

    let attachment;
    if (req.file) {
      attachment = {
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await sendFormEmails({
      formType,
      fields: fields || {},
      userEmail,
      userName,
      attachment,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('[send-email]', error);

    if (error.message === 'EMAIL_NOT_CONFIGURED') {
      return res.status(503).json({
        error: 'Email is not configured. Add SMTP settings to .env or Node app environment variables.',
      });
    }
    if (error.message === 'USER_EMAIL_REQUIRED') {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (error.message === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ error: 'Resume must be PDF, DOC, or DOCX.' });
    }

    const smtpAuthFailed =
      error.code === 'EAUTH' ||
      (error.message && /535|BadCredentials|Username and Password not accepted/i.test(error.message));

    if (smtpAuthFailed) {
      return res.status(503).json({
        error:
          'Email could not be sent: Gmail login failed. Update SMTP_PASS (new App Password) in server/.env, restart the Node app, and ensure SMTP_USER matches that Gmail account.',
      });
    }

    res.status(500).json({
      error: error.message || 'Could not send your message. Please try again or call us directly.',
    });
  }
});

// MilesWeb / LiteSpeed Node loads this file with require() — must export the app
module.exports = app;

// Local dev only (npm start); cPanel Passenger binds the port itself
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[mail-api] http://localhost:${PORT} (configured: ${isMailConfigured()})`);
  });
}
