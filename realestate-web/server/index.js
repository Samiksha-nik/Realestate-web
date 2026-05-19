import { config as loadEnv } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { isMailConfigured, sendFormEmails } from './mail.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Prefer realestate-web/.env; also load repo-root .env (e.g. d:\Ananya-website\.env) so local overrides win
loadEnv({ path: join(__dirname, '../../.env') });
loadEnv({ path: join(__dirname, '../.env'), override: true });

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

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailConfigured: isMailConfigured() });
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

    await sendFormEmails({ formType, fields: fields || {}, userEmail, userName, attachment });
    res.json({ ok: true });
  } catch (error) {
    console.error('[send-email]', error);

    if (error.message === 'EMAIL_NOT_CONFIGURED') {
      return res.status(503).json({
        error: 'Email is not configured. Add SMTP settings to .env (see .env.example).',
      });
    }
    if (error.message === 'USER_EMAIL_REQUIRED') {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (error.message === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ error: 'Resume must be PDF, DOC, or DOCX.' });
    }

    res.status(500).json({
      error: error.message || 'Could not send your message. Please try again or call us directly.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[mail-api] http://localhost:${PORT} (configured: ${isMailConfigured()})`);
});
