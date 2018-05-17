import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsConfirm extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .confirmPanelBackground {
                    position: fixed;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background-color: black;
                    opacity: 0;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                    z-index: 200;
                }

                .confirmDialog {
                    position: absolute;
                    top: 0;
                    margin: 100px auto;
                    width: 80%;
                    max-width: 800px;
                    border: solid 1px var(--paper-blue-grey-300);
                    background-color: var(--paper-grey-900);
                    opacity: 0;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                    z-index: 200;
                    overflow: hidden;
                }

                iron-icon {
                    width: 48px;
                    height: 48px;
                }

                .questionIcon {
                    color: var(--paper-blue-grey-300);
                    width: 48px;
                    height: 48px;
                    margin-left: 10px;
                    margin-top: 20px;
                }

                .message {
                    margin-top:  30px;
                    margin-left: 10px;
                    margin-right: 10px;
                    font-size: 1.2em;
                }

                .dialogButtons {
                    margin-top: 20px;
                    margin-right: 20px;
                    margin-bottom: 20px;
                }

                .yesButton {
                    --cs-button-color: var(--paper-pink-400);
                    --cs-button-hover-color: var(--paper-pink-300);
                }

                .noButton {
                    margin-left: 10px;
                }

                .fadeIn {
                    opacity: 1;
                    pointer-events: auto;
                }

                .fadeIn80 {
                    opacity: .8;
                    pointer-events: auto;
                }

                .noPointerEvents {
                    pointer-events: none;
                }
            </style>
            <div id="confirmPanelBackground" class="confirmPanelBackground noPointerEvents"></div>
            <div class="horizontal layout center-justified">
                <div id="confirmDialog" class="confirmDialog noPointerEvents">
                    <div class="horizontal layout">
                        <div class="questionIcon">
                            <iron-icon icon="help"></iron-icon>
                        </div>
                        <div class="message">[[message]]</div>
                    </div>
                    <div class="horizontal layout end-justified dialogButtons">
                        <jic-button class="yesButton" on-tap="_yes">Yes</jic-button>
                        <jic-button class="noButton" on-tap="_no">No</jic-button>
                    </div>
                </div>
            </div>
            `;
    }

    static get properties() {
        return {
            message: {
                type: String
            }
        }
    }

    // Event Handlers
    _yes(e) {
        this.hide();
        this.dispatchEvent(new CustomEvent("yes"));
    }

    _no(e) {
        this.hide();
        this.dispatchEvent(new CustomEvent("no"));
    }

    // Public Methods
    show() {
        this.$.confirmPanelBackground.classList.add("fadeIn80");
        this.$.confirmPanelBackground.classList.remove("noPointerEvents");
        this.$.confirmDialog.classList.add("fadeIn");
        this.$.confirmDialog.classList.remove("noPointerEvents");
    }

    hide() {
        this.$.confirmDialog.classList.remove("fadeIn");
        this.$.confirmDialog.classList.add("noPointerEvents");
        this.$.confirmPanelBackground.classList.remove("fadeIn80");
        this.$.confirmPanelBackground.classList.add("noPointerEvents");
    }    
}
customElements.define('cs-confirm', CsConfirm);