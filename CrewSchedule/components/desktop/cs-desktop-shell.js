import { PolymerElement, html } from '../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../shared/cs-shared-styles.js';
class CsDesktopShell extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style>
                /* CSS rules for your element */
            </style>
            <cs-timeline></cs-timeline>
            `;
    }

    // Public Properties
    static get properties() {
        return {
            greeting: {
                type: String
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.greeting = "Hello Desktop";
    }

    // Event Handlers

}
customElements.define('cs-desktop-shell', CsDesktopShell);