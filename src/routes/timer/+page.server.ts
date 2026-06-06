import type { Actions } from './$types';
import { getDb } from '$lib/server/db';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const duration = Number(data.get('duration'));

    const userCookie = cookies.get('user');
    if (!userCookie) return;

    const user = JSON.parse(userCookie);
    const db = await getDb();

    console.log('Speichere Session:', {
  userId: user.id,
  duration
});

await db.collection('sessions').insertOne({
  userId: user.id,
  duration,
  createdAt: new Date()
});

    return { success: true };
  }
};