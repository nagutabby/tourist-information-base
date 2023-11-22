<script lang="ts">
  import type { Marker, MarkerOptions } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
  import icon from "leaflet/dist/images/marker-icon.png";
  import iconShadow from "leaflet/dist/images/marker-shadow.png";
  import { onMount } from "svelte";

  export let locations: Validation.Location[];

  onMount(async () => {
    const L = await import("leaflet");
    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl: iconRetina,
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [24, 36],
      iconAnchor: [12, 36],
    });
    const map = L.map("map").setView([35.39, 139.44], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    locations.forEach((location) => {
      const element = Object.values(location)[0];
      L.marker([element.lat, element.lon], {
        id: Object.keys(location)[0],
      } as MarkerOptions)
        .addTo(map)
        .bindTooltip(
          `<h1 class="my-2">${element.title}</h1><img src="${element.thumbnailUrl}"/>`,
        )
        .on("click", function (this: Marker) {
          const options = this.options as L.MarkerOptions;
          const element = Object.values(locations[options.id])[0];
          console.log(element.url);
        });
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]" />

<style>
  :global(.leaflet-tooltip) {
    width: 20vw;
    white-space: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
