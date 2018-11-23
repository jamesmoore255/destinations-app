import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { updateStyles } from '@polymer/polymer/lib/mixins/element-mixin.js';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input-container.js';

import {DestinationsMap} from './destinations-map.js';
import {DestinationsDrawer} from './destinations-drawer.js';

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
          --app-drawer-width: 256px;
        }
        app-drawer-layout {
          position: absolute;
        }
        destinations-map {
          width: 100vw;
          height: 100vh;
        }
        paper-input-container {
          text-align: left;
          width: 40%;
          margin: auto;
          padding: 0;
          position: relative;
          top: 50%;
          bottom: 50%;
          z-index: 2;
          height: 0;
        }
        .map-input {
          position: absolute;
          width: 100%;
          top: 50%;
          bottom: 50%;
          text-align: center;
        }
        input {
          width: 100%;
          background-color: rgba(148, 147, 150, .5);
          outline: none;
          border: 0 solid;
          z-index: 2;
        }
      </style>
      <app-drawer-layout fullbleed>
        <app-drawer id="drawer" slot="drawer">
          <destinations-drawer level="[[level]]"></destinations-drawer>
        </app-drawer>
        <div>
          <div class="map-input">
            <paper-input-container>
              <iron-input slot="input">
                <input placeholder="Let's see what's here..."/>
              </iron-input>
            </paper-input-container>
          </div>
          <destinations-map places="{{places}}"></destinations-map>
        </div>
      </app-drawer-layout>
    `;
  }

  // static get hideDrawer() {
  //   return () => {
  //     updateStyles({
  //       '--app-drawer-width': 0,
  //     });
  //   }
  // }

  static get properties() {
    return {
      places: {
        type: String,
        value: [
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
          }],
      },
      level: {
        type: String,
        value: `world`,
        observer: `_sideLevel`
      },
    };
  }
  _sideLevel(newLevel, oldLevel) {
    if (newLevel === 'world' || newLevel === 'place') {
      this.updateStyles({
        '--app-drawer-width': 0,
      });
    } else {}
  }
  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-app';
  }
}

window.customElements.define(DestinationsApp.is, DestinationsApp);
