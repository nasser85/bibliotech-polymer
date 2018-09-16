import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './book-info.js';
import './alerts-container.js';
import '../styles/main-content.js';

class MainContent extends PolymerElement {
	constructor() {
		super();
	}
	static get properties() {
    return {
      isbn: String,
      image: String,
      publisher: String,
      title: String,
      author: String
    };
  }
  static get template() {
    return html`
      <style include="">
        :host {
          padding: 10px;
        }
        .main-content {
          max-width: 800px;
          margin: auto;
        }
      </style>

      <div class="main-content"> 
	      <book-info title={{title}}
                   isbn={{isbn}}
                   image={{image}}
                   publisher={{publisher}}
                   author={{author}}></book-info>
        <alerts-container title={{title}}></alerts-container>
	    </div>
    `;
  }

}

window.customElements.define('main-content', MainContent);