import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const userCookie = cookies.get('user');

  const ADMIN_ID = "6a1c8eecd439b1e776440b2e"; // deine ID

  let userId;

  if (userCookie) {
    const user = JSON.parse(userCookie);
    userId = user.id;
  } else {
    // 🔥 DEMO MODE
    userId = ADMIN_ID;
  }

  const db = await getDb();

  const tasks = await db
    .collection('tasks')
    .find({ userId })
    .toArray();

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const open = tasks.filter(t => !t.done).length;

  return {
    total,
    done,
    open
  };
};