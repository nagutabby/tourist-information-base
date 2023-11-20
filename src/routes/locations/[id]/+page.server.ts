
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ url }) => {
  const response = await fetch(`https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0D%0A++node%28id%3A+${url.pathname.split("/")[2]}%29%3B%0D%0Aout%3B`);
  const location: Validation.Overpass = await response.json();
  return location;
})

export const prerender = false;
