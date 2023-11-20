import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async () => {
  const response = await fetch("https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0D%0A++area%5Bname%3D%22%E6%9D%B1%E4%BA%AC%E9%83%BD%22%5D%3B%0D%0A++node%28area%29%5Btourism%3Dattraction%5D%3B%0D%0Aout%3B");
  const location: Validation.Overpass = await response.json();
  return location;
})

export const prerender = false;
