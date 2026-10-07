const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');

// POST /api/contact - Submit support ticket
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  const ticketId = 'TL-TICK-' + Math.floor(1000 + Math.random() * 9000);
  const ticketRecord = {
    ticketId,
    createdAt: new Date().toISOString(),
    status: 'open',
    priority: subject === 'warranty' || subject === 'returns' ? 'high' : 'normal',
    name,
    email,
    phone: phone || '',
    subject: subject || 'general',
    message
  };

  const tickets = readDb('tickets.json');
  tickets.unshift(ticketRecord);
  writeDb('tickets.json', tickets);

  console.log(`[TICKET CREATED] #${ticketId} from ${name} (${email}) - Subject: ${subject}`);

  res.status(201).json({
    success: true,
    message: `Support ticket #${ticketId} created successfully. An advisor will contact you within 4 business hours.`,
    ticketId
  });
});

// GET /api/contact - List support tickets
router.get('/', (req, res) => {
  const tickets = readDb('tickets.json');
  res.json({ success: true, count: tickets.length, tickets });
});

module.exports = router;
