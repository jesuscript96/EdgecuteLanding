import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import crypto from 'node:crypto';

interface Lead {
  name: string;
  email: string;
  discord: string;
  whatsapp: string;
  createdAt: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
    const { name, email, discord, whatsapp } = body;

    if (!name || !email) {
      res.status(400).json({ error: 'Nombre y email son obligatorios' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    const lead: Lead = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      discord: discord ? String(discord).slice(0, 200) : '',
      whatsapp: whatsapp ? String(whatsapp).slice(0, 50) : '',
      createdAt: new Date().toISOString(),
    };

    // Un blob por lead: sin condiciones de carrera entre envíos simultáneos
    await put(`leads/${Date.now()}-${crypto.randomUUID()}.json`, JSON.stringify(lead, null, 2), {
      access: 'private',
      contentType: 'application/json',
    });

    console.log(`[waitlist] Nuevo lead: ${lead.name} (${lead.email})`);
    res.status(200).json({ ok: true, message: 'Lead registrado correctamente' });
  } catch (err) {
    console.error('[waitlist] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
