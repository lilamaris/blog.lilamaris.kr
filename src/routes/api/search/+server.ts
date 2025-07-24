import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { searchByKeyword } from '$lib/server/search';

export const GET: RequestHandler = async ({ url }) => {
  const keyword = url.searchParams.get('keyword') ?? '';
  const searchResult = await searchByKeyword(keyword);
  return json(searchResult);
};
