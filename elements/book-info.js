import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../styles/book-info.js';

class BookInfo extends PolymerElement {
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
      <style include="book-info">
        :host {
          margin: auto;
				  display: inline-block;
				  max-width: 180px;
        }
      </style>

      <div class="book-section">
	      <div class="book-cover">
	        <img class="book-img" src={{image}} />
		      <div class="book-info">
	          <p class="book-info-text"><strong class="title">{{title}}</strong></p>
	          <p class="book-info-text author">{{author}}</p>
		      </div>
	      </div>
	      <p class="book-meta"><strong>ISBN</strong> | {{isbn}}</p>
	      <p class="book-meta"><strong>Publisher</strong> | {{publisher}}</p>
	    </div>
    `;
  }

  truncateTitle() {
    this.title = this.title.length > 23 ? `${this.title.substr(0,23)}...` : this.title
  }

  ready() {
  	super.ready()
  	this.truncateTitle()
  }

}

window.customElements.define('book-info', BookInfo);