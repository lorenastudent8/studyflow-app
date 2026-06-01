import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();

    const title = String(formData.get('title') ?? '').trim();
    const course = String(formData.get('course') ?? '').trim();
    const minutes = Number(formData.get('minutes') ?? 0);
    const dueDate = formData.get('dueDate');

    if (!title || !course || !minutes) {
      return {
        error: 'Bitte alle Felder ausfüllen.'
      };
    }

    const db = await getDb();

const userCookie = cookies.get('user');

if (!userCookie) {
  return { error: 'Nicht eingeloggt' };
}

const user = JSON.parse(userCookie);

await db.collection('tasks').insertOne({
  title,
  course,
  minutes: Number(minutes),
  done: false,
  userId: user.id,
  dueDate: dueDate ? new Date(String(dueDate)) : null,
  createdAt: new Date()
});

    throw redirect(303, '/tasks?success=created');
  }
};