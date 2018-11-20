import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@em-polymer/google-map/google-map.js';
import '@em-polymer/google-map/google-map-marker.js';
import '@polymer/iron-input/iron-input.js'
import '@polymer/paper-input/paper-input-container.js';

/**
 * @customElement
 * @polymer
 */
export class DestinationsMap extends PolymerElement {
  static get template() {
    return html`
      <style is="custom-style">
      .map-input {
        position: absolute;
        width: 100%;
        top: 50%;
        bottom: 50%;
        text-align: center;
      }
      paper-input-container {
        text-align: left;
        width: 40%;
        margin: auto;
        position: relative;
        z-index: 2;
        height: 1.8em;
      }
      #map google-map {
        z-index: 1;
        height: 100vh;
        width: 100%;
      }
      #map input {
        width: 100%;
        background-color: rgba(148, 147, 150, .5);
        outline: none;
        border: 0 solid;
        z-index: 2;
      }
      datalist#queryList * {
        width: 100%;
        background-color: rgba(148, 147, 150, .5);
        outline: none;
        border: 0 solid;
      }
      </style>
      
      <main id="map">
        <div class="map-input">
          <paper-input-container class="container">
            <iron-input slot="input">
              <input placeholder="Let's see what's here..." id="filter" type="search" list="queryList" value="{{filter.query::input}}"/>
              <datalist id="queryList"></datalist>
              <!-- Possible to change this to a div role=listbox AND include paper-item as list -->
            </iron-input>
          </paper-input-container>
        </div>
        <google-map id="google_map" api-key="AIzaSyB6no-JdLw75LtbfAHUvupiK7CSL7cz_jY" draggable="true"></google-map>
      </main>
    `;
  }
  constructor() {
    super();
    this.map_markers = [
      {
        title: `Bogota Distrito Capital`,
        location: {lat: `4.6486259`, lng: `-74.2478909`}
      },
      {
        title: `Medellin`,
        location: {lat: `6.2477005`, lng: `-75.5570078`}
      },
      {
        title: `Cali`,
        location: {lat: `3.4260776`, lng: `-76.5098731`}
      },
      {
        title: `Cartagena`,
        location: {lat: `10.3999436`, lng: `-75.4872399`}
      },
      {
        title: `Leticia`,
        location: {lat: `-4.214643406856815`, lng: `-69.93831087829591`}
      }];
  }
  static get properties() {
    return {
      map_markers: {
        type: Array
      },
      filter: {
        type: Object,
        value: () => {
          return {};
        }
      },
      // zoomIn: {
      //   type: Object,
      //   value: () => {
      //     return {};
      //   }
      // }
    }
  }
  // Observe the name sub-property on the user object
  static get observers() {
    return [
      `_runFilter(filter.query)`,
      // '_zoomIn(zoomIn.option)'
    ]
  }
  ready() {
    super.ready();
    this.$.filter.addEventListener(`keyup`, e => {this._zoomIn(e)})
  }
  // For a property or sub-property dependency, the corresponding
  // argument is the new value of the property or sub-property
  _runFilter(query) {
    if (query) {
      const dataList = this.$.queryList;
      const option = document.createElement(`option`);
      Array.from(this.$.google_map.children).forEach((m) => {
        if (m.title.toLowerCase().indexOf(query.toLowerCase()) === -1) {
          m.hidden = true;
        }
        if (m.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          const arrayChecker = [];
          Array.from(dataList.children).forEach((opt) => {
            arrayChecker.push(opt.id);
          });
          if (!arrayChecker.includes(m.title)) {
            option.value = m.title;
            option.id = m.title;
            dataList.appendChild(option);
          }
        }
      //  Do not repeat additions of options
      });
    } else if (!this.$.google_map.children.length) {
      let map = this.$.google_map;
      map.latitude = `4.6486259`;
      map.longitude = `-74.2478909`;
      map.zoom = 5.5;
      this.map_markers.forEach((loc) => {
        const marker = document.createElement(`google-map-marker`);
        marker.title = loc.title;
        marker.latitude = loc.location.lat;
        marker.longitude = loc.location.lng;
        map.appendChild(marker);
      });
    }
  }
  _zoomIn(option) {
    option.preventDefault();
    if (option.code === `Enter`) {
      let map = this.$.google_map;
      Array.from(map.children).forEach((marker) => {
        if (marker.title.toLowerCase().indexOf(option.target.value.toLowerCase()) !== -1) {
          map.latitude = marker.latitude;
          map.latitude = marker.latitude;
          map.zoom = 10;
        }
      });
      console.log(`Enter`);
    }
  }
}

window.customElements.define('destinations-map', DestinationsMap);