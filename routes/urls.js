const express = require('express');
const { nanoid } = require('nanoid');
const db = require('../db/database');

const router = express.Router();

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

router.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'A valid http or https URL is required' });
  }

  const existing = db.prepare('SELECT * FROM urls WHERE original_url = ?').get(url);
  if (existing) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return res.json({
      shortCode: existing.short_code,
      shortUrl: `${baseUrl}/${existing.short_code}`,
      originalUrl: existing.original_url,
    });
  }

  const shortCode = nanoid(8);
  db.prepare('INSERT INTO urls (short_code, original_url) VALUES (?, ?)').run(shortCode, url);

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.status(201).json({
    shortCode,
    shortUrl: `${baseUrl}/${shortCode}`,
    originalUrl: url,
  });
});

router.get('/urls', (_req, res) => {
  const urls = db.prepare('SELECT short_code, original_url, clicks, created_at FROM urls ORDER BY created_at DESC').all();
  res.json(urls);
});

router.get('/urls/:code', (req, res) => {
  const row = db.prepare('SELECT * FROM urls WHERE short_code = ?').get(req.params.code);
  if (!row) {
    return res.status(404).json({ error: 'Short URL not found' });
  }
  res.json(row);
});

module.exports = router;
