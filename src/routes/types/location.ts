namespace Validation {
  export interface LocationList {
    locations: Location[]
  }
  export interface Location {
    [id: string]: Element;
  }
}
