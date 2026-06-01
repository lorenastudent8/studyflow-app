import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const userCookie = cookies.get('user');

  return {
    user: userCookie ? JSON.parse(userCookie) : null
  };
};