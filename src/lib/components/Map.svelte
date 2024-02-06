<script lang="ts">
  import type { Marker, MarkerOptions } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
  import icon from "leaflet/dist/images/marker-icon.png";
  import iconShadow from "leaflet/dist/images/marker-shadow.png";
  import { onMount } from "svelte";

  export let locations: Validation.Location[];
  export let prefectureLat: number;
  export let prefectureLon: number;

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

  const lon2tile = (lon: number, zoom: number) => {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  };
  const lat2tile = (lat: number, zoom: number) => {
    return Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
        ) /
          Math.PI) /
        2) *
        Math.pow(2, zoom),
    );
  };
  const zoom = 9;

  onMount(async () => {
    const L = await import("leaflet");
    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl: iconRetina,
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [24, 36],
      iconAnchor: [12, 36],
    });
    const map = L.map("map").setView([prefectureLat, prefectureLon], zoom);
    const tileLayer = L.tileLayer(
      "https://tile.openstreetmap.jp/{z}/{x}/{y}.png",
      {
        minZoom: 9,
        // デフォルト値を明示的に指定
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        className: "map-tiles",
      },
    ).addTo(map);
    locations.forEach((location) => {
      const element = Object.values(location)[0];
      L.marker([element.lat, element.lon], {
        id: Object.keys(location)[0],
      } as MarkerOptions)
        .addTo(map)
        .bindTooltip(
          `<p class="mb-1">
            ${getAttractionName(element)}
          </p><img src="${element.thumbnailUrl}"/>`,
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

    const mapBounds = map.getBounds();

    const northEdge = mapBounds.getNorth();
    const westEdge = mapBounds.getWest();
    const southEdge = mapBounds.getSouth();
    const eastEdge = mapBounds.getEast();

    const topTile = lat2tile(northEdge, zoom);
    const leftTile = lon2tile(westEdge, zoom);
    const bottomTile = lat2tile(southEdge, zoom);
    const rightTile = lon2tile(eastEdge, zoom);

    const width = Math.abs(leftTile - rightTile) + 1;
    const height = Math.abs(topTile - bottomTile) + 1;

    const totalTiles = width * height;
    console.log(`最初の地図を表示するために読み込んだタイル数: ${totalTiles}`);

    let tileCount = 0;
    tileLayer.addEventListener("tileload", async (event) => {
      console.log(event.coords);
      tileCount += 1;
      console.log(`最初のロードから現在までに読み込んだタイル数: ${tileCount}`)
    });
  });
</script>

<div id="map" class="w-[100vw] h-[100vh]">
  <dialog id="location-detail" class="modal image-full">
    <div class="modal-box">
      {#key locationName}
        <h1 class="font-bold text-lg pb-2">{locationName}</h1>
      {/key}
      {#key locationImageUrl}
        <img src={locationImageUrl} alt="" />
      {/key}
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
</style>
