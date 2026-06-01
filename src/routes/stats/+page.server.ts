import { getDb } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const userCookie = cookies.get('user');

  if (!userCookie) {
    return {
      totalMinutes: 0,
      totalSessions: 0,
      chartData: []
    };
  }

  const user = JSON.parse(userCookie);
  const db = await getDb();

  const sessions = await db
    .collection('sessions')
    .find({ userId: user.id })
    .toArray();

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalSessions = sessions.length;

  // 📊 Gruppieren nach Datum
  const grouped: Record<string, number> = {};

  for (const s of sessions) {
    const date = new Date(s.createdAt).toLocaleDateString();

    grouped[date] = (grouped[date] || 0) + (s.duration || 0);
  }

  const chartData = Object.entries(grouped).map(([date, minutes]) => ({
    date,
    minutes
  }));

  return {
    totalMinutes,
    totalSessions,
    chartData
  };
};