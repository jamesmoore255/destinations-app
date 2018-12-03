import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { updateStyles } from '@polymer/polymer/lib/mixins/element-mixin.js';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input-container.js';

import {DestinationsMap} from './destinations-map.js';
import {DestinationsDrawer} from './destinations-drawer.js';

const firebase = window.firebase;

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
          --app-drawer-width: 256px;
        }
        app-drawer-layout {
          position: absolute;
        }
        destinations-map {
          width: 100vw;
          height: 100vh;
        }
        paper-input {
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
          <destinations-drawer level="{{level}}"></destinations-drawer>
        </app-drawer>
        <div>
          <div class="map-input">
            <paper-input
              value="{{searchText}}"
              placeholder="Let's see what's here..."
            ></paper-input>
            <!--<paper-input-container>-->
              <!--<iron-input slot="input">-->
                <!--<input value="{{searchText}}" placeholder="Let's see what's here..."/>-->
              <!--</iron-input>-->
            <!--</paper-input-container>-->
          </div>
          <destinations-map query="{{query}}" level="{{level}}"></destinations-map>
        </div>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      level: {
        type: String,
        value: 'world',
        observer: `_sideLevel`,
        reflectToAttribute: true,
        notify: true,
        readOnly: false,
      },
      searchText: {
        type: String,
        value: null,
      },
      query: {
        type: String,
        value: null,
        computed: '_computeQuery(searchText)',
      },
    };
  }

  /**
   * Dictates styling of main application depending
   * on the map level (world, country, city, place)
   *
   * @param {String} newLevel
   * @param {String} oldLevel
   * @private
   */
  _sideLevel(newLevel, oldLevel) {
    if (newLevel === 'world' || newLevel === 'point_of_interest') {
      this.updateStyles({
        '--app-drawer-width': 0,
      });
      // const functions = firebase.functions();
      // const request = functions.httpsCallable('world-locations');
      // try {
      //   // const locations = await request({});
      //   // console.log(locations);
      // } catch (error) {
      //   console.log(error);
      // }
      // const functions = firebase.functions();
      // const request = functions.httpsCallable('world-locations');
    } else {
      this.updateStyles({
        '--app-drawer-width': '256px',
      });
    }
  }

  /**
   * Compute query
   *
   * @param {string} text
   * @return {*}
   * @private
   */
  _computeQuery(text) {
    if (typeof text === 'string' && text && text.length >= 3) {
      return text;
    }
    return null;
  }

  /**
   * @return {string}
   */
  static get is() {
    return 'destinations-app';
  }
}

window.customElements.define(DestinationsApp.is, DestinationsApp);
