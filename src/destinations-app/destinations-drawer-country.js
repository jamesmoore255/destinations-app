import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/iron-icons/places-icons.js';

export class DestinationsDrawerCountry extends GestureEventListeners(PolymerElement) {
  constructor() {
    super();
  }

  static get template() {
    return html`
      <paper-button on-tap="tapHandler" raised>Cities</paper-button>
      <div role="listbox">
        <paper-item>Bogota <iron-icon icon="social:location-city"></iron-icon></paper-item>
      </div>
      <paper-button raised>National Parks</paper-button>
      <div role="listbox">
        <paper-item>Tayrona <iron-icon icon="places:beach-access"></iron-icon></paper-item>
        <paper-item>Sierra Nevada de Santa Marta <iron-icon icon="maps:terrain"></iron-icon></paper-item>
      </div>
      <paper-button raised>Hot-spots <iron-icon icon="social:whatshot"></iron-icon></paper-button>
      <div role="listbox">
        <paper-item>San Andres <iron-icon icon="places:beach-access"></iron-icon></paper-item>
        <paper-item>Cuidad Perdida <iron-icon icon="maps:directions-walk"></iron-icon></paper-item>
        <paper-item>Old Town Cartagena <iron-icon icon="maps:local-see"></iron-icon></paper-item>
      </div>
    `;
  }
  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-drawer-country';
  }
  tapHandler(tap) {
    console.log(tap);
  }
}

window.customElements.define(DestinationsDrawerCountry.is, DestinationsDrawerCountry);
