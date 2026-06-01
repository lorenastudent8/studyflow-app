import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const db = await getDb();

  const userCookie = cookies.get('user');

  if (!userCookie) {
    return {
      totalTasks: 0,
      doneTasks: 0,
      openTasks: 0
    };
  }

  const user = JSON.parse(userCookie);

  const tasks = await db
    .collection('tasks')
    .find({ userId: user.id }) // 🔥 wichtig!
    .toArray();

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.done).length;
  const openTasks = totalTasks - doneTasks;

  return {
    totalTasks,
    doneTasks,
    openTasks
  };
};