import { PolymerElement, html } from '../../../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../shared/cs-shared-styles.js';
class CsEditPtoRegion extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">                
            </style>
            <iron-ajax id="ptoUpdateXhr"
                   url="[[ptoUpdateUrl]]"
                   method="PUT"
                   content-type="application/json"
                   handle-as="json"
                   on-response="_handleUpdatePtoResponse"
                   on-error="_handleXhrError">
            </iron-ajax>
            <iron-ajax id="ptoDeleteXhr"
                   url="[[ptoUpdateUrl]]"
                   method="PUT"
                   content-type="application/json"
                   handle-as="json"
                   on-response="_handleUpdatePtoResponse"
                   on-error="_handleXhrError">
            </iron-ajax>
            <div>
                <div class="dialogHeader">
                    <span class="dialogCaption">Edit PTO</span>
                </div>                
                <div class="dialogBody">
                    <!-- PLACE MAIN CONTENT HERE -->
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
                </div>
                <div class="horizontal layout end-justified dialogButtons">
                    <cs-button id="saveButton" class="saveButton" on-tap="_save">Save</cs-button>
                    <cs-button id="deleteButton" class="deleteButton" on-tap="_delete">Delete</cs-button>
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
            ptoUpdateUrl: {
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
            }
        }
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
        if (this.referenceData && this.scheduleItem) {
            if (this.referenceData.projectManagers) {
                for (let pm of this.referenceData.projectManagers) {
                    if (this.scheduleItem.projectManager.id === pm.id) {
                        this.selectedProjectManager = pm;
                        break;
                    }
                }
            }
            if (this.referenceData.crewChiefs) {
                for (let cc of this.referenceData.crewChiefs) {
                    if (this.scheduleItem.crewChief.id === cc.id) {
                        this.selectedCrewChief = cc;
                        this.crewChiefSelectedAllocationHours = this.allocationHours[this.scheduleItem.crewChief.allocation - 1];
                        break;
                    }
                }
            }
            this.timelineStartDate = this.referenceData.startDate;
            this.timelineEndDate = this.referenceData.endDate;
            this.startDate = (this.scheduleItem.startDate.split('T', 1))[0];
            this.endDate = (this.scheduleItem.endDate.split('T', 1))[0];
        }
    }

    _validateInput(newValue, oldValue) {
        this.$.saveButton.disabled = true;
        if (this.startDate && this.endDate && this.startDate <= this.endDate) {
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
            "branchId": this.referenceData.branchId
        };
        let scheduleItem = {
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
        this.ptoUpdateUrl = this.baseUrl + this.scheduleItem.id;
        this.$.ptoUpdateXhr.body = body;
        this.$.ptoUpdateXhr.generateRequest();
    }

    _delete(e) {
        this.ptoUpdateUrl = this.baseUrl + this.scheduleItem.id;
        this.$.ptoDeleteXhr.generateRequest();
    }

    _handleUpdatePtoResponse(e, request) {
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
        this.reset();
    }

    // Public Methods
    reset() {       
        
    }
}
customElements.define('cs-edit-pto-region', CsEditPtoRegion);