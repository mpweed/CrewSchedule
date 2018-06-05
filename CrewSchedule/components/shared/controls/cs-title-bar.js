import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
import '../../desktop/views/sections/regions/cs-edit-preferences-region.js';
class CsTitleBar extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .appTitleBar {
                    background-color: var(--paper-grey-800);
                }

                .cslogo {
                    margin-top: 6px;
                    margin-left: 6px;
                    margin-bottom: 6px;
                    width: 156px;
                    height: 36px;
                }

                .personIcon {
                    border: 2px solid var(--paper-lime-300);
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    margin-top: 6px;
                    margin-left: 6px;
                    margin-right: 10px;
                }

                iron-icon {
                    width: 30px;
                    height: 30px;
                    color: var(--paper-orange-300);
                }

                .userName {
                    margin-top: 16px;
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--paper-orange-300);
                }

                .userButton {
                    position: relative;
                    min-width: 140px;
                }

                .userButton:hover {
                    cursor: pointer;
                    background-color: var(--paper-grey-700);
                }

                .userButton:active {
                    background-color: var(--paper-grey-900);
                }

                .userInfoPanel {
                    position: absolute;
                    top: 100%;
                    right: 4px;
                    padding: 20px;
                    width: 290px;
                    border: 1px solid var(--paper-grey-600);
                    background-color: var(--paper-grey-900);
                    opacity: 0;
                    pointer-events: none;
                    z-index: 200;
                    -webkit-transition: opacity .3s ease-in-out;
                    -moz-transition: opacity .3s ease-in-out;
                    -o-transition: opacity .3s ease-in-out;
                    transition: opacity .3s ease-in-out;
                }

                .panelShown {
                    opacity: 1;
                    pointer-events: auto;
                }

                .userInformationDialogJobTitle {
                    min-width: 220px;
                    color: var(--paper-lime-300);
                }

                .primaryColor {
                    color: var(--paper-orange-300);
                }

                .secondaryColor {
                    color: var(--paper-lime-300);
                }

                .actionButton {
                    width: 36px;
                    height: 36px;
                    margin-top: -6px;
                    color: var(--paper-lime-300);
                    cursor: pointer;
                }

                .actionButton:hover {
                    color: #ffffff;
                }
            </style>
            <iron-ajax id="bootstrapDataXhr"
                   url="[[baseUrl]]"
                   method="GET"
                   handle-as="json"
                   on-response="_handleBootstrapDataResponse"
                   on-error="_handleXhrError">
            </iron-ajax>
            <div class="horizontal layout appTitleBar flex">
                <img class="cslogo" src="[[logoUrl]]" />                
                <div class="flex"></div>
                <div id="userButton" class="horizontal layout userButton" on-click="_showUserInfoPanel">
                    <div class="userName">[[bootstrapData.applicationUser.name]]</div>
                    <div class="personIcon">
                        <iron-icon icon="social:person"></icon>
                    </div>                    
                    <div id="userInfoPanel" class="userInfoPanel">
                        <div class="horizontal layout">
                            <div class="userInformationDialogJobTitle">[[bootstrapData.applicationUser.jobTitle]]</div>
                            <div class="horizontal layout flex end-justified">
                                <paper-icon-button id="editPreferences" icon="settings" class="actionButton" on-tap="_editPreferencesClick"></paper-icon-button>
                            </div>
                        </div>
                        <div class="horizontal layout flex">
                            <div class="flex">
                                <div class="dataLabelSmall primaryColor">Environment</div>
                                <div class="dataSmall secondaryColor">[[environment]]</div>
                            </div>
                            <div class="flex">
                                <div class="dataLabelSmall primaryColor">Role</div>
                                <div class="dataSmall secondaryColor">[[bootstrapData.applicationUser.role]]</div>
                            </div>
                        </div>
                    </div>
                </div>
                <cs-dialog id="userPreferencesDialog" on-dialogshown="_dialogShown">
                    <cs-edit-preferences-region on-close="_hideEditPreferencesDialog"></cs-edit-preferences-region>
                </cs-dialog>
            </div>`;
    }

    constructor() {
        super();
        this._boundListener = this._hideUserInfoPanel.bind(this);
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isDialogShown: {
                type: Boolean,
                notify: true
            },
            bootstrapData: {
                type: Object,
                notify: true
            },
            environment: {
                type: String,
                value: function () {
                    var href = window.location.href.toUpperCase();
                    if (href.search("CREWSEARCH") > -1) {
                        return "Production";
                    } else if (href.search("TEST") > -1) {
                        return "Test";
                    } else if (href.search("DEV") > -1) {
                        return "Development";
                    } else {
                        return "Construction"
                    }
                }
            },
            baseUrl: {
                type: String,
                notify: true
            },
            logoUrl: {
                type: String
            }           
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("click", this._boundListener);
        this.baseUrl = window.location.href;
        var trailingCharacter = this.baseUrl.slice(-1);
        if (trailingCharacter === "/") {            
            this.logoUrl = this.baseUrl + "images/CSNameLogo.png";
            this.baseUrl = this.baseUrl + "api/BootstrapData/";
        } else {            
            this.logoUrl = this.baseUrl + "/images/CSNameLogo.png";
            this.baseUrl = this.baseUrl + "/api/BootstrapData/";
        }
    }

    disconnectedCallback() {
        document.removeEventListener("click", this._boundListener);
    }

    // Event Handlers
    _dialogShown(e) {
        this._hideUserInfoPanel(null);
    }

    _editPreferencesClick(e) {
        if (!this.isDialogShown) {
            this.$.userPreferencesDialog.show();
        }        
    }

    _hideEditPreferencesDialog(e) {
        this.$.userPreferencesDialog.hide();
    }

    _handleBootstrapDataResponse(e, request) {
        this.dispatchEvent(new CustomEvent('busy', { detail: { status: false } }));
        this.bootstrapDataResponse = e.detail.response;
        if (this.bootstrapDataResponse.exception) {
            this.dispatchEvent(new CustomEvent('exception', { detail: this.bootstrapDataResponse.exception.Message }));
        } else {
            this.applicationUser = this.bootstrapDataResponse.applicationUser;
            if (this.applicationUser) {
                if (this.applicationUser.appInfo.role === 'ADMINISTRATOR') {
                    this.isAdministrator = true;
                }
            }
            this.jobs = this.bootstrapDataResponse.jobs;
        }
    }

    _handleXhrError(e, request) {
        this.dispatchEvent(new CustomEvent('busy', { detail: { status: false } }));
        this.dispatchEvent(new CustomEvent('exception', { detail: e.detail.error.message }));
    }

    _showUserInfoPanel(event) {
        // Don't propogate the event to the document
        if (event.stopPropagation) {
            event.stopPropagation();   // W3C model
        } else {
            event.cancelBubble = true; // IE model
        }
        if (!this.$.userPreferencesDialog.isShown) {
            this.$.userInfoPanel.classList.add("panelShown");
        } else {
            this.$.userInfoPanel.classList.remove("panelShown");
        }
    }

    _hideUserInfoPanel(e) {
        this.$.userInfoPanel.classList.remove("panelShown");
    }

    // Private Methods
    getBootstrapData() {
        this.$.bootstrapDataXhr.generateRequest();
    }    
}
customElements.define('cs-title-bar', CsTitleBar);