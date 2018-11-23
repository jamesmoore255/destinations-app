import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/google-map/google-map.js';
import '@polymer/google-map/google-map-marker.js';
import '@polymer/google-map/google-map-search.js'
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

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
      <google-map id="googleMap" places="{{places}}" fit-to-markers api-key="****************" disable-street-view-control map="{{map}}" map-type="roadmap" disable-map-type-control zoom="8" max-zoom="9" min-zoom="5" single-info-window></google-map>
    `;
  }

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

  // Observe the name sub-property on the user object
  // static get observers() {
  //   return [
  //     `_runFilter(filter.query)`,
  //     // '_zoomIn(zoomIn.option)'
  //   ]
  // }
  // For a property or sub-property dependency, the corresponding
  // argument is the new value of the property or sub-property
  // _runFilter(query) {
  //   if (query) {
  //     const dataList = this.$.queryList;
  //     const option = document.createElement(`option`);
  //     Array.from(this.$.google_map.children).forEach((m) => {
  //       if (m.title.toLowerCase().indexOf(query.toLowerCase()) === -1) {
  //         m.hidden = true;
  //       }
  //       if (m.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
  //         const arrayChecker = [];
  //         Array.from(dataList.children).forEach((opt) => {
  //           arrayChecker.push(opt.id);
  //         });
  //         if (!arrayChecker.includes(m.title)) {
  //           option.value = m.title;
  //           option.id = m.title;
  //           dataList.appendChild(option);
  //         }
  //       }
  //     //  Do not repeat additions of options
  //     });
  //   } else if (!this.$.google_map.children.length) {
  //     let map = this.$.google_map;
  //     map.latitude = `4.6486259`;
  //     map.longitude = `-74.2478909`;
  //     map.zoom = 5.5;
  //     this.map_markers.forEach((loc) => {
  //       const marker = document.createElement(`google-map-marker`);
  //       marker.title = loc.title;
  //       marker.latitude = loc.location.lat;
  //       marker.longitude = loc.location.lng;
  //       map.appendChild(marker);
  //     });
  //   }
  // }
  // _zoomIn(option) {
  //   option.preventDefault();
  //   console.log(option);
  // if (option.code === `Enter`) {
  //   let map = this.$.google_map;
  //   Array.from(map.children).forEach((marker) => {
  //     if (marker.title.toLowerCase().indexOf(option.target.value.toLowerCase()) !== -1) {
  //       map.latitude = marker.latitude;
  //       map.latitude = marker.latitude;
  //       map.zoom = 10;
  //     }
  //   });
  //   console.log(`Enter`);
  // }
// }
  _computeMarkers(places) {
    const map = this.$.googleMap;
    places.forEach((place) => {
      const marker = document.createElement(`google-map-marker`);
      marker.latitude = place.location.lat;
      marker.longitude = place.location.lng;
      marker.label = place.title;
      map.appendChild(marker);
    })
  }
  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-map';
  }
}

window.customElements.define(DestinationsMap.is, DestinationsMap);
