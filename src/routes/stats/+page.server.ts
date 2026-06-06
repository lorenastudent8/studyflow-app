import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

console.log('STATS SERVER WIRD GELADEN');

export const load: PageServerLoad = async ({ cookies }) => {
 const userCookie = cookies.get('user');

const ADMIN_ID = "6a1c8eecd439b1e776440b2e";

let userId = ADMIN_ID;

if (userCookie) {
  const user = JSON.parse(userCookie);
  userId = user.id;
}
  console.log('USER ID:', userId);

  const db = await getDb();

  const sessions = await db
    .collection('sessions')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

console.log('USER ID:', userId);
console.log('SESSIONS GEFUNDEN:', sessions.length)

  const tasks = await db
    .collection('tasks')
    .find({ userId })
    .toArray();

  const completedTasks = tasks.filter(
    (t) => t.done
  ).length;

  const openTasks = tasks.filter(
    (t) => !t.done
  ).length;

  const totalMinutes = sessions.reduce(
    (sum, s) => sum + (s.duration || 0),
    0
  );

  const totalSessions = sessions.length;

  const avgSession =
    totalSessions > 0
      ? Math.round(totalMinutes / totalSessions)
      : 0;

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const day = currentDate.toDateString();

    const found = sessions.some(
      (s) =>
        new Date(s.createdAt).toDateString() === day
    );

    if (!found) break;

    streak++;
    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  const chartData: {
    date: string;
    minutes: number;
  }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const label = d.toLocaleDateString(
      'de-DE',
      {
        weekday: 'short'
      }
    );

    const daySessions = sessions.filter(
      (s) =>
        new Date(s.createdAt).toDateString() ===
        d.toDateString()
    );

    const minutes = daySessions.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    );

    chartData.push({
      date: label,
      minutes
    });
  }

  const bestDay =
    chartData.length > 0
      ? chartData.reduce((a, b) =>
          a.minutes > b.minutes ? a : b
        )
      : {
          date: '-',
          minutes: 0
        };

  return {
    totalMinutes,
    totalSessions,
    streak,

    completedTasks,
    openTasks,
    avgSession,

    bestDay,
    chartData
  };
};