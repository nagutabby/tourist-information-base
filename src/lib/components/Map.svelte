<script lang="ts">
  import type { Marker, MarkerOptions } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
  import icon from "leaflet/dist/images/marker-icon.png";
  import iconShadow from "leaflet/dist/images/marker-shadow.png";
  import { onMount } from "svelte";

  export let locationContent: Validation.Element[];

  onMount(async () => {
    const L = await import("leaflet");
    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl: iconRetina,
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [24,36],
      iconAnchor: [12,36]
    });
    const map = L.map("map").setView([35.39, 139.44], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    locationContent.forEach((location) => {
      L.marker([location.lat, location.lon], { id: location.id } as MarkerOptions)
        .addTo(map).bindTooltip(`サムネイル: <img src="${location.thumbnailUrl}"/>`).openTooltip().closeTooltip()
        .on("click", function (this: Marker) {
          const options = this.options as L.MarkerOptions;
          console.log(options.id);
        });
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]" />
