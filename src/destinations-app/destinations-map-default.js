import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/google-map/google-map.js';
import '@polymer/google-map/google-map-marker.js';
import '@polymer/google-map/google-map-search.js'
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import { WorldLocationsMixin } from "./destinations-locations-world";

/**
 * @customElement
 * @polymer
 */
export class DestinationsMapDefault extends GestureEventListeners(WorldLocationsMixin(PolymerElement)) {

  constructor() {
    super();
    this.places = this.countries;
  }


  static get template() {
    return html`
      <style is="custom-style">
      google-map {
        z-index: 1;
        height: 100vh;
      }
      </style>
      <google-map 
        id="googleMap" 
        fit-to-markers 
        api-key="AIzaSyB6no-JdLw75LtbfAHUvupiK7CSL7cz_jY" 
        disable-street-view-control map="{{map}}" 
        map-type="roadmap" 
        disable-map-type-control zoom="2.5" 
        single-info-window>
      </google-map>
    `;
  }

  // ready() {
  //   super.ready();
  //   console.log(document.querySelector('google-map-marker'));
  // }

  static get properties() {
    return {
      places: {
        type: Array,
        value: null,
      },
      defaultMarkers: {
        type: String,
        value: null,
        computed: '_computeMarkers(places)',
      },
      map: {
        type: Object,
        value: null,
      },
    }
  }

  _computeMarkers(places) {
    const map = this.$.googleMap;
    places.forEach((place) => {
      const marker = document.createElement(`google-map-marker`);
      marker.latitude = place.lat;
      marker.longitude = place.lng;
      marker.label = place.title;
      marker.clickEvents = true;
      // marker.addEventListener()
      map.appendChild(marker);
    })
  }

  _onclick(s) {
    console.log(s);
  }

  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-map-default';
  }
}

window.customElements.define(DestinationsMapDefault.is, DestinationsMapDefault);