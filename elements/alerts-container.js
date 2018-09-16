import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../styles/main-content.js';

class AlertsContainer extends PolymerElement {
  static get properties() {
    return {
      title: String
    };
  }
  static get template() {
    return html`
      <style include="main-content">
        :host {
          margin: auto;
		  display: inline-block;
		  width: 500px;
		  vertical-align: top;
        }
        .card {
        	margin: 0 15px;
        }
        .circle {
        	font-size: 8px;
        	cursor: pointer;
        	transition: 1s ease;
        }
        .circle:hover {
        	transform: scale(1.1);
        }
      </style>

      <div class="card">
        <p class="book-title">{{title}}</p>
        <h1>Options for this Title</h1>
        <div class="circle">Rent</div>
        <div class="circle">Buy New</div>
        <div class="circle">Buy Used</div>
	  </div>
    `;
  }
}

window.customElements.define('alerts-container', AlertsContainer);