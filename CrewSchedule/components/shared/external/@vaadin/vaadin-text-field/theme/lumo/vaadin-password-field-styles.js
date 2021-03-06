import '../../../vaadin-lumo-styles/font-icons.js';
import '../../../vaadin-lumo-styles/sizing.js';
import '../../../vaadin-lumo-styles/mixins/field-button.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="lumo-password-field" theme-for="vaadin-password-field">
  <template>
    <style include="lumo-field-button">
      [part="reveal-button"]::before {
        content: var(--lumo-icons-eye);
      }

      :host([password-visible]) [part="reveal-button"]::before {
        content: var(--lumo-icons-eye-disabled);
      }

      /* Make it easy to hide the button across the whole app */
      [part="reveal-button"] {
        display: var(--lumo-password-field-reveal-button-display, block);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
