import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsNotificationPanel extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                :host {
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    position: absolute;
                    z-index: 200;                
                    pointer-events: none;
                }

                iron-icon {                
                    width: 48px;
                    height: 48px;                
                }

                .spinnerPanel {
                    top: 0;
                    position: absolute;
                    opacity: 0;
                }

                paper-spinner-lite {
                    margin-top: 100px;
                    width: 100px;
                    height: 100px;
                    --paper-spinner-color: var(--paper-orange-300);
                    --paper-spinner-stroke-width: 6px;
                }

                .successPanel {
                    width: 170px;
                    height: 60px;
                    right: 20px;
                    bottom: 20px;
                    position: fixed;
                    border: solid 1px var(--paper-green-600);
                    border-left-style: solid;
                    border-left-width: 6px;
                    border-left-color: var(--paper-green-600);
                    background-color: var(--paper-grey-800);
                    opacity: 0;
                    -webkit-transition: opacity .5s ease-in-out;
                    -moz-transition: opacity .5s ease-in-out;
                    -o-transition: opacity .5s ease-in-out;
                    transition: opacity .5s ease-in-out;
                }

                #checkIcon {
                    color: var(--paper-green-600);
                    width: 48px;
                    height: 48px;
                    margin-left: 6px;
                    margin-top: 6px;
                }

                #successMessage, #errorCaption {
                    margin-left: 6px;
                    margin-top: 12px;
                    color: #ffffff;
                    font-size: 1.5em;
                }

                .errorPanel {
                    width: 300px;
                    height: 100px;
                    right: 20px;
                    bottom: 20px;
                    position: fixed;
                    border: solid 1px red;
                    border-left-style: solid;
                    border-left-width: 6px;
                    border-left-color: red;
                    background-color: var(--paper-grey-800);
                    opacity: 0;
                    -webkit-transition: opacity .5s ease-in-out;
                    -moz-transition: opacity .5s ease-in-out;
                    -o-transition: opacity .5s ease-in-out;
                    transition: opacity .5s ease-in-out;
                }

                #errorIcon {
                    color: red;
                    width: 48px;
                    height: 48px;
                    margin-left: 6px;
                    margin-top: 6px;
                }

                .errorPanelButtons {
                    font-size: .8em;
                    font-weight: 200;
                }

                .notificationPanelBackground {
                    width: 100%;
                    height: 100vh;
                    background-color: black;
                    opacity: 0;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                }

                .errorDetailDialog {
                    position: absolute;
                    top: 0;
                    margin: 100px auto;
                    width: 80%;
                    height: 20%;
                    border: solid 1px var(--paper-lime-300);
                    background-color: var(--paper-grey-900);
                    opacity: 0;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                }

                .dialogTitleBar {
                    background-color: var(--paper-lime-300);
                    font-weight: 400;
                }

                .errorDetailsDialogCaption {                
                    margin-left: 8px;
                    font-size: 1.5em;
                    font-weight: 100;
                    color: #ffffff;
                }



                .errorMessage {
                    height: calc(100% - 60px);
                    overflow: auto;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    margin-left: 8px;
                    margin-right: 8px;
                    padding-right: 8px;
                    font-weight: 300;               
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
            <div id="successPanel" class="horizontal layout flex successPanel noPointerEvents">
                <div id="checkIcon">
                    <iron-icon icon="check-circle"></iron-icon>
                </div>
                <div id="successMessage">Success!</div>
            </div>
            <div id="errorPanel" class="vertical layout errorPanel noPointerEvents" on-transitionend="_errorPanelTransitionend">
                <div class="horizontal layout flex">
                    <div id="errorIcon">
                        <iron-icon icon="error"></iron-icon>
                    </div>
                    <div id="errorCaption">An error has occured</div>
                </div>
                <div class="horizontal layout end-justified errorPanelButtons">
                    <paper-button on-tap="_ShowErrorDetail">Details</paper-button>
                    <paper-button on-tap="_CloseErrorToast">Close</paper-button>
                </div>
            </div>
            <div id="notificationPanelBackground" class="notificationPanelBackground noPointerEvents"></div>
            <div class="horizontal layout center-justified">
                <div id="errorDetailDialog" class="errorDetailDialog noPointerEvents">
                    <div class="horizontal layout flex dialogTitleBar">
                        <div class="errorDetailsDialogCaption flex self-center">Error Details</div>
                        <paper-icon-button icon="close" on-tap="_CloseErrorDetail"></paper-icon-button>
                    </div>
                    <div class="errorMessage scroll">[[errorMessage]]</div>
                </div> 
            </div>
            <div class="horizontal layout center-justified">
                <div id="spinnerPanel" class="spinnerPanel noPointerEvents">
                    <paper-spinner-lite active></paper-spinner-lite>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isBusy: {
                type: Boolean,
                value: false,
                notify: true,
                observer: "_isBusyChanged"
            },
            isSuccess: {
                type: Boolean,
                value: false,
                notify: true,
                observer: "_isSuccessChanged"
            },
            isException: {
                type: Boolean,
                value: false,
                notify: true,
                observer: "_isExceptionChanged"
            },
            errorMessage: {
                type: String,
                value: "This is just a test of a really long message to set the scrolling portion of the Error Toast Message. If this had been a real error it probably would have been longer and more cryptic as it would have come from the Service or Database layer of the application."
            },
            isErrorDetailVisible: {
                type: Boolean,
                value: false,
                observer: "_isErrorDetailVisibleChanged"
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.timer = null;
    }

    // Event Handlers
    _isBusyChanged(newValue, oldValue) {
        if (newValue) {
            // Show busy indicator
            this.$.notificationPanelBackground.classList.add("fadeIn80");
            this.$.spinnerPanel.classList.add("fadeIn");
            this.$.spinnerPanel.classList.remove("noPointerEvents");
            this.$.notificationPanelBackground.classList.remove("noPointerEvents");
        } else {
            // Hide busy indicator
            this.$.notificationPanelBackground.classList.remove("fadeIn80");
            this.$.spinnerPanel.classList.remove("fadeIn");
            this.$.spinnerPanel.classList.add("noPointerEvents");
            this.$.notificationPanelBackground.classList.add("noPointerEvents");
        }
    }

    _isSuccessChanged(newValue, oldValue) {
        this.isBusy = false;
        if (newValue) {
            // Show Success Toast
            this.$.successPanel.classList.add("fadeIn");
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.timer = null;
                this.isSuccess = false;
            }, 2000);
        } else {
            // Hide Success Toast
            this.$.successPanel.classList.remove("fadeIn");
        }
    }

    _isExceptionChanged(newValue, oldValue) {
        this.isBusy = false;
        if (newValue) {
            // Show Error Toast
            this.$.errorPanel.classList.add("fadeIn");
            this.$.errorPanel.classList.remove("noPointerEvents");
        } else {
            // Hide Error Toast
            this.$.errorPanel.classList.remove("fadeIn");
            this.$.errorPanel.classList.add("noPointerEvents");
        }
    }

    _isErrorDetailVisibleChanged(newValue, oldValue) {
        if (!newValue) {
            // Hide Error Details Dialog
            this.$.errorDetailDialog.classList.remove("fadeIn");
            this.$.notificationPanelBackground.classList.remove("fadeIn80");
            this.$.errorDetailDialog.classList.add("noPointerEvents");
        }
    }

    _ShowErrorDetail(e) {
        this.isErrorDetailVisible = true;
        this.isException = false;
    }

    _CloseErrorDetail(e) {
        this.isErrorDetailVisible = false;
    }

    _CloseErrorToast(e) {
        this.isException = false;
    }

    _errorPanelTransitionend(e) {
        if (this.isErrorDetailVisible) {
            // Show Error Details Dialog
            this.$.notificationPanelBackground.classList.add("fadeIn80");
            this.$.errorDetailDialog.classList.add("fadeIn");
            this.$.notificationPanelBackground.classList.remove("noPointerEvents");
            this.$.errorDetailDialog.classList.remove("noPointerEvents");
        }
    }    
}
customElements.define('cs-notification-panel', CsNotificationPanel);