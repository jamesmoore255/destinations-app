import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/google-map/google-map.js';
import '@polymer/google-map/google-map-marker.js';
import '@polymer/google-map/google-map-search.js'
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import { DestinationsMapDefault } from './destinations-map-default.js'

/**
 * @customElement
 * @polymer
 */
export class DestinationsMap extends PolymerElement {
  static get template() {
    return html`
      <style is="custom-style">
      google-map {
        z-index: 1;
        height: 100vh;
      }
      datalist#queryList * {
        width: 100%;
        background-color: rgba(148, 147, 150, .5);
        outline: none;
        border: 0 solid;
      }
      </style>
      <google-map-search
        query$="{{query}}"
        results="{{results}}"
        api-key="AIzaSyB6no-JdLw75LtbfAHUvupiK7CSL7cz_jY"
        global-search
        map="{{map}}"
        types="regions"
      ></google-map-search>
      <template is="dom-if" if="[[!query]]">
        <destinations-map-default></destinations-map-default>
      </template>
      <template is="dom-if" if="[[query]]">
        <google-map 
          id="googleMap" 
          fit-to-markers 
          api-key="AIzaSyB6no-JdLw75LtbfAHUvupiK7CSL7cz_jY" 
          disable-street-view-control 
          map="{{map}}" 
          map-type="roadmap" 
          disable-map-type-control
          min-zoom="2.5"
          max-zoom="12"
          latitude="[[latitude]]"
          longitude="[[longitude]]"
          single-info-window></google-map>
      </template>
    `;
  }

  static get properties() {
    return {
      level: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        readOnly: false,
      },
      map: {
        type: Object,
        value: null,
      },
      selected: {
        type: String,
        value: null,
      },
      latitude: {
        type: Number,
        value: null,
      },
      longitude: {
        type: Number,
        value: null,
      },
      results: {
        type: Array,
        value: [],
      },
      place: {
        type: Object,
        computed: '_computePlace(selected, results)',
      },
    }
  }

  /**
   * Compute marker
   * @param {number} selected
   * @param {array} results
   * @return {*}
   * @private
   */
  _computePlace(selected, results) {
    console.log(results);
    const map = this.$.googleMap;
    if (!results.length) {
      return null;
    }
    const finalSelected = selected ? selected : 0;
    const selection = this.results[finalSelected];
    if (selection.types.includes('country')) {
      this.level = 'country';
    } else if (selection.types.includes('locality')) {
      this.level = 'locality';
    }
    const marker = document.createElement(`google-map-marker`);
    this.latitude = selection.latitude;
    this.longitude = selection.longitude;
    marker.latitude = selection.latitude;
    marker.longitude = selection.longitude;
    marker.label = selection.name;
    map.appendChild(marker);
  }

  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-map';
  }
}

window.customElements.define(DestinationsMap.is, DestinationsMap);
