import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const title = String(formData.get('title') ?? '').trim();
    const course = String(formData.get('course') ?? '').trim();
    const minutes = Number(formData.get('minutes') ?? 0);

    if (!title || !course || !minutes) {
      return {
        error: 'Bitte alle Felder ausfüllen.'
      };
    }

    const db = await getDb();

    await db.collection('tasks').insertOne({
      title,
      course,
      minutes,
      done: false,
      createdAt: new Date()
    });

    throw redirect(303, '/tasks?success=1');
  }
};