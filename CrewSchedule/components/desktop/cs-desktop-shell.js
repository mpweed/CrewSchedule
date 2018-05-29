import { PolymerElement, html } from '../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../shared/cs-shared-styles.js';
class CsDesktopShell extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style>
                .content {                
                    height: calc(100vh - 48px);
                }
            </style>
            <cs-title-bar on-busy="_handleBusy"
                          on-exception="_handleException"
                          is-administrator="{{isAdministrator}}"
                          application-user="{{applicationUser}}">
            </cs-title-bar>
            <div class="horizontal layout content flex">
                <cs-nav-bar page="{{page}}"
                            is-administrator="{{isAdministrator}}">
                </cs-nav-bar>
                <cs-content-switcher on-busy="_handleBusy"
                                     on-success="_handleSuccess"
                                     on-exception="_handleException"
                                     is-busy="isBusy"
                                     application-user="[[applicationUser]]"
                                     page="{{page}}"
                                     companies="[[companies]]">
                </cs-content-switcher>
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
            errorMessage: {
                type: String,
                notify: true
            },
            applicationUser: {
                type: Object
            },
            companies: {
               type: Array
            }
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();

        // ***TEMPORARY*** FOR LAYOUT DEVELOPMENT ONLY
        this.applicationUser = {
            "name": "Michael Weed",
            "jobTitle": "System Administrator",
            "role": "System Administrator"
        };

        this.companies = [
            {
                "id": "1",
                "name": "Control Point",
                "offices": [
                    {
                        "id": "1",
                        "name": "Warren, NJ"
                    }
                ]
            }
        ];
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
}
customElements.define('cs-desktop-shell', CsDesktopShell);