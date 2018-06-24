import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsCreateScheduleItemRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .dateField {
                    width: 168px;
                }

                .dateField-w-margin {
                    margin-left: 20px;
                }
            </style>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">Create Schedule Item</span>
                </div>                
                <div class="dialogBody">

                    <!-- PLACE MAIN CONTENT HERE -->
                    <div class="dataLabel">Type</div>
                    <cs-dropdown light label-field="name" items=[[types]] selected="{{selectedType}}"></cs-dropdown>
                    <div class="horizontal layout">
                        <div class="dateField">
                            <div class="dataLabel">Start Date</div>
                            <vaadin-date-picker width="168px" value="{{startDate}}"></vaadin-date-picker>
                        </div>
                        <div class="dateField dateField-w-margin">
                            <div class="dataLabel">End Date</div>
                            <vaadin-date-picker width="168px" value="{{endDate}}"></vaadin-date-picker>
                        </div>
                    </div>
                    
                    <div class="dataLabel">Project Manager</div>
                    <cs-dropdown light label-field="name" items=[[referenceData.projectManagers]] selected="{{selectedProjectManager}}"></cs-dropdown>
                    
                    <div class="dataLabel">Crew Chief</div>                    
                    <cs-dropdown class="flex" light label-field="name" items=[[referenceData.crewChiefs]] selected="{{selectedCrewChief}}"></cs-dropdown>
                    <div class="dataLabel">Crew Chief Allocation (Hrs/Day)</div>
                    <cs-dropdown light items=[[crewChiefAllocationHours]] selected="{{crewChiefSelectedAllocationHours}}"></cs-dropdown>
                    


                    <div id="jobFieldPanel" class="removed">
                        <div class="dataLabel">Task</div>
                        <cs-dropdown light label-field="name" items=[[referenceData.tasks]] selected="{{selectedTask}}"></cs-dropdown>

                        <div class="dataLabel">Equipment</div>
                        <cs-dropdown light label-field="name" items=[[referenceData.equipment]] selected="{{selectedEquipment}}"></cs-dropdown>

                        <div class="dataLabel">Instrument Operator</div>
                        <cs-dropdown light label-field="name" items=[[referenceData.instrumentOperators]] selected="{{selectedInstrumentOperator}}"></cs-dropdown>
                    </div>

                </div>
                <div class="horizontal layout end-justified dialogButtons">
                    <cs-button id="saveButton" disabled class="saveButton" on-tap="_save">Save</cs-button>
                    <cs-button class="cancelButton" on-tap="_closeDialog">Cancel</cs-button>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            referenceData: {
                type: Object,
                notify: true,
                observer: "_referenceDataChanged"
            },
            /** Private **/
            types: {
                type: Array,
                notify: true
            },
            selectedType: {
                type: Object,
                notify: true,
                observer: "_selectedTypeChanged"
            },
            startDate: {
                type: Date,
                notify: true
            },
            endDate: {
                type: Date,
                notify: true
            },
            selectedProjectManager: {
                type: Object,
                notify: true
            },
            selectedCrewChief: {
                type: Object,
                notify: true
            },
            crewChiefAllocationHours: {
                type: Array,
                value: [1,2,3,4,5,6,7,8,9,10,11,12]
            },
            crewChiefSelectedAllocationHours: {
                type: Number
            },
            selectedTask: {
                type: Object,
                notify: true
            },
            selectedEquipment: {
                type: Object,
                notify: true
            },
            selectedInstrumentOperator: {
                type: Object,
                notify: true
            },
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
    _referenceDataChanged(newValue, oldValue) {
        this.reset();
    }

    _selectedTypeChanged(newValue, oldValue) {
        if (this.selectedType) {
            switch (this.selectedType.name) {
                case "Job":
                    this.crewChiefSelectedAllocationHours = this.crewChiefAllocationHours[11];
                    break;
                case "PTO":
                case "Leave":
                    this.crewChiefSelectedAllocationHours = this.crewChiefAllocationHours[7];
                    break;
            }
        }        
    }

    _save(e) {

    }

    _closeDialog(e) {
        this.dispatchEvent(new CustomEvent("close"));
        this.reset();
    }

    // Public Methods
    reset() {        
        if (this.referenceData && this.referenceData.applicationUser) {
            let typeArray = new Array();
            if (this.referenceData.applicationUser.roleId < 4) {
                typeArray.push({ "id": 1, "name": "Job" });
                typeArray.push({ "id": 2, "name": "PTO" });
                typeArray.push({ "id": 3, "name": "Leave" });
            } else {
                typeArray.push({ "id": 1, "name": "Job" });
            }
            this.types = typeArray;
            this.selectedType = this.types[0];
            let defaultStartDate = new Date(Date.now());
            let defaultEndDate = new Date(Date.now());
            this.startDate = (defaultStartDate.getFullYear() + '-' + (defaultStartDate.getMonth() + 1) + '-' + defaultStartDate.getDate()).toString();
            this.endDate = (defaultEndDate.getFullYear() + '-' + (defaultEndDate.getMonth() + 1) + '-' + defaultEndDate.getDate()).toString();            
        }        
    }
}
customElements.define('cs-create-schedule-item-region', CsCreateScheduleItemRegion);