import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsFilterCrewsRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                
            </style>
            <div>
                <div>
                    <template is="dom-repeat" items="[[crewFilter]]" as="crew">
                        <div class="horizontal layout">
                            <paper-checkbox checked="{{crew.checked}}"></paper-checkbox>
                            <div>[[crew.name]]</div>
                        </div>
                    </template>
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
            crewFilter: {
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
    _save(e) {
        let newCrewFilter = JSON.parse(JSON.stringify(this.crewFilter));
        this.crewFilter = newCrewFilter;
        this._closeDialog(null);
    }

    _closeDialog(e) {
        this.dispatchEvent(new CustomEvent("close"));
    }
}
customElements.define('cs-filter-crews-region', CsFilterCrewsRegion);