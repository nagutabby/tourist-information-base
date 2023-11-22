<script lang="ts">
  import type { Marker, MarkerOptions } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
  import icon from "leaflet/dist/images/marker-icon.png";
  import iconShadow from "leaflet/dist/images/marker-shadow.png";
  import { onMount } from "svelte";

  export let locations: Validation.Location[];

  let locationImageUrl = "";
  let locationName = "";

  const getAttractionName = (element: Validation.Element) => {
    if (element.tags["name:ja"] !== undefined) {
      return element.tags["name:ja"];
    } else if (element.tags.name !== undefined) {
      return element.tags.name;
    } else if (element.tags["name:en"] !== undefined) {
      return element.tags["name:en"];
    } else {
      return element.title;
    }
  };
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
      className: "map-tiles",
    }).addTo(map);
    locations.forEach((location) => {
      const element = Object.values(location)[0];
      L.marker([element.lat, element.lon], {
        id: Object.keys(location)[0],
      } as MarkerOptions)
        .addTo(map)
        .bindTooltip(
          `<h1 class="my-2">
            ${getAttractionName(element)}
          </h1><img src="${element.thumbnailUrl}"/>`,
        )
        .on("click", function (this: Marker) {
          const options = this.options as L.MarkerOptions;
          const element = Object.values(locations[options.id])[0];
          locationImageUrl = element.url!;
          locationName = getAttractionName(element)!;
          (
            document.getElementById("location-detail")! as HTMLFormElement
          ).showModal();
        });
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]">
  <dialog id="location-detail" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{locationName}</h3>
      {#key locationImageUrl}
        <img src={locationImageUrl} alt="" />
      {/key}
      <p class="py-4">ここに説明が入ります</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>閉じる</button>
    </form>
  </dialog>
</div>

<style>
  :global(.leaflet-control-attribution) {
    display: none;
  }
  :global(.leaflet-tooltip) {
    width: 20vw;
    white-space: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  :global(
      .leaflet-layer,
      .leaflet-control-zoom-in,
      .leaflet-control-zoom-out,
      .leaflet-control-attribution
    ) {
    filter: invert(90%) hue-rotate(180deg) brightness(100%) contrast(90%);
  }
</style>
