import { getDb } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!email || !password) {
      return { error: 'Bitte alles ausfüllen' };
    }

    const db = await getDb();

    const existing = await db.collection('users').findOne({ email });

    if (existing) {
      return { error: 'User existiert bereits' };
    }

    await db.collection('users').insertOne({
      email,
      password, // ⚠️ später hashen!
      createdAt: new Date()
    });

    throw redirect(303, '/login');
  }
};