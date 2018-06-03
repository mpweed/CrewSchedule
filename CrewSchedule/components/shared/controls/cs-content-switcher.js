﻿import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
import '../../desktop/views/cs-schedule-view.js';
import '../../desktop/views/cs-notification-view.js';
import '../../desktop/views/cs-admin-view.js';
class CsContentSwitcher extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                :host {
                    width: 100%;
                    height: 100%;
                }

                iron-pages {
                    height: calc(100vh - 68px);
                    overflow: auto;
                }
            </style>
            <iron-pages id="ironPages" selected="[[page]]" attr-for-selected="name" fallback-selection="view404" class="scroll">            
                <cs-schedule-view id="scheduleView" name="scheduleView" bootstrap-data="{{bootstrapData}}">
                </cs-schedule-view>
                <cs-notification-view id="notificationView" name="notificationView" bootstrap-data="{{bootstrapData}}">
                </cs-notification-view>
                <cs-admin-view id="adminView" name="adminView" bootstrap-data="{{bootstrapData}}">
                </cs-admin-view>
            </iron-pages>`;
    }

    // Public Properties
    static get properties() {
        return {
            bootstrapData: {
                type: Object,
                notify: true
            },
            page: {
                type: String,
                notify: true,
                observer: "_pageChanged"
            }            
        }
    }

    // Event Handlers
    _pageChanged(newValue, oldValue) {
        if (newValue) {
            switch (newValue) {
                case "scheduleView":
                    //this.$.scheduleView.refreshView();
                    break;
                case "notificationView":
                    break;
                case "adminView":
                    //this.$.adminView.refreshView();
                    break;
            }
        }
    }    
}
customElements.define('cs-content-switcher', CsContentSwitcher);