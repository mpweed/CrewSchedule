import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsFilterCrewChiefsRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                paper-checkbox.styled {
                    --paper-checkbox-checked-color: var(--paper-orange-300);
                    --paper-checkbox-label-color: var(--paper-grey-500);
                    --paper-checkbox-unchecked-color: var(--paper-grey-800);
                    margin-bottom: 20px;
                }

                .dialogBodyTopPadded {
                    padding-top: 20px;
                }
            </style>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">Filter Crew Chiefs</span>
                </div>                
                <div class="dialogBody dialogBodyTopPadded">
                    <template is="dom-repeat" items="[[crewChiefFilter]]" as="crewChief">
                        <div class="horizontal layout">
                            <paper-checkbox checked="{{crewChief.checked}}" class="styled">[[crewChief.name]]</paper-checkbox>
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
            crewChiefFilter: {
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
        let newCrewChiefFilter = JSON.parse(JSON.stringify(this.crewChiefFilter));
        this.crewChiefFilter = newCrewChiefFilter;
        this._closeDialog(null);
    }

    _closeDialog(e) {
        this.dispatchEvent(new CustomEvent("close"));
    }
}
customElements.define('cs-filter-crew-chiefs-region', CsFilterCrewChiefsRegion);