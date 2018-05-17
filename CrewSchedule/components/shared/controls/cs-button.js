import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsButton extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .button {
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-top: 4px;
                    padding-bottom: 4px;               
                    border-radius: 26px;
                    color: var(--cs-button-color);
                    border: 2px solid var(--cs-button-color);
                    cursor: pointer;
                    text-align: center;
                    display: inline-block;
                    outline: 0;
                }

                .button:hover {
                    color: var(--cs-button-hover-color);
                    border: 2px solid var(--cs-button-hover-color);
                }

                .button:active {
                    color: var(--cs-button-active-color);
                    border: 2px solid var(--cs-button-active-color);
                }

                .button:focus {
                    color: var(--cs-button-focus-color);
                    border: 2px solid var(--cs-button-focus-color);
                }

                .disabled {
                    color: var(--cs-button-disabled-color);
                    border-color: var(--cs-button-disabled-color);
                    pointer-events: none;
                }
            </style>
            <div tabindex="1" id="internalButton" class="button" on-keydown="_checkForEnter">
                <slot></slot>
            </div>
            `;
    }

    static get properties() {
        return {
            disabled: {
                type: Boolean,
                observer: "_disabledChanged"
            }
        }
    }

    // Event Handlers
    _checkForEnter(e) {
        if (e.keyCode === 13) {
            this.dispatchEvent(new Event('tap', { bubbles: true, composed: true }));
        }
    }

    _disabledChanged(newValue, oldValue) {
        if (newValue) {
            this.$.internalButton.classList.add("disabled");
            this.style.pointerEvents = "none";
            this.$.internalButton.removeAttribute("tabindex");
        } else {
            this.$.internalButton.classList.remove("disabled");
            this.style.pointerEvents = "auto";
            this.$.internalButton.setAttribute("tabindex", 1);
        }
    }    
}
customElements.define('cs-button, CsButton);