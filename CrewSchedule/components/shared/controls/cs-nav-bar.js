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
            </style>
            <div class="appNav">
                <paper-icon-button id="createJob" icon="add" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                <template is="dom-if" if="[[isAdministrator]]">
                    <paper-icon-button id="maintainUsers" icon="social:person" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                    <paper-icon-button id="externalSystems" icon="settings" class="appNavButton" on-tap="_NavButtonClick"></paper-icon-button>
                </template>
            </div>
            `;
    }

    // Public Properties
    static get properties() {
        return {
            isAdministrator: {
                type: Boolean
            },
            page: {
                type: String,
                value: "search",
                notify: true,
                observer: "_pageChanged"
            },
            selectedNavButton: {
                type: Object
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.selectedNavButton = this.$.search;
    }

    // Event Handlers
    _pageChanged(newValue, oldValue) {
        if (newValue == "search" && this.selectedNavButton) {
            this.selectedNavButton.classList.remove("appNavSelected");
            this.selectedNavButton = null;
        }
    }

    _NavButtonClick(e) {
        var btn = e.target;
        if (!this.selectedNavButton) {
            btn.classList.add("appNavSelected");
            this.selectedNavButton = btn;
            this.page = btn.id;
        } else {
            if (this.selectedNavButton != btn) {
                this.selectedNavButton.classList.remove("appNavSelected");
                btn.classList.add("appNavSelected");
                this.selectedNavButton = btn;
                this.page = btn.id;
            }
        }
    }    
}
customElements.define('cs-nav-bar, CsNavBar);