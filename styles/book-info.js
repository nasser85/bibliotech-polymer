import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="book-info">
  <template>
    <style>
      .book-img {
			  border-radius: 3px;
			  width: 100%;
			  height:auto;
			  margin: 0;
			}
			.book-cover {
			  width: 100%;
			  border-radius: 3px;
			  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.0901961); 
			  margin-bottom: 15px;
			}
			.book-info {
			  background-color: rgba(255,255,255, 0.9);
			  position: relative;
			  margin-top: -71px;
			  padding: 15px;
			}
			.book-info-text {
			  margin: 0;
			  font-size: 11.4px;
			}
			.book-meta {
			  margin: 0;
			}
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);