import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    throw error(404, 'Ungültige Aufgabe');
  }

  const db = await getDb();
  const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

  if (!task) {
    throw error(404, 'Aufgabe nicht gefunden');
  }

  return {
    task: {
      id: String(task._id),
      title: task.title,
      course: task.course,
      minutes: task.minutes,
      done: task.done
    }
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return {
        error: 'Ungültige Aufgabe'
      };
    }

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

    await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          course,
          minutes
        }
      }
    );

    throw redirect(303, '/tasks');
  }
};