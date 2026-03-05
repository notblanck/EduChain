const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// In-memory stores – replace with DB + blockchain integration later
const credentials = new Map();
const verifications = new Map();
const transactions = new Map();

const hashPayload = payload =>
  crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

// --- Issuance Tool endpoints ---

app.post('/api/credentials/issue', (req, res) => {
  const body = req.body || {};
  const id = body.credentialId || `cr_${uuidv4()}`;

  const payload = {
    id,
    studentName: body.studentName,
    institution: body.institution,
    degree: body.degree,
    field: body.field,
    issueDate: body.issueDate,
    createdAt: new Date().toISOString()
  };

  const hash = hashPayload(payload);
  const txHash = `0x${crypto.randomBytes(16).toString('hex')}`;

  const record = {
    ...payload,
    hash,
    txHash,
    status: 'ISSUED',
    network: 'ethereum-testnet'
  };

  credentials.set(id, record);
  transactions.set(txHash, {
    hash: txHash,
    status: 'CONFIRMED',
    confirmations: 128,
    createdAt: new Date().toISOString()
  });

  return res.json({
    credential: record,
    transaction: transactions.get(txHash)
  });
});

app.post('/api/credentials/batch-issue', (req, res) => {
  const items = Array.isArray(req.body?.credentials) ? req.body.credentials : [];
  const results = items.map(item => {
    const mockReq = { body: item };
    let result;
    const mockRes = {
      json: data => {
        result = data;
      }
    };
    app._router.handle(
      { ...mockReq, method: 'POST', url: '/api/credentials/issue' },
      mockRes,
      () => {}
    );
    return result;
  });

  res.json({ results });
});

app.get('/api/credentials/templates', (_req, res) => {
  res.json({
    templates: [
      { id: 'degree', label: 'Degree Certificate' },
      { id: 'micro-credential', label: 'Micro‑credential / Badge' },
      { id: 'license', label: 'Professional License' }
    ]
  });
});

app.post('/api/credentials/sign', (req, res) => {
  const { payload } = req.body || {};
  if (!payload) {
    return res.status(400).json({ error: 'payload is required' });
  }
  const hash = hashPayload(payload);
  // Placeholder "signature"
  const signature = crypto.createHmac('sha256', 'demo-secret').update(hash).digest('hex');
  res.json({ hash, signature });
});

app.get('/api/transactions/:txHash/status', (req, res) => {
  const tx = transactions.get(req.params.txHash);
  if (!tx) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json(tx);
});

// --- Verification Hub endpoints ---

app.post('/api/verify/credential', (req, res) => {
  const { hash, credentialId } = req.body || {};

  let record;
  if (credentialId && credentials.has(credentialId)) {
    record = credentials.get(credentialId);
  } else if (hash) {
    record = Array.from(credentials.values()).find(c => c.hash === hash);
  }

  if (!record) {
    return res.json({ status: 'NOT_FOUND' });
  }

  const recomputed = hashPayload({
    id: record.id,
    studentName: record.studentName,
    institution: record.institution,
    degree: record.degree,
    field: record.field,
    issueDate: record.issueDate,
    createdAt: record.createdAt
  });

  const status = recomputed === record.hash ? 'VERIFIED' : 'TAMPERED';
  const verificationId = uuidv4();
  verifications.set(verificationId, {
    id: verificationId,
    credentialId: record.id,
    status,
    createdAt: new Date().toISOString()
  });

  res.json({
    status,
    credential: record,
    verificationId
  });
});

app.get('/api/verify/:credentialHash', (req, res) => {
  const hash = req.params.credentialHash;
  const record = Array.from(credentials.values()).find(c => c.hash === hash);
  if (!record) {
    return res.status(404).json({ status: 'NOT_FOUND' });
  }
  res.json({ status: 'VERIFIED', credential: record });
});

app.post('/api/verify/batch', (req, res) => {
  const items = Array.isArray(req.body?.hashes) ? req.body.hashes : [];
  const results = items.map(value => {
    const record = Array.from(credentials.values()).find(
      c => c.hash === value || c.id === value
    );
    return {
      input: value,
      status: record ? 'VERIFIED' : 'NOT_FOUND'
    };
  });
  res.json({ results });
});

app.get('/api/verify/qr/:credentialId', (req, res) => {
  const id = req.params.credentialId;
  // For now, just return a verification URL – QR can be generated client-side.
  res.json({
    url: `https://app.educhain.local/verify?credentialId=${encodeURIComponent(id)}`
  });
});

// --- Network Status endpoints ---

app.get('/api/network/status', (_req, res) => {
  res.json({
    network: 'ethereum-testnet',
    rollup: 'optimism',
    status: 'HEALTHY',
    uptimePercent: 99.98
  });
});

app.get('/api/network/gas-price', (_req, res) => {
  res.json({
    currentGwei: 18.4,
    averageGwei: 22.1,
    highGwei: 35.7
  });
});

app.get('/api/network/stats', (_req, res) => {
  res.json({
    totalCredentials: credentials.size,
    averageConfirmationSeconds: 14,
    lastBlockTime: new Date().toISOString()
  });
});

app.get('/api/network/transactions/recent', (_req, res) => {
  const items = Array.from(transactions.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);
  res.json({ items });
});

// --- Contact / Email endpoints ---

app.post('/api/contact/submit', (req, res) => {
  const ticketId = uuidv4();
  const body = req.body || {};
  res.json({
    ticketId,
    status: 'RECEIVED',
    expectedResponseHours: body.inquiryType === 'Sales' ? 4 : 24
  });
});

app.post('/api/contact/upload-attachment', (_req, res) => {
  // Stub for file attachment – real implementation should use multipart handling + storage.
  res.json({ attachmentId: uuidv4() });
});

app.get('/api/contact/ticket/:id/status', (req, res) => {
  // No persistence for tickets in this stub; always return processing.
  res.json({
    id: req.params.id,
    status: 'PROCESSING'
  });
});

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'EduChain backend' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`EduChain backend listening on http://localhost:${port}`);
});

