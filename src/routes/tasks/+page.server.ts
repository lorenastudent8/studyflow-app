import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
  const success = url.searchParams.get('success');
  const filter = url.searchParams.get('filter');

  const db = await getDb();

  const userCookie = cookies.get('user');

  // ❌ nicht eingeloggt
  if (!userCookie) {
    return {
      tasks: [],
      total: 0,
      doneCount: 0,
      filter,
      success: null
    };
  }

  const user = JSON.parse(userCookie);

  const tasks = await db
    .collection('tasks')
    .find({
      userId: user.id,
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

  type Task = {
    id: string;
    title: string;
    course: string;
    minutes: number;
    done: boolean;
    dueDate: string | null;
  };

  return {
    tasks: tasks.map((task): Task => ({
      id: String(task._id),
      title: task.title,
      course: task.course,
      minutes: task.minutes,
      done: task.done,
      dueDate: task.dueDate ?? null
    })),
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

import { redirect } from '@sveltejs/kit';

export const actions: Actions = {

  // ✅ DONE TOGGLE
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
      return { error: 'Aufgabe nicht gefunden' };
    }

    await db.collection('tasks').updateOne(
      { _id: objectId },
      { $set: { done: !task.done } }
    );

    throw redirect(303, '/tasks');
  },

  completeFromTimer: async ({ request }) => {

  const formData = await request.formData();
  
  const id = String(formData.get('id') ?? '');

  if (!ObjectId.isValid(id)) {
    return { error: 'Ungültige ID' };
  }

  const db = await getDb();

  await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: { done: true } }
  );

  const duration = Number(formData.get('duration') ?? 25);

  await db.collection('sessions').insertOne({
  taskId: new ObjectId(id),
  duration,
  createdAt: new Date()
});

  return { success: true };
},
  // 🗑️ DELETE (FIXED)
  deleteTask: async ({ request }) => {
    const formData = await request.formData();
    const id = String(formData.get('id') ?? '');

    if (!ObjectId.isValid(id)) {
      return { error: 'Ungültige ID' };
    }

    const db = await getDb();
    const objectId = new ObjectId(id);

    await db.collection('tasks').deleteOne({ _id: objectId });

    // ✅ WICHTIG → redirect statt return
    throw redirect(303, '/tasks?success=deleted');
  }

};
    