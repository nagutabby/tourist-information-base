<script lang="ts">
  import type { Marker } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";

  export let elements: Validation.Element[];

  onMount(async () => {
    const L = await import("leaflet");
    const map = L.map("map").setView([35.39, 139.44], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    elements.forEach((element) => {
      L.marker([element.lat, element.lon], { id: element.id })
        .addTo(map)
        .on("click", function (this: Marker) {
          console.log(this.options.id);
        });
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]" />
