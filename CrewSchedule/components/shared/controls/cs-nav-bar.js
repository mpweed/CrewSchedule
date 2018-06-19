import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsNavBar extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .appNav {
                    width: 48px;
                    height: 100%;
                    background-color: var(--paper-grey-800);
                    position: relative;
                }
            
                .appNavButton {
                    margin-left: 4px;
                    color: var(--paper-grey-900);               
                }

                .appNavButton:hover {
                    color: #ffffff;
                }

                .appNavSelected {
                    color: #ffffff;
                }

                .notifcationBadge {
                    width: 40px;
                    height: 40px;
                    top: 113px;
                    left: 4px;
                    font-size: .75em;
                    font-weight: 400;
                    text-align: center;
                    margin-top: -64px;                    
                    position: absolute;     
                    pointer-events: none;
                }
            </style>
            <div class="appNav">                
                <paper-icon-button id="scheduleView" icon="list" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                <paper-icon-button id="notificationView" icon="communication:chat-bubble" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                <paper-icon-button id="adminView" icon="settings" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                <div id="notifcationBadge" class="notifcationBadge" style$="color:[[badgeColor]]">[[notifcationCount]]</div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            referenceData: {
                type: Object,
                observer: "_referenceDataChanged"
            },
            page: {
                type: String,
                value: "scheduleView",
                notify: true
            },            
            notifcationCount: {
                type: String
            },
            /** Private **/
            selectedNavButton: {
                type: Object
            },
            badgeColor: {
                type: String
            },
            isAdministrator: {
                type: Boolean,
                notify: true
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.selectedNavButton = this.$.scheduleView;
        this.$.scheduleView.classList.add("appNavSelected");
        this.page = "scheduleView";
        this.badgeColor = "#ffb74d";

        //***** TEMPORARY FOR LAYOUT PURPOSES *****
        this.notifcationCount = "25";
    }

    // Event Handlers
    _referenceDataChanged(newValue, oldValue) {
        if (this.referenceData.applicationUser && (this.referenceData.applicationUser.role == "System Administrator" || this.referenceData.applicationUser.role == "Company Administrator")) {
            this.isAdministrator = true;
        } else {
            this.isAdministrator = false;
        }
    }

    _NavButtonClick(e) {
        var btn = e.target;
        if (!this.selectedNavButton) {
            btn.classList.add("appNavSelected");
            this.selectedNavButton = btn;
            this.page = btn.id;
            if (btn.id == "notificationView") {
                this.badgeColor = "#212121";
            } else {
                this.badgeColor = "#ffb74d";
            }
        } else {
            if (this.selectedNavButton != btn) {
                this.selectedNavButton.classList.remove("appNavSelected");
                btn.classList.add("appNavSelected");
                this.selectedNavButton = btn;
                this.page = btn.id;
                if (btn.id == "notificationView") {
                    this.badgeColor = "#212121";
                } else {
                    this.badgeColor = "#ffb74d";
                }
            }
        }
    }    
}
customElements.define('cs-nav-bar', CsNavBar);