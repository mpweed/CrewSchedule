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
                    width: 400px;
                    height: calc(100vh - 48px);
                    background-color: var(--paper-grey-900);
                    border: 1px solid var(--paper-grey-800);
                    position: fixed;
                    -webkit-transition: left .5s ease-in-out;
                    -moz-transition: left .5s ease-in-out;
                    -o-transition: left .5s ease-in-out;
                    transition: left .5s ease-in-out;
                    z-index: 100;
                    overflow: auto;
                    overflow-x: hidden;
                }

                .dialogShown {
                    left: calc(100% - 400px);                
                }

                .noPointerEvents {
                    pointer-events: none;
                }

                .fadeIn80 {
                    opacity: .8;
                    pointer-events: auto;
                }
            </style>
            <div id="dialogBackground" class="dialogBackground noPointerEvents"></div>
            <div id="container" class="dialog scroll">
                <slot></slot>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isShown: {
                type: Boolean,
                notify: true
            },
            dialogWidth: {
                type: String,
                notify: true
            }
        }
    }

    // Public Methods
    show() {
        this.$.dialogBackground.classList.add("fadeIn80");
        this.$.container.classList.add("dialogShown");
        this.isShown = true;
        this.dispatchEvent(new CustomEvent('dialogshown', { bubbles: true, composed: true }));
    }

    hide() {
        this.$.dialogBackground.classList.remove("fadeIn80");
        this.$.container.classList.remove("dialogShown");
        this.isShown = false;
        this.dispatchEvent(new CustomEvent('dialoghidden', { bubbles: true, composed: true }));
    }    
}
customElements.define('cs-dialog', CsDialog);