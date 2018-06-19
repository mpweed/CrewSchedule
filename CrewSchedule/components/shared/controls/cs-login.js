import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
import { StaticData } from '../cs-static-data.js';
class CsLogin extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .loginPanel {
                    width: 433px;
                    height: 300px;
                    margin: 60px auto;
                }

                .loginLogo {
                    width: 433px;
                    height: 100px;
                }

                .loginField {
                    margin-top: 20px;
                    margin-left: 75px;
                    margin-right: 75px;
                }

                .passwordField {
                    margin-top: 20px;
                    margin-left: 75px;
                    margin-right: 75px;
                    margin-bottom: 20px;
                }

                .loginButton {
                    --cs-button-color: var(--paper-lime-300);
                    --cs-button-focus-color: var(--paper-orange-300);
                    --cs-button-hover-color: var(--paper-orange-300);
                    --cs-button-active-color: var(--paper-lime-600);
                }              
            </style>
            <iron-ajax id="referenceDataXhr"
                   url="[[baseUrl]]"
                   method="POST"
                   content-type="application/json"
                   handle-as="json"
                   on-response="_handleReferenceDataResponse"
                   on-error="_handleXhrError">
            </iron-ajax>
            <div id="loginPanel" class="loginPanel">
                <img class="loginLogo" src="../images/CSNameLogo.png" />
                <div class="loginField">
                    <cs-input light center-text required placeholder="User" id="loginId" value="{{login}}"></cs-input>
                </div>
                <div class="passwordField">
                    <cs-password-input light center-text required placeholder="Password" id="password" value="{{password}}" on-enterkeypressed="_login"></cs-input>
                </div>
                <div class="horizontal layout center-justified">
                    <cs-button id="loginButton" disabled class="loginButton" on-tap="_login">Login</cs-button>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Private **/
            login: {
                type: String,
                observer: "_validateInput"
            },
            password: {
                type: String,
                observer: "_validateInput"
            },
            baseUrl: {
                type: String,
                notify: true
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.baseUrl = window.location.href;
        var trailingCharacter = this.baseUrl.slice(-1);
        if (trailingCharacter === "/") {
            this.baseUrl = this.baseUrl + "api/ReferenceData/";
        } else {
            this.baseUrl = this.baseUrl + "/api/ReferenceData/";
        }
    }

    ready() {
        super.ready();
        this.$.loginId.reset();
        this.$.password.reset();
        this.$.loginId.focus();
        let defaultStartDate = new Date(Date.now());
        let defaultEndDate = new Date(Date.now());
        defaultEndDate.setDate(defaultEndDate.getDate() + 31);
        this.startDate = (defaultStartDate.getFullYear() + '-' + (defaultStartDate.getMonth() + 1) + '-' + defaultStartDate.getDate()).toString();
        this.endDate = (defaultEndDate.getFullYear() + '-' + (defaultEndDate.getMonth() + 1) + '-' + defaultEndDate.getDate()).toString();
    }

    // Events
    _validateInput() {
        if (this.$.loginId.isValid && this.$.password.isValid) {
            this.$.loginButton.disabled = false;
        } else {
            this.$.loginButton.disabled = true;
        }
    } 

    _login(e) {        
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: true } }));
        this.$.referenceDataXhr.body = {
            "loginId": this.login,
            "password": this.password,
            "startDate": this.startDate,
            "endDate": this.endDate
        };
        this.$.referenceDataXhr.generateRequest();
    }

    _handleReferenceDataResponse(e, request) {
        this.dispatchEvent(new CustomEvent('busy', { detail: { status: false } }));
        if (e.detail.response.exception) {
            this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: false } }));
            // TODO: SHOW FAILURE MESSAGE HERE

        } else {
            e.detail.response.startDate = this.startDate;
            e.detail.response.endDate = this.endDate;
            this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: false } }));
            this.dispatchEvent(new CustomEvent('loginsuccess', { bubbles: true, composed: true, detail: { referenceData: e.detail.response } }));
        }
    }

    _handleXhrError(e, request) {
        this.dispatchEvent(new CustomEvent('busy', { detail: { status: false } }));
        this.dispatchEvent(new CustomEvent('exception', { detail: e.detail.error.message }));
    }
}
customElements.define('cs-login', CsLogin);