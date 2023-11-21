namespace Validation {
  export interface Overpass {
    version: number;
    generator: string;
    osm3s: Osm3s;
    elements: Element[];
  }
  interface Osm3s {
    timestamp_osm_base: string;
    timestamp_osm_areas_base: string;
    copyright: string;
  }
  export interface Element {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: Tags;
    albumId?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;

  }
  interface Tags {
    "addr:housenumber"?: string;
    "addr:postcode"?: string;
    "addr:street"?: string;
    amenity?: string;
    attraction?: string;
    attribution?: string;
    information?: string;
    name?: string;
    "name:en"?: string;
    "name:es"?: string;
    "name:fr"?: string;
    "name:it"?: string;
    "name:ja"?: string;
    "name:ja-Hira"?: string;
    "name:ja-Latn"?: string;
    opening_hours?: string;
    phone?: string;
    religion?: string;
    "note:ja"?: string;
    source?: string;
    source_ref?: string;
    tourism?: string;
    wheelchair?: string;
    wikidata?: string;
    wikipedia?: string;
  }
}
