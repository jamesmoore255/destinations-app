import { PolymerElement } from '@polymer/polymer/polymer-element.js';

export const WorldLocationsMixin = (superClass) => class extends superClass {
  static get properties() {
    return {
      countries: {
        type: Array,
        value: [
          {
            country: 'Australia',
            lat: -27,
            lng: 133,
          },
          {
            country: 'Argentina',
            lat: -34,
            lng: -64,
          },
          {
            country: 'Colombia',
            lat: 4,
            lng: -72,
          },
          {
            country: 'Cuba',
            lat: 21.5,
            lng: -80,
          },
          {
            country: 'Egypt',
            lat: 27,
            lng: 30,
          },
          {
            country: 'Greece',
            lat: 39,
            lng: 22,
          }
        ],
      }
    }
  }
};

// export const WorldLocatinsMixin = WorldLocations(PolymerElement);
