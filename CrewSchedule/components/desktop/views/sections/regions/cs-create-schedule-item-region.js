import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsCreateScheduleItemRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .dateField {
                    width: 164px;
                }

                .dateField-w-margin {
                    margin-left: 20px;
                }

                .jobField {
                    overflow: visible;
                }

                .jobFieldContainer {
                    overflow: visible:
                }

                .jobFieldButton {
                    margin-top: 28px;
                }

                .jobItemHeader {
                    margin-top: 10px;
                    color: var(--paper-lime-300);
                    border-bottom: 1px solid var(--paper-orange-300);
                }

                .jobItem {
                    margin-top: 10px;
                    color: var(--paper-grey-600);
                }

                .secondaryField {
                    margin-left: 20px;
                }

                .taskPanel {
                    min-height: 165px;
                }

                .equipmentPanel {
                    min-height: 235px;
                }

                .operatorPanel {
                    min-height: 235px;
                }
            </style>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">Create Schedule Item</span>
                </div>                
                <div class="dialogBody">                   
                    <div class="dataLabel">Type</div>
                    <cs-dropdown light label-field="name" items=[[types]] selected="{{selectedType}}"></cs-dropdown>
                    <div class="horizontal layout">
                        <div class="dateField">
                            <div class="dataLabel">Start Date</div>
                            <vaadin-date-picker width="164px" value="{{startDate}}"></vaadin-date-picker>
                        </div>
                        <div class="dateField dateField-w-margin">
                            <div class="dataLabel">End Date</div>
                            <vaadin-date-picker width="164px" value="{{endDate}}"></vaadin-date-picker>
                        </div>
                    </div>                    
                    <div class="dataLabel">Project Manager</div>
                    <cs-dropdown id="projectManagersDD" light label-field="name" items=[[referenceData.projectManagers]] selected="{{selectedProjectManager}}"></cs-dropdown>                    
                    <div class="dataLabel">Crew Chief</div>                    
                    <cs-dropdown class="flex" light label-field="name" items=[[referenceData.crewChiefs]] selected="{{selectedCrewChief}}"></cs-dropdown>
                    <div class="dataLabel">Crew Chief Allocation (Hrs/Day)</div>
                    <cs-dropdown light items=[[allocationHours]] selected="{{crewChiefSelectedAllocationHours}}"></cs-dropdown>                    

                    <div id="jobFieldPanel" class="removed">
                        <div class="dataLabel">Project Number</div>
                        <cs-input id="projectNumber" required max-length="50" light value="{{projectNumber}}"></cs-input>
                        <div class="dataLabel">Project Name</div>
                        <cs-input id="projectName" required max-length="60" light value="{{projectName}}"></cs-input>
                        <div class="dataLabel">Address Line 1</div>
                        <cs-input id="addressLine1" required max-length="60" light value="{{addressLine1}}"></cs-input>
                        <div class="dataLabel">Address Line 2</div>
                        <cs-input max-length="60" light value="{{addressLine2}}"></cs-input>
                        <div class="dataLabel">City</div>
                        <cs-input id="city" required max-length="60" light value="{{city}}"></cs-input>
                        <div class="horizontal layout">
                            <div class="flex">
                                <div class="dataLabel">State</div>
                                <cs-dropdown light items=[[states]] selected="{{state}}"></cs-dropdown>
                            </div>
                            <div class="secondaryField flex">
                                <div class="dataLabel">Zip</div>
                                <cs-input id="zip" required max-length="10" light value="{{zip}}"></cs-input>
                            </div>
                        </div>
                        <cs-accordion caption="Tasks ([[jobTasks.length]])">
                            <div class="taskPanel">
                                <div class="horizontal layout jobFieldContainer">
                                    <div class="jobField flex">
                                        <div class="dataLabel">Task</div>                            
                                        <cs-dropdown light label-field="name" items=[[referenceData.tasks]] selected="{{selectedTask}}"></cs-dropdown>
                                    </div>                            
                                    <paper-icon-button id="addTask" icon="add" class="jobFieldButton" on-tap="_addTask"></paper-icon-button>
                                </div>
                                <paper-tooltip for="addTask">Add Task</paper-tooltip>
                                <div class="jobItemHeader">Tasks for Job</div>
                                <template is="dom-repeat" items="[[jobTasks]]" as="jobTask">
                                    <div class="horizontal layout">
                                        <div class="jobItem flex">[[jobTask.name]]</div>
                                        <paper-icon-button id="removeTask" icon="remove-circle" on-tap="_removeTask"></paper-icon-button>
                                    </div>
                                </template>
                            </div>
                        </cs-accordion>
                        <cs-accordion caption="Equipment ([[jobEquipment.length]])">
                            <div class="equipmentPanel">
                                <div class="jobField flex">
                                    <div class="dataLabel">Equipment</div>
                                    <cs-dropdown light label-field="name" items=[[referenceData.equipment]] selected="{{selectedEquipment}}"></cs-dropdown>
                                </div>
                                <div class="horizontal layout jobFieldContainer">                                
                                    <div class="jobField flex">
                                        <div class="dataLabel">Allocation (Hrs/Day)</div>
                                        <cs-dropdown light items=[[allocationHours]] selected="{{equipmentSelectedAllocationHours}}"></cs-dropdown> 
                                    </div>
                                    <paper-icon-button id="addEquipment" icon="add" class="jobFieldButton" on-tap="_addEquipment"></paper-icon-button>
                                </div>
                                <paper-tooltip for="addEquipment">Add Equipment</paper-tooltip>
                                <div class="jobItemHeader">Equipment for Job</div>
                                <template is="dom-repeat" items="[[jobEquipment]]" as="equipment">
                                    <div class="horizontal layout">
                                        <div class="jobItem flex">[[equipment.name]] ([[equipment.allocation]] h/d)</div>
                                        <paper-icon-button id="removeEquipment" icon="remove-circle" on-tap="_removeEquipment"></paper-icon-button>
                                    </div>
                                </template>
                            </div>
                        </cs-accordion>
                        <cs-accordion caption="Instrument Operators ([[jobOperators.length]])">
                            <div class="operatorPanel">
                                <div class="jobField flex">
                                    <div class="dataLabel">Instrument Operator</div>
                                    <cs-dropdown light label-field="name" items=[[referenceData.instrumentOperators]] selected="{{selectedInstrumentOperator}}"></cs-dropdown>
                                </div>
                                <div class="horizontal layout jobFieldContainer">                                
                                    <div class="jobField flex">
                                        <div class="dataLabel">Allocation (Hrs/Day)</div>
                                        <cs-dropdown light items=[[allocationHours]] selected="{{operatorSelectedAllocationHours}}"></cs-dropdown> 
                                    </div>
                                    <paper-icon-button id="addOperator" icon="add" class="jobFieldButton" on-tap="_addOperator"></paper-icon-button>
                                </div>
                                <paper-tooltip for="addOperator">Add Operator</paper-tooltip>
                                <div class="jobItemHeader">Operators for Job</div>
                                <template is="dom-repeat" items="[[jobOperators]]" as="operator">
                                    <div class="horizontal layout">
                                        <div class="jobItem flex">[[operator.name]] ([[operator.allocation]] h/d)</div>
                                        <paper-icon-button id="removeOperator" icon="remove-circle" on-tap="_removeOperator"></paper-icon-button>
                                    </div>
                                </template>
                            </div>
                        </cs-accordion>
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
            allocationHours: {
                type: Array,
                value: [1,2,3,4,5,6,7,8,9,10,11,12]
            },
            crewChiefSelectedAllocationHours: {
                type: Number
            },
            equipmentSelectedAllocationHours: {
                type: Number
            },
            operatorSelectedAllocationHours: {
                type: Number
            },
            states: {
                type: Array,
                value: [
                    'AL',
                    'AK',
                    'AZ',
                    'AR',
                    'CA',
                    'CO',
                    'CT',
                    'DE',
                    'FL',
                    'GA',
                    'HI',
                    'ID',
                    'IL',
                    'IN',
                    'IA',
                    'KS',
                    'KY',
                    'LA',
                    'MD',
                    'MA',
                    'MI',
                    'MN',
                    'MS',
                    'MO',
                    'MT',
                    'NE',
                    'NV',
                    'NH',
                    'NJ',
                    'NM',
                    'NY',
                    'NC',
                    'ND',
                    'OH',
                    'OK',
                    'OR',
                    'PA',
                    'RI',
                    'SC',
                    'SD',
                    'TN',
                    'TX',
                    'UT',
                    'VT',
                    'VA',
                    'WA',
                    'WV',
                    'WI',
                    'WY'
                ]
            },
            projectNumber: {
                type: String,
                observer: "_validateInput"
            },
            projectName: {
                type: String,
                observer: "_validateInput"
            },
            addressLine1: {
                type: String,
                observer: "_validateInput"
            },
            addressLine2: {
                type: String
            },
            city: {
                type: String,
                observer: "_validateInput"
            },
            state: {
                type: String
            },
            zip: {
                type: String,
                observer: "_validateInput"
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
            jobTasks: {
                type: Array
            },
            jobEquipment: {
                type: Array
            },
            jobOperators: {
                type: Array
            }
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
                    this.crewChiefSelectedAllocationHours = this.allocationHours[11];
                    this.$.jobFieldPanel.classList.remove("removed");
                    break;
                case "PTO":
                case "Leave":
                    this.crewChiefSelectedAllocationHours = this.allocationHours[7];
                    this.$.jobFieldPanel.classList.add("removed");
                    break;
            }
            this._validateInput();
        }        
    }

    foundInArrayById(searchItem, arrayToSearch) {
        let retval = false;
        for (var item of arrayToSearch) {
            if (item.id == searchItem.id) {
                retval = true;
                break;
            }
        }
        return retval;
    }

    _addTask(e) {
        if (this.selectedTask && !this.foundInArrayById(this.selectedTask, this.jobTasks)) {
            this.push("jobTasks", this.selectedTask);
        }
    }

    _removeTask(e) {
        let removeItemIndex = this.jobTasks.indexOf(e.model.jobTask);
        this.splice("jobTasks", removeItemIndex, 1);
        this._validateInput();
    }

    _addEquipment(e) {
        if (this.selectedEquipment && !this.foundInArrayById(this.selectedEquipment, this.jobEquipment) && this.equipmentSelectedAllocationHours) {
            let equipmentToAdd = this.selectedEquipment;
            equipmentToAdd.allocation = this.equipmentSelectedAllocationHours;
            this.push("jobEquipment", equipmentToAdd);
        }
    }

    _removeEquipment(e) {
        let removeItemIndex = this.jobEquipment.indexOf(e.model.equipment);
        this.splice("jobEquipment", removeItemIndex, 1);
        this._validateInput();
    }

    _addOperator(e) {
        if (this.selectedInstrumentOperator && !this.foundInArrayById(this.selectedInstrumentOperator, this.jobOperators) && this.operatorSelectedAllocationHours) {
            let operatorToAdd = this.selectedInstrumentOperator;
            operatorToAdd.allocation = this.operatorSelectedAllocationHours;
            this.push("jobOperators", operatorToAdd);
        }
    }

    _removeOperator(e) {
        let removeItemIndex = this.jobEquipment.indexOf(e.model.operator);
        this.splice("jobOperators", removeItemIndex, 1);
    }

    _validateInput(newValue, oldValue) {
        this.$.saveButton.disabled = true;
        switch (this.selectedType.name) {
            case "Job":
                if (this.$.projectNumber.isValid &&
                    this.$.projectName.isValid &&
                    this.$.addressLine1.isValid &&
                    this.$.city.isValid &&
                    this.$.zip.isValid &&
                    this.jobTasks && this.jobTasks.length > 0 &&
                    this.jobEquipment && this.jobEquipment.length > 0)
                    this.$.saveButton.disabled = false;
                break;
            case "PTO":
                this.$.saveButton.disabled = false;
                break;
            case "Leave":
                this.$.saveButton.disabled = false;
                break;
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
        this.$.projectManagersDD.disabled = true;
        if (this.referenceData && this.referenceData.applicationUser) {
            let typeArray = new Array();
            if (this.referenceData.applicationUser.roleId < 4) {
                typeArray.push({ "id": 1, "name": "Job" });
                typeArray.push({ "id": 2, "name": "PTO" });
                typeArray.push({ "id": 3, "name": "Leave" });

                if (this.referenceData.projectManagers) {
                    for (var pm of this.referenceData.projectManagers) {
                        if (pm.branchId == this.referenceData.applicationUser.branchId && pm.roleId == 3) {
                            this.selectedProjectManager = pm;
                            this.$.projectManagersDD.disabled = false;
                            break;
                        }
                    }
                }
            } else {
                if (this.referenceData.projectManagers) {
                    for (var pm of this.referenceData.projectManagers) {
                        if (pm.id == this.referenceData.applicationUser.id) {
                            this.selectedProjectManager = pm;
                            break;
                        }
                    }
                }
                typeArray.push({ "id": 1, "name": "Job" });
            }            
            this.types = typeArray;
            this.selectedType = this.types[0];
            let defaultStartDate = new Date(Date.now());
            let defaultEndDate = new Date(Date.now());
            this.startDate = (defaultStartDate.getFullYear() + '-' + (defaultStartDate.getMonth() + 1) + '-' + defaultStartDate.getDate()).toString();
            this.endDate = (defaultEndDate.getFullYear() + '-' + (defaultEndDate.getMonth() + 1) + '-' + defaultEndDate.getDate()).toString();
            this.jobTasks = new Array();
            this.jobEquipment = new Array();
            this.jobOperators = new Array();
        }        
    }
}
customElements.define('cs-create-schedule-item-region', CsCreateScheduleItemRegion);