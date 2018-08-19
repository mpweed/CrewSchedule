import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsEditPreferencesRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                
            </style>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">User Preferences</span>
                </div>                
                <div class="dialogBody">
                    <!-- PLACE MAIN CONTENT HERE -->
                </div>
                <div class="horizontal layout end-justified dialogButtons">
                    <cs-button id="saveButton" class="saveButton" on-tap="_save">Save</cs-button>
                    <cs-button class="cancelButton" on-tap="_closeDialog">Cancel</cs-button>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            referenceData: {
                type: Object
            }
        };
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
customElements.define('cs-edit-preferences-region', CsEditPreferencesRegion);