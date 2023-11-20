import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ url }) => {
  const response = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent('[out:json];area[name="') + encodeURIComponent(url.searchParams.get("prefecture")!) + encodeURIComponent('"];node(area)[tourism=attraction];out;'));
  const location: Validation.Overpass = await response.json();
  return location;
})

export const prerender = false;
