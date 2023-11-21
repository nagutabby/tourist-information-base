import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ url }) => {
  const locationsResponse = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent('[out:json];area[name="') + encodeURIComponent(url.searchParams.get("prefecture")!) + encodeURIComponent('"];node(area)[tourism=attraction];out;'));
  const locations: Validation.Overpass = await locationsResponse.json();
  const elements = locations.elements;

  const photosResponse = await fetch("https://jsonplaceholder.typicode.com/photos/");
  const photos = await photosResponse.json();
  const photosOfSameSizeAsElements = photos.slice(0, elements.length);
  let photosOfSameSizeAsElementsWithoutKeys: Validation.Photo[] = [];

  photosOfSameSizeAsElements.forEach((photo: Validation.Photo) => {
    delete photo["id"];
    photosOfSameSizeAsElementsWithoutKeys.push(photo);
  });

  let data: Validation.LocationContent = { locationContent: [] }
  for (let i = 0; i < elements.length; i++) {
    data.locationContent.push(Object.assign({}, elements[i], photos[i]))
  }
  return data;
})

export const prerender = false;
