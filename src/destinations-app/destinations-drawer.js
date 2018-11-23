import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';

import { DestinationsDrawerCountry } from "./destinations-drawer-country";
import { DestinationsDrawerCity } from "./destinations-drawer-city";

export class DestinationsDrawer extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return html`
      <paper-input label="Search..." no-label-float></paper-input>
      <div id="render"></div>
    `;
  }

  static get properties() {
    return {
      level: {
        type: String,
        value: null,
        observer: '_sideLevel'
      },
    }
  }

  _sideLevel(newLevel, oldLevel) {
    if (newLevel === 'country') {
      this.$.render.innerHTML = `<destinations-drawer-country></destinations-drawer-country>`;
    } else if (newLevel === 'city') {
      this.$.render.innerHTML = `<destinations-drawer-city></destinations-drawer-city>`;
    } else {}
  }
  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-drawer';
  }
}

window.customElements.define(DestinationsDrawer.is, DestinationsDrawer);
