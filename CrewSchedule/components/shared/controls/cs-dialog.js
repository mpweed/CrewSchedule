import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsDialog extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .dialog {
                    top: 48px;
                    left: calc(100% + 10px);
                    width: calc(100% - 48px);
                    height: calc(100vh - 48px);
                    background-color: var(--paper-grey-800);
                    border: 2px solid var(--paper-grey-900);
                    position: fixed;
                    -webkit-transition: left .5s ease-in-out;
                    -moz-transition: left .5s ease-in-out;
                    -o-transition: left .5s ease-in-out;
                    transition: left .5s ease-in-out;
                    z-index: 100;
                }

                .dialogShown {
                    left: 48px;                
                }
            </style>
            <div id="container" class="dialog">
                <slot></slot>
            </div>
            `;
    }

    // Public Methods
    show() {
        this.$.container.classList.add("dialogShown");
    }

    hide() {
        this.$.container.classList.remove("dialogShown");
    }    
}
customElements.define('cs-dialog', CsDialog);