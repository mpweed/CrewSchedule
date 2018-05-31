import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsEditJobRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                
            </style>
            <div>
                Edit Job Region Placeholder
                <div class="horizontal layout end-justified dialogButtons">
                    <cs-button id="saveButton" disabled class="saveButton" on-tap="_save">Save</cs-button>
                    <cs-button class="cancelButton" on-tap="_closeDialog">Cancel</cs-button>
                </div>
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
            }
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
    _save(e) {

    }

    _closeDialog(e) {
        this.dispatchEvent(new CustomEvent("close"));
    }
}
customElements.define('cs-edit-job-region', CsEditJobRegion);