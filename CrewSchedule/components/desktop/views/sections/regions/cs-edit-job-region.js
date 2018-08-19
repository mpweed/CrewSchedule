import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsEditJobRegion extends GestureEventListeners(PolymerElement) {    
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

                .conflictIndicator {
                    color: var(--paper-red-700);
                }
            </style>
            <iron-ajax id="jobUpdateXhr"
                   url="[[jobUpdateUrl]]"
                   method="PUT"
                   content-type="application/json"
                   handle-as="json"
                   on-response="_handleUpdateJobResponse"
                   on-error="_handleXhrError">
            </iron-ajax>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">[[dialogCaption]]</span>
                </div>                
                <div class="dialogBody">
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
                    <div id="affectedProjectManagerSection" class="removed">
                        <div class="dataLabel">Affected Project Manager</div>
                        <cs-dropdown id="affectedProjectManagersDD" disabled light label-field="name" items=[[referenceData.projectManagers]] selected="{{selectedAffectedProjectManager}}"></cs-dropdown>
                    </div>
                    <div id="crewChiefCaption" class="dataLabel">Crew Chief</div>                    
                    <cs-dropdown id="crewChiefsDD" class="flex" light label-field="name" items=[[referenceData.crewChiefs]] selected="{{selectedCrewChief}}"></cs-dropdown>
                    <div class="dataLabel">Crew Chief Allocation (Hrs/Day)</div>
                    <cs-dropdown light items=[[allocationHours]] selected="{{crewChiefSelectedAllocationHours}}"></cs-dropdown>
                    <div id="jobFieldPanel">
                        <div class="dataLabel">Project Number</div>
                        <cs-input id="projectNumber" required max-length="50" light value="{{projectNumber}}"></cs-input>
                        <div class="dataLabel">Project Name</div>
                        <cs-input id="projectName" required max-length="60" light value="{{projectName}}"></cs-input>
                        <div class="dataLabel">Address Line 1</div>
                        <cs-input id="addressLine1" required max-length="60" light value="{{addressLine1}}"></cs-input>
                        <div class="dataLabel">Address Line 2</div>
                        <cs-input id="addressLine2" max-length="60" light value="{{addressLine2}}"></cs-input>
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
                        <cs-accordion id="taskSection" caption="Tasks ([[jobTasks.length]])">
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
                        <cs-accordion id="equipmentSection" caption="Equipment ([[jobEquipment.length]])">
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
                                        <div class$="[[equipment.classList]]">[[equipment.name]] ([[equipment.allocation]] h/d)</div>
                                        <paper-icon-button id="removeEquipment" icon="remove-circle" on-tap="_removeEquipment"></paper-icon-button>
                                    </div>
                                </template>
                            </div>
                        </cs-accordion>
                        <cs-accordion id="operatorsSection" caption="Instrument Operators ([[jobOperators.length]])">
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
                                        <div class$="[[operator.classList]]">[[operator.name]] ([[operator.allocation]] h/d)</div>
                                        <paper-icon-button id="removeOperator" icon="remove-circle" on-tap="_removeOperator"></paper-icon-button>
                                    </div>
                                </template>
                            </div>
                        </cs-accordion>
                    </div>
                </div>
                <div class="horizontal layout end-justified dialogButtons">
                    <cs-button id="saveButton" class="saveButton" on-tap="_save">[[saveButtonCaption]]</cs-button>
                    <cs-button id="deleteButton" class="deleteButton" on-tap="_delete">[[deleteButtonCaption]]</cs-button>
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
                notify: true
            },
            scheduleItem: {
                type: Object,
                notify: true,
                observer: "_scheduleItemChanged"
            },
            /** Private **/
            baseUrl: {
                type: String,
                notify: true
            },
            jobUpdateUrl: {
                type: String
            },
            timelineStartDate: {
                type: Date
            },
            timelineEndDate: {
                type: Date
            },
            startDate: {
                type: Date,
                notify: true,
                observer: "_validateInput"
            },
            endDate: {
                type: Date,
                notify: true,
                observer: "_validateInput"
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
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
                notify: true,
                observer: "_validateInput"
            },
            projectName: {
                type: String,
                notify: true,
                observer: "_validateInput"
            },
            addressLine1: {
                type: String,
                notify: true,
                observer: "_validateInput"
            },
            addressLine2: {
                type: String,
                notify: true
            },
            city: {
                type: String,
                notify: true,
                observer: "_validateInput"
            },
            state: {
                type: String,
                notify: true
            },
            zip: {
                type: String,
                notify: true,
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
                type: Array,
                notify: true
            },
            jobEquipment: {
                type: Array,
                notify: true
            },
            jobOperators: {
                type: Array,
                notify: true
            },
            dialogCaption: {
                type: String,
                notify: true
            },
            saveButtonCaption: {
                type: String,
                notify: true
            },
            deleteButtonCaption: {
                type: String,
                notify: true
            }
        };
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.baseUrl = window.location.href;
        var trailingCharacter = this.baseUrl.slice(-1);
        if (trailingCharacter === "/") {
            this.baseUrl = this.baseUrl + "api/ScheduleItem/";
        } else {
            this.baseUrl = this.baseUrl + "/api/ScheduleItem/";
        }
    }

    // Event Handlers
    _scheduleItemChanged(newValue, oldValue) {
        this.jobTasks = null;
        this.jobEquipment = null;
        this.jobOperators = null;
        if (this.referenceData && this.scheduleItem) {
            if (this.referenceData.applicationUser.roleId === 4) {
                this.$.projectManagersDD.disabled = true;
            } else {
                this.$.projectManagersDD.disabled = false;
            }
            if (this.referenceData.projectManagers) {
                for (let pm of this.referenceData.projectManagers) {
                    if (this.scheduleItem.projectManager.id === pm.id) {
                        this.selectedProjectManager = pm;                        
                        break;
                    }
                }
                if (this.scheduleItem.affectedProjectManager) {
                    this.saveButtonCaption = "Approve";
                    this.deleteButtonCaption = "Reject";
                    this.dialogCaption = "Approve/Reject Job";
                    for (let apm of this.referenceData.projectManagers) {
                        if (this.scheduleItem.affectedProjectManager.id === apm.id) {
                            this.selectedAffectedProjectManager = apm;
                            this.$.affectedProjectManagerSection.classList.remove("removed");
                            break;
                        }
                    }
                    if (this.referenceData.applicationUser.id === this.scheduleItem.projectManager.id ||
                        this.scheduleItem.statusId === 1) {
                        this.saveButtonCaption = "Save";
                        this.deleteButtonCaption = "Delete";
                        this.dialogCaption = "Edit Job";
                    }
                } else {
                    this.saveButtonCaption = "Save";
                    this.deleteButtonCaption = "Delete";
                    this.dialogCaption = "Edit Job";
                    this.selectedAffectedProjectManager = null;
                    this.$.affectedProjectManagerSection.classList.add("removed");
                }
            }
            if (this.referenceData.crewChiefs) {
                for (let cc of this.referenceData.crewChiefs) {
                    if (this.scheduleItem.crewChief.id === cc.id) {
                        this.selectedCrewChief = cc;
                        if (this.scheduleItem.employeeStatusId === 2) {
                            this.$.crewChiefCaption.classList.add("conflictIndicator");
                        } else {
                            this.$.crewChiefCaption.classList.remove("conflictIndicator");
                        }
                        this.crewChiefSelectedAllocationHours = this.allocationHours[this.scheduleItem.crewChief.allocation - 1];
                        break;
                    }
                }
            }
            for (let op of this.scheduleItem.operators) {
                if (op.statusId === 1) {
                    op.classList = "jobItem flex";
                } else {
                    op.classList = "jobItem flex conflictIndicator";
                }
            }
            for (let equip of this.scheduleItem.equipment) {
                if (equip.statusId === 1) {
                    equip.classList = "jobItem flex";
                } else {
                    equip.classList = "jobItem flex conflictIndicator";
                }
            }
            this.timelineStartDate = this.referenceData.startDate;
            this.timelineEndDate = this.referenceData.endDate;
            this.startDate = (this.scheduleItem.startDate.split('T', 1))[0];
            this.endDate = (this.scheduleItem.endDate.split('T', 1))[0];
            this.crewChiefSelectedAllocationHours = this.allocationHours[11];
            this.equipmentSelectedAllocationHours = this.allocationHours[11];
            this.operatorSelectedAllocationHours = this.allocationHours[11];
            this.projectNumber = this.scheduleItem.projectNumber;
            this.projectName = this.scheduleItem.projectName;
            this.addressLine1 = this.scheduleItem.addressLine1;
            this.addressLine2 = this.scheduleItem.addressLine2;
            this.city = this.scheduleItem.city;
            this.state = this.scheduleItem.state;
            this.zip = this.scheduleItem.zip;
            this.jobTasks = this.scheduleItem.tasks;
            this.jobEquipment = this.scheduleItem.equipment;
            this.jobOperators = this.scheduleItem.operators;
            this.$.taskSection.isAccordionVisible = false;
            this.$.equipmentSection.isAccordionVisible = false;
            this.$.operatorsSection.isAccordionVisible = false;
            this.$.crewChiefsDD.focus();
            this._validateInput();
        }
    }

    foundInArrayById(searchItem, arrayToSearch) {
        let retval = false;
        for (var item of arrayToSearch) {
            if (item.id === searchItem.id) {
                retval = true;
                break;
            }
        }
        return retval;
    }

    _addTask(e) {
        if (this.selectedTask && !this.foundInArrayById(this.selectedTask, this.jobTasks)) {
            this.push("jobTasks", this.selectedTask);
            this._validateInput();
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
            equipmentToAdd.classList = "jobItem flex";
            equipmentToAdd.allocation = this.equipmentSelectedAllocationHours;
            this.push("jobEquipment", equipmentToAdd);
            this._validateInput();
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
            operatorToAdd.classList = "jobItem flex";
            operatorToAdd.allocation = this.operatorSelectedAllocationHours;
            this.push("jobOperators", operatorToAdd);
            this._validateInput();
        }
    }

    _removeOperator(e) {
        let removeItemIndex = this.jobEquipment.indexOf(e.model.operator);
        this.splice("jobOperators", removeItemIndex, 1);
        this._validateInput();
    }

    _validateInput(newValue, oldValue) {
        this.$.saveButton.disabled = true;
        if (this.startDate && this.endDate &&
            this.startDate <= this.endDate &&
            this.$.projectNumber.isValid &&
            this.$.projectName.isValid &&
            this.$.addressLine1.isValid &&
            this.$.city.isValid &&
            this.$.zip.isValid &&
            this.jobTasks && this.jobTasks.length > 0 &&
            this.jobEquipment && this.jobEquipment.length > 0) {
            this.$.saveButton.disabled = false;
        }
    }

    _save(e) {
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: true } }));
        this.selectedCrewChief.allocation = this.crewChiefSelectedAllocationHours;
        let scheduleParameters = {
            "loginId": this.referenceData.applicationUser.loginId,
            "password": this.referenceData.applicationUser.password,
            "startDate": this.referenceData.startDate,
            "endDate": this.referenceData.endDate,
            "branchId": this.referenceData.branchId,
            "operation": "UPDATE"
        };
        if (this.saveButtonCaption === "Approve") {
            scheduleParameters.operation = "APPROVE";
        }
        let scheduleItem = {
            "id": this.scheduleItem.id,
            "typeId": this.scheduleItem.typeId,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "projectManager": this.selectedProjectManager,
            "crewChief": this.selectedCrewChief
        };
        let body = {
            "scheduleParameters": scheduleParameters,
            "scheduleItem": scheduleItem
        };
        this.saveJob(body);
    }

    saveJob(body) {
        body.scheduleItem.projectNumber = this.projectNumber;
        body.scheduleItem.projectName = this.projectName;
        body.scheduleItem.addressLine1 = this.addressLine1;
        body.scheduleItem.city = this.city;
        body.scheduleItem.state = this.state;
        body.scheduleItem.zip = this.zip;
        body.scheduleItem.tasks = this.jobTasks;
        body.scheduleItem.equipment = this.jobEquipment;
        body.scheduleItem.operators = this.jobOperators;
        if (this.addressLine2) {
            body.scheduleItem.addressLine2 = this.addressLine2;
        }
        this.jobUpdateUrl = this.baseUrl + this.scheduleItem.id;
        this.$.jobUpdateXhr.body = body;
        this.$.jobUpdateXhr.generateRequest();
    }

    _delete(e) {
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: true } }));
        let scheduleParameters = {
            "loginId": this.referenceData.applicationUser.loginId,
            "password": this.referenceData.applicationUser.password,
            "startDate": this.referenceData.startDate,
            "endDate": this.referenceData.endDate,
            "branchId": this.referenceData.branchId,
            "operation": "DELETE"
        };
        let scheduleItem = {
            "id": this.scheduleItem.id
        };
        let body = {
            "scheduleParameters": scheduleParameters,
            "scheduleItem": scheduleItem
        };
        this.jobUpdateUrl = this.baseUrl + this.scheduleItem.id;
        this.$.jobUpdateXhr.body = body;
        this.$.jobUpdateXhr.generateRequest();        
    }

    _handleUpdateJobResponse(e, request) {
        this._closeDialog();
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: false } }));
        if (e.detail.response.exception) {
            this.dispatchEvent(new CustomEvent('exception', { bubbles: true, composed: true, detail: e.detail.response.exception.Message }));
        } else {
            let branchId = this.referenceData.branchId;
            this.referenceData = null;
            e.detail.response.refreshTimestamp = new Date(Date.now());
            e.detail.response.startDate = this.timelineStartDate;
            e.detail.response.endDate = this.timelineEndDate;
            e.detail.response.branchId = branchId;
            this.referenceData = e.detail.response;
        }
    }

    _handleXhrError(e, request) {
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: false } }));
        this.dispatchEvent(new CustomEvent('exception', { bubbles: true, composed: true, detail: e.detail.error.message }));
    }

    _closeDialog(e) {
        this.dispatchEvent(new CustomEvent("close"));
    }
}
customElements.define('cs-edit-job-region', CsEditJobRegion);