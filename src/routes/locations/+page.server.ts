import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ url }) => {
  const overpassPromise = fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent('[out:json];area[name="') + encodeURIComponent(url.searchParams.get("prefecture")!) + encodeURIComponent('"];node(area)[tourism=attraction];out;'));
  const photosPromise = fetch("https://jsonplaceholder.typicode.com/photos/");
  const [overpassResponse, photosResponse] = await Promise.all([overpassPromise, photosPromise])

  const overpassData: Validation.Overpass = await overpassResponse.json();
  const elements = overpassData.elements;

  const photosData = await photosResponse.json();
  const photosOfSameSizeAsElements = photosData.slice(0, elements.length);

  photosOfSameSizeAsElements.forEach((photo: Validation.Photo) => {
    delete photo["id"];
    delete photo["albumId"];
  });

  let data: Validation.LocationList = {locations: []};
  for (let i = 0; i < elements.length; i++) {
    const locationKey = String(i);
    const locationValue: Validation.Element = Object.assign({}, elements[i], photosData[i]);
    const location = {[locationKey]: locationValue};
    data["locations"].push(location);
  }
  return data;
})

export const prerender = false;
