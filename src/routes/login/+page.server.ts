import { getDb } from '$lib/server/db';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    const db = await getDb();

    const user = await db.collection('users').findOne({ email });

    // ❌ falsche Daten
    if (!user || user.password !== password) {
      return {
        error: 'Falsche Login-Daten'
      };
    }

    // ✅ Login merken (Cookie)
    cookies.set(
      'user',
      JSON.stringify({
        id: String(user._id),
        email: user.email
      }),
      {
        path: '/',
        httpOnly: true
      }
    );

    throw redirect(303, '/');
  }
};