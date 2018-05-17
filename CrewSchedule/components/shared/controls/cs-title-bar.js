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

                .jiclogo {
                    margin-top: 6px;
                    margin-left: 6px;
                    margin-bottom: 6px;
                    width: 36px;
                    height: 36px;
                }

                .searchBox {
                    margin-left: 8px;
                    margin-right: 8px;
                }

                .searchField {
                    height: 26px;
                    padding-left: 20px;
                    padding-right: 46px;
                    margin-top: 10px;
                    border: none;
                    border-radius: 26px;
                    color: #ffffff;
                    background-color: var(--paper-grey-900);
                    outline: none;
                }

                #search {
                    min-width: 5px;
                    width: 5px;
                }

                .searchButton {
                    margin-top: 4px;
                    margin-left: -40px;
                    color: var(--paper-grey-800);
                }

                .searchButton:hover {
                    color: #ffffff;
                }

                .userName {
                    margin-top: 16px;
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--paper-grey-300);
                }

                .userPhoto {
                    margin-top: 6px;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    border: solid 2px var(--paper-blue-grey-300);
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
                    color: var(--paper-grey-400);
                }

                .userInformationDialogDepartment {
                    min-width: 220px;
                    color: var(--paper-grey-600);
                }
            </style>
            <iron-ajax id="bootstrapDataXhr"
                   url="[[baseUrl]]"
                   method="GET"
                   handle-as="json"
                   on-response="_handleBootstrapDataResponse"
                   on-error="_handleXhrError">
            </iron-ajax>        
            <datalist id="jobList">
                <template is="dom-repeat" items="[[jobs]]">
                    <option id="[[item.id]] "value="[[item.name]]"></option>
                </template>
            </datalist>
            <div class="horizontal layout appTitleBar flex">
                <img class="jiclogo" src="[[logoUrl]]" />
                <div class="horizontal layout searchBox flex">
                    <input id="search" type="text" placeholder="Job Name" class="searchField flex" list="jobList" on-keydown="_checkForEnter" />
                    <paper-icon-button id="searchButton" icon="search" class="searchButton" on-tap="_searchClick"></paper-icon-button>
                </div>
                <paper-tooltip for="search">Type the desired Job Name and press the "Enter" key on the keyboard to retrieve the job.</paper-tooltip>
                <div id="userButton" class="horizontal layout userButton" on-click="_showUserInfoPanel">
                    <div class="userName">[[applicationUser.appInfo.name]]</div>
                    <img class="userPhoto" src="[[applicationUser.appInfo.photoUrl]]" />
                    <div id="userInfoPanel" class="userInfoPanel">
                        <div class="userInformationDialogJobTitle">[[applicationUser.hrInfo.jobTitle]]</div>
                        <div class="userInformationDialogDepartment">[[applicationUser.hrInfo.departmentName]]</div>
                        <div class="horizontal layout flex">
                            <div class="flex">
                                <div class="dataLabelSmall">Environment</div>
                                <div class="dataSmall">[[environment]]</div>
                            </div>
                            <div class="flex">
                                <div class="dataLabelSmall">Role</div>
                                <div class="dataSmall">[[applicationUser.appInfo.role]]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
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
                    if (href.search("PROD") > -1) {
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
            searchJob: {
                type: Object,
                notify: true
            },
            job: {
                type: Object,
                notify: true
            },
            jobs: {
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
            var trailingPathSegment = this.baseUrl.slice(-4).toLowerCase();
            if (trailingPathSegment === "com/") {
                this.logoUrl = this.baseUrl + "jic/Images/JICLogo.png";
            } else {
                this.logoUrl = this.baseUrl + "Images/JICLogo.png";
            }
            this.baseUrl = this.baseUrl + "api/BootstrapData/";
        } else {
            var trailingPathSegment = this.baseUrl.slice(-3).toLowerCase();
            if (trailingPathSegment === "com") {
                this.logoUrl = this.baseUrl + "/jic/Images/JICLogo.png";
            } else {
                this.logoUrl = this.baseUrl + "/Images/JICLogo.png";
            }
            this.baseUrl = this.baseUrl + "/api/BootstrapData/";
        }
        this.isAdministrator = false;
        this.dispatchEvent(new CustomEvent('busy', { detail: { status: true } }));
        this.getBootstrapData();
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

    _checkForEnter(e) {
        if (e.keyCode === 13) {
            this._searchClick(e);
        }
    }

    _searchClick(e) {
        this.$.searchButton.focus();
        this.searchJob = null;
        if (this.$.search.value && this.jobs) {
            var jobName = this.$.search.value;
            for (var i = 0; i < this.jobs.length; i++) {
                if (this.jobs[i].name === jobName.toUpperCase()) {
                    this.searchJob = this.jobs[i];
                    break;
                }
            }
        }
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
customElements.define('cs-title-bar, CsTitleBar);