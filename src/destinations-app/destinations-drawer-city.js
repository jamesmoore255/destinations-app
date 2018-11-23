import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';

export class DestinationsDrawerCity extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return html`
      <paper-button raised>Things to do...</paper-button>
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
    `;
  }
  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-drawer-city';
  }
}

window.customElements.define(DestinationsDrawerCity.is, DestinationsDrawerCity);
