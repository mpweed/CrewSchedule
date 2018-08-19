import { PolymerElement, html } from '../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../shared/cs-shared-styles.js';
class CsDesktopShell extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .content {                
                    height: calc(100vh - 48px);
                }                

                .appPanel {
                    opacity: 0;
                    -webkit-transition: opacity 1s ease-in-out;
                    -moz-transition: opacity 1s ease-in-out;
                    -o-transition: opacity 1s ease-in-out;
                    transition: opacity 1s ease-in-out;
                }

                .appPanelShown {
                    opacity: 1;
                }
            </style>
            <div id="loginPanel"> <!-- Remove class list for production --><!-- Add class="removed" to bypass login for development -->
                <cs-login on-busy="_handleBusy"
                          on-loginsuccess="_hideLoginPanel">
                </cs-login>
            </div>
            <div id="appPanel" class="appPanel hidden"> <!-- Replace "appPanelShown" class with "hidden" class for production --><!-- Add "appPanelShown" to class list to bypass login for development -->
                <cs-title-bar on-busy="_handleBusy"
                              on-success="_handleSuccess"
                              on-exception="_handleException"
                              on-dialogshown="_handleDialogShown"
                              on-dialoghidden="_handleDialogHidden"
                              on-refresh="_handleRefresh"
                              is-dialog-shown="{{isDialogShown}}"                            
                              reference-data="{{referenceData}}">
                </cs-title-bar>
                <div class="horizontal layout content flex">
                    <cs-nav-bar page="{{page}}"
                                reference-data="{{referenceData}}">
                    </cs-nav-bar>
                    <cs-content-switcher id="contentSwitcher"
                                         on-busy="_handleBusy"
                                         on-success="_handleSuccess"
                                         on-exception="_handleException"
                                         on-dialogshown="_handleDialogShown"
                                         on-dialoghidden="_handleDialogHidden"
                                         is-dialog-shown="{{isDialogShown}}"
                                         reference-data="{{referenceData}}"
                                         page="{{page}}">
                    </cs-content-switcher>
                </div>
            </div>
            <cs-notification-panel is-busy="[[isBusy]]" 
                                   is-success="{{isSuccess}}" 
                                   is-exception="{{isException}}" 
                                   error-message="[[errorMessage]]">
            </cs-notification-panel>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isBusy: {
                type: Boolean,
                notify: true
            },
            isSuccess: {
                type: Boolean,
                notify: true
            },
            isException: {
                type: Boolean,
                notify: true
            },
            isDialogShown: {
                type: Boolean,
                notify: true
            },
            errorMessage: {
                type: String,
                notify: true
            },
            referenceData: {
                type: Object,
                notify: true
            }
        };
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }
   
    // Event Handlers
    _handleBusy(e) {
        this.isBusy = e.detail.status;
    }

    _handleSuccess(e) {
        this.isSuccess = true;
    }

    _handleException(e) {
        this.isException = true;
        this.errorMessage = e.detail;
    }

    _handleDialogShown(e) {
        this.isDialogShown = true;
    }

    _handleDialogHidden(e) {
        this.isDialogShown = false;
    }

    _handleRefresh(e) {
        this.$.contentSwitcher.refresh();
    }

    _hideLoginPanel(e) {
        this.referenceData = e.detail.referenceData;
        this.$.loginPanel.classList.add("removed");
        this.$.appPanel.classList.remove("hidden");
        this.$.appPanel.classList.add("appPanelShown");
    }
}
customElements.define('cs-desktop-shell', CsDesktopShell);