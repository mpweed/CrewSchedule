import { PolymerElement, html } from '../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../shared/cs-shared-styles.js';
class CsScheduleView extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style>
                :host {
                    position: absolute;
                    top: 49px;
                    left: 49px;
                    width: calc(100vw - 50px);
                    height: 100%;
                }
            </style>
            <div ="panelScrollable">
                <cs-timeline companies="[[companies]]"></cs-timeline>
            </div>`;
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
                type: Array,
                notify: true
            }
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
}
customElements.define('cs-schedule-view', CsScheduleView);