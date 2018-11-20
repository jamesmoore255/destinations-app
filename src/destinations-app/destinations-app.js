import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';

import { DestinationsMap } from './destinations-map.js'

/**
 * @customElement
 * @polymer
 */
class DestinationsApp extends PolymerElement {

  constructor () {
    super();
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <app-drawer-layout fullbleed>
        <app-drawer slot="drawer">
          <paper-input label="Search..." no-label-float></paper-input>
          <paper-button onclick="{{_mapFunc}}" raised>Things to do...</paper-button>
          <div role="listbox">
            <paper-item>Montserrate <iron-icon icon="maps:directions-walk"></iron-icon></paper-item>
          </div>
          <paper-button raised>Tours</paper-button>
          <div role="listbox">
            <paper-item>Bogota Graffiti Tour <iron-icon icon="maps:local-see"></iron-icon></paper-item>
          </div>
          <paper-button raised>Hot-spots <iron-icon icon="social:whatshot"></iron-icon></paper-button>
          <div role="listbox">
            <paper-item>La Candelaria <iron-icon icon="maps:person-pin-circle"></iron-icon></paper-item>
            <paper-item>Zona T <iron-icon icon="maps:local-bar"></iron-icon></paper-item>
            <paper-item>Zona G <iron-icon icon="maps:restaurant"></iron-icon></paper-item>
          </div>
        </app-drawer>
        <div>
          <destinations-map id="map"></destinations-map>
        </div>
      </app-drawer-layout>
    `;
  }

  // static get properties() {
  //
  // }

  _mapFunc() {
    console.log(document.getElementById(`map`));
  }
}

window.customElements.define('destinations-app', DestinationsApp);
