const express = require('express');
const path = require('path');
const db = require('./db/database');
const urlRoutes = require('./routes/urls');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'URL Shortener' });
});

app.use('/api', urlRoutes);

app.get('/:code', (req, res) => {
  const row = db.prepare('SELECT original_url FROM urls WHERE short_code = ?').get(req.params.code);

  if (!row) {
    return res.status(404).send('Short URL not found');
  }

  db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?').run(req.params.code);
  res.redirect(302, row.original_url);
});

app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`);
});
