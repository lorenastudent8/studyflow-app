import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const success = url.searchParams.get('success');

  const db = await getDb();
  const filter = url.searchParams.get('filter');

  const tasks = await db
  .collection('tasks')
  .find(
    filter === 'done'
      ? { done: true }
      : filter === 'open'
      ? { done: false }
      : {}
  )
  .sort({ createdAt: -1 })
  .toArray();

const total = tasks.length;
const doneCount = tasks.filter((t) => t.done).length;

return {
  tasks: tasks.map((task) => ({
    id: String(task._id),
    title: task.title,
    course: task.course,
    minutes: task.minutes,
    done: task.done
  })),
  success: success ? 'Aufgabe erfolgreich gespeichert!' : null,
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
      return {
        error: 'Ungültige ID'
      };
    }

    const db = await getDb();
    const objectId = new ObjectId(id);

    const task = await db.collection('tasks').findOne({ _id: objectId });

    if (!task) {
      return {
        error: 'Aufgabe nicht gefunden'
      };
    }

    await db.collection('tasks').updateOne(
      { _id: objectId },
      { $set: { done: !task.done } }
    );

    return {
      success: true
    };
  }
};