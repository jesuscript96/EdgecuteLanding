import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { IncomingMessage, ServerResponse } from 'http';

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
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
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

export function waitlistPlugin() {
  return {
    name: 'waitlist-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.method === 'POST' && req.url === '/api/waitlist') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString());
              const { name, email, discord, whatsapp } = body;

              if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Nombre y email son obligatorios' }));
                return;
              }

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Email inválido' }));
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

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ ok: true, message: 'Lead registrado correctamente' }));
            } catch {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Error interno del servidor' }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}
