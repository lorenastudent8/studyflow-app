import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const ADMIN_ID = "6a1c8eecd439b1e776440b2e";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const success = url.searchParams.get('success');
  const filter = url.searchParams.get('filter');

  const db = await getDb();
  const userCookie = cookies.get('user');

  let query: any = {};

  if (userCookie) {
    const user = JSON.parse(userCookie);
    query.userId = user.id;
  } else {
    query.userId = ADMIN_ID;
  }

  const tasks = await db
    .collection('tasks')
    .find({
      ...query,
      ...(filter === 'done'
        ? { done: true }
        : filter === 'open'
        ? { done: false }
        : {})
    })
    .sort({ dueDate: 1, createdAt: -1 })
    .toArray();

  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;

  return {
 tasks: tasks.map((task) => {
  return {
    id: String(task._id),
    title: task.title,
    course: task.course,
    minutes: task.minutes,
    done: task.done,

    dueDate: task.dueDate ?? null,
    priority: task.priority ?? 'low',

    description:
      typeof task.description === 'string'
        ? task.description
        : ''
  };
}),
    success:
      success === 'deleted'
        ? 'Aufgabe gelöscht!'
        : success === 'created'
        ? 'Aufgabe erstellt!'
        : null,
    filter,
    total,
    doneCount
  };
};

export const actions: Actions = {

  toggleDone: async ({ request }) => {
    const formData = await request.formData();
    const id = String(formData.get('id') ?? '');

    if (!ObjectId.isValid(id)) {
      return { error: 'Ungültige ID' };
    }

    const db = await getDb();
    const objectId = new ObjectId(id);

    const task = await db.collection('tasks').findOne({ _id: objectId });

    if (!task) {
      return { error: 'Nicht gefunden' };
    }

    await db.collection('tasks').updateOne(
      { _id: objectId },
      { $set: { done: !task.done } }
    );

    throw redirect(303, '/tasks');
  },

  deleteTask: async ({ request }) => {
    const formData = await request.formData();
    const id = String(formData.get('id') ?? '');

    if (!ObjectId.isValid(id)) {
      return { error: 'Ungültige ID' };
    }

    const db = await getDb();
    await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });

    throw redirect(303, '/tasks?success=deleted');
  }
};
    