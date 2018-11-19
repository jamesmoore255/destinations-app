import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { DestinationsMap } from './destinations-map.js'

/**
 * @customElement
 * @polymer
 */
class DestinationsApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        destinations-map {
          height: 100vh;
          width: 100%;
        }
      </style>
      <destinations-map></destinations-map>
    `;
  }
}

window.customElements.define('destinations-app', DestinationsApp);
