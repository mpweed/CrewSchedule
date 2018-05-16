import '../../../vaadin-lumo-styles/font-icons.js';
import '../../../vaadin-lumo-styles/mixins/field-button.js';
import '../../../vaadin-text-field/theme/lumo/vaadin-text-field.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="lumo-date-picker" theme-for="vaadin-date-picker">
  <template>
    <style include="lumo-field-button">
      :host {
        outline: none;
      }

      [part="toggle-button"]::before {
        content: var(--lumo-icons-calendar);
      }

      [part="clear-button"]::before {
        content: var(--lumo-icons-cross);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
