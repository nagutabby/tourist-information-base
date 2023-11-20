<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";

  export let elements: Validation.Element[];

  onMount(async () => {
    await import("leaflet");
    const map = window.L.map("map").setView([35.39, 139.44], 6);
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    elements.forEach((element) => {
      if (element.tags["name:ja"] !== undefined) {
        window.L.marker([element.lat, element.lon, 0])
          .addTo(map)
          .bindPopup(element.tags["name:ja"]);
      } else if (element.tags.name !== undefined) {
        window.L.marker([element.lat, element.lon, 0])
          .addTo(map)
          .bindPopup(element.tags.name);
      }
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]" />
