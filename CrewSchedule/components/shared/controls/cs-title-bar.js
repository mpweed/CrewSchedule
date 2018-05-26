import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
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
                    width: 165px;
                    height: 36px;
                }

                .personIcon {
                    border: 2px solid #DCE775;
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
                    color: #FFB74D;
                }

                .userName {
                    margin-top: 16px;
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: 300;
                    color: #FFB74D;
                }

                .userButton {
                    position: relative;
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
                    color: #DCE775;
                }

                .primaryColor {
                    color: #FFB74D;
                }

                .secondaryColor {
                    color: #DCE775;
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
                
                <div id="userButton" class="horizontal layout userButton" on-click="_showUserInfoPanel">
                    <div class="userName">[[applicationUser.name]]</div>
                    <div class="personIcon">
                        <iron-icon icon="social:person"></icon>
                    </div>                    
                    <div id="userInfoPanel" class="userInfoPanel">
                        <div class="userInformationDialogJobTitle">[[applicationUser.jobTitle]]</div>
                        <div class="horizontal layout flex">
                            <div class="flex">
                                <div class="dataLabelSmall primaryColor">Environment</div>
                                <div class="dataSmall secondaryColor">[[environment]]</div>
                            </div>
                            <div class="flex">
                                <div class="dataLabelSmall primaryColor">Role</div>
                                <div class="dataSmall secondaryColor">[[applicationUser.role]]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    constructor() {
        super();
        this._boundListener = this._hideUserInfoPanel.bind(this);
    }

    // Public Properties
    static get properties() {
        return {
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
            },
            bootstrapDataResponse: {
                type: Object,
                notify: true
            },
            isAdministrator: {
                type: Boolean,
                notify: true
            },
            applicationUser: {
                type: Object,
                notify: true
            },
            companies: {
                type: Array,
                notify: true
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
        this.isAdministrator = false;
        //this.dispatchEvent(new CustomEvent('busy', { detail: { status: true } }));
        //this.getBootstrapData();
    }

    disconnectedCallback() {
        document.removeEventListener("click", this._boundListener);
    }

    // Event Handlers
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
        this.$.userInfoPanel.classList.add("panelShown");
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