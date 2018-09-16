/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@polymer/iron-ajax/iron-ajax.js';
import './my-icons.js';

import('../elements/main-content.js');

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  constructor() {
    super()
  }
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
       <iron-ajax auto 
                 url="https://d1re4mvb3lawey.cloudfront.net/{{isbn}}/index.json"
                 handle-as="json"
                 on-response="handleResponse">
      </iron-ajax>
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Table of Contents</app-toolbar>
          <iron-selector class="drawer-list" role="navigation">
            <template is="dom-repeat" items="{{toc}}">
               <a name="pg1017" href="[[rootPath]]{{item.file}}">{{item.title}} - Page {{item.first}}</a>
            </template>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Bibliotech Challenge</div>
            </app-toolbar>
          </app-header>

            <main-content isbn={{isbn}}
                          image={{image}}
                          author={{author}}
                          publisher={{publisher}}
                          title={{title}}></main-content>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      isbn: {
        type: String,
        value: 'pg1017'
      },
      image: String,
      author: String,
      publisher: String,
      title: String,
      toc: Array
    };
  }

  truncateTitle(title) {
    return title.length > 23 ? `${title.substr(0,23)}...` : title
  }

  handleResponse(res) {
    let bookInfo = res.detail.__data.response
    console.log(bookInfo)
    this.title = bookInfo.title
    this.author = bookInfo.contributors[0]
    this.publisher = bookInfo.publisher ? bookInfo.publisher : 'not available'
    this.isbn = bookInfo.isbn;
    this.toc = bookInfo.toc;
    this.image = `https://d1re4mvb3lawey.cloudfront.net/${bookInfo.isbn}/cover.jpg`
  }
}

window.customElements.define('my-app', MyApp);
