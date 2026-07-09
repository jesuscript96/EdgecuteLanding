import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'leads.json');

interface Lead {
  name: string;
  email: string;
  discord: string;
  whatsapp: string;
  createdAt: string;
}

function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

const app = express();
app.use(express.json());

app.post('/api/waitlist', (req, res) => {
  try {
    const { name, email, discord, whatsapp } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: 'Nombre y email son obligatorios' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    const leads = readLeads();
    const newLead: Lead = {
      name,
      email,
      discord: discord || '',
      whatsapp: whatsapp || '',
      createdAt: new Date().toISOString(),
    };
    leads.push(newLead);
    writeLeads(leads);

    console.log(`[waitlist] Nuevo lead: ${name} (${email})`);
    res.json({ ok: true, message: 'Lead registrado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
