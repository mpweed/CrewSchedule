import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsDialog extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .dialogBackground {                    
                    background-color: black;
                    top: 48px;
                    left: 48px;
                    width: calc(100% - 48px);
                    height: calc(100vh - 48px);
                    opacity: 0;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                    position: fixed;
                    z-index: 50;
                }

                .dialog {
                    top: 48px;
                    left: calc(100% + 10px);
                    width: calc(100% - 600px);
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
                    left: 600px;                
                }

                .fadeIn80 {
                    opacity: .8;
                    pointer-events: auto;
                }

                .noPointerEvents {
                    pointer-events: none;
                }
            </style>
            <div id="dialogBackground" class="dialogBackground noPointerEvents"></div>
            <div id="container" class="dialog">
                <slot></slot>
            </div>
            `;
    }

    // Public Methods
    show() {
        this.$.dialogBackground.classList.add("fadeIn80");
        this.$.container.classList.add("dialogShown");
    }

    hide() {
        this.$.dialogBackground.classList.remove("fadeIn80");
        this.$.container.classList.remove("dialogShown");
    }    
}
customElements.define('cs-dialog', CsDialog);