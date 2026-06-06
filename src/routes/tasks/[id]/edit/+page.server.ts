import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const db = await getDb();

  const task = await db.collection('tasks').findOne({
    _id: new ObjectId(params.id)
  });

  type Task = {
  id: string;
  title: string;
  course: string;
  description: string;
  minutes: number;
  dueDate: string;
  priority: string;
};

  if (!task) {
    throw redirect(303, '/tasks');
  }

  return {
    task: {
      id: String(task._id),
      title: task.title ?? '',
      course: task.course ?? '',
      description: task.description ?? '',
      minutes: task.minutes ?? 0,
      dueDate: task.dueDate ? task.dueDate.toISOString() : '',
      priority: task.priority ?? 'low'
    }
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const db = await getDb();

    const title = String(form.get('title') || '');
    const course = String(form.get('course') || '');
    const description = String(form.get('description') || '');
    const minutes = Number(form.get('minutes') || 0);
    const priority = String(form.get('priority') || 'low');

    const dueDateRaw = form.get('dueDate');

    const dueDate =
      dueDateRaw && dueDateRaw !== ''
        ? new Date(String(dueDateRaw))
        : null;

    await db.collection('tasks').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          course,
          description,
          minutes,
          priority,
          dueDate
        }
      }
    );

    throw redirect(303, '/tasks');
  }
};