import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import type { Actions } from './$types';

const ADMIN_ID = "6a1c8eecd439b1e776440b2e";

export const actions: Actions = {
  createTask: async ({ request, cookies }) => {
    const data = await request.formData();

    const title = data.get('title');
    const course = data.get('course');
    const minutes = Number(data.get('minutes'));
    const dueDate = data.get('dueDate');
    const priority = data.get('priority');

    const userCookie = cookies.get('user');

    let userId = ADMIN_ID;

    if (userCookie) {
      const user = JSON.parse(userCookie);
      userId = user.id;
    }

    const db = await getDb();

    await db.collection('tasks').insertOne({
      title: String(title),
      course: String(course),
      minutes,
      dueDate: dueDate ? new Date(String(dueDate)) : null,
      priority: String(priority),
      done: false,
      userId,
      createdAt: new Date()
    });

    throw redirect(303, '/tasks?success=created');
  }
};