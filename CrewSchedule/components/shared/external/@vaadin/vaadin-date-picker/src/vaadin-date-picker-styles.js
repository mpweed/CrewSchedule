import '../../../@polymer/polymer/lib/elements/custom-style.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'vaadin-date-picker-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
</custom-style><dom-module id="vaadin-date-picker-overlay-styles" theme-for="vaadin-date-picker-overlay">
  <template>
    <style>
      :host {
        align-items: flex-start;
        justify-content: flex-start;
      }

      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      :host([right-aligned]) {
        align-items: flex-end;
      }

      [part="overlay"] {
        display: flex;
        flex: auto;
      }

      [part~="content"] {
        flex: auto;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
