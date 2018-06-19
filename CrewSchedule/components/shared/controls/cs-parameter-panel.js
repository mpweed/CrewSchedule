import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
import '../../desktop/views/sections/regions/cs-filter-crew-chiefs-region.js'
class CsParameterPanel extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .companyOfficePanel {
                    position: relative;
                    padding-left: 30px;
                }

                .companyLabel {
                    margin-left: 30px;
                }

                .startDateLabel {
                    margin-left: 30px;
                }

                .horizontalDataLabel {
                    margin-top: 4px;
                    min-width: 83px;
                    text-align: right;
                }

                .horizontalDataField {
                    padding-top: 10px;
                    margin-right: 20px;
                }

                .horizontalDataFieldSmallMargin {
                     padding-top: 10px;
                     margin-right: 8px;
                }

                .companyField {
                    width: 192px;
                    min-width: 192px;
                }

                .officeField {
                    width: 192px;
                    min-width: 192px;
                }

                .datepickerPanel {
                    position: relative;
                    padding-left: 30px;
                    margin-bottom: 10px;
                }

                .endDateContainer {
                    overflow: visible;
                }

                .endDateErrorMessage {
                    text-align: center;
                    font-size: .8em;
                    margin-top: 10px;
                    margin-left: 464px;
                    padding: 4px;
                    height: 20px;
                    width: 250px;
                    background-color: var(--paper-red-700);
                    border: 1px solid #FFFFFF;
                    position: absolute
                    top: 120%;
                }

                .endDateErrorMessage::before {
                    content: " ";
                    position: absolute;
                    top: 82px;
                    left: 588px;
                    margin-top: -8px;
                    border-width: 8px;
                    border-style: solid;
                    border-color: transparent transparent #FFFFFF transparent;
                }

                .actionButton {
                    width: 40px;
                    height: 40px;
                    min-width: 40px;
                    min-height: 40px;
                    color: var(--paper-lime-300);                    
                    cursor: pointer;
                }

                .actionButton:hover {
                    color: #ffffff;
                }

                paper-icon-button[disabled] {
                    color: var(--paper-grey-800);
                }

                .filterStatus {
                    color: var(--paper-orange-300);
                    font-size: .9em;
                    font-weight: 200;
                    margin-top: 10px;
                }
            </style>
            <div id="companyOfficePanel" class="horizontal layout companyOfficePanel">
                <paper-icon-button id="zoomIn" icon="zoom-in" class="actionButton" on-tap="_zoomInClick"></paper-icon-button>
                <div class="dataLabel horizontalDataLabel companyLabel">Company</div>
                <div class="horizontalDataField companyField">
                    <cs-dropdown light items="{{referenceData.applicationUser.companies}}" label-field="name" selected="{{selectedCompany}}"></cs-dropdown>
                </div>
                <div class="dataLabel horizontalDataLabel">Branch</div>
                <div class="horizontalDataField officeField">
                    <cs-dropdown light items="{{selectedCompany.branches}}" label-field="name" selected="{{selectedBranch}}"></cs-dropdown>
                </div>
                <div class="horizontal layout flex end-justified">
                    <paper-icon-button id="createScheduleItem" icon="add" class="actionButton" on-tap="_createScheduleItemClick"></paper-icon-button>
                </div>
            </div>
            <div id="datepickerPanel" class="horizontal layout datepickerPanel">
                <paper-icon-button id="zoomOut" icon="zoom-out" class="actionButton" on-tap="_zoomOutClick"></paper-icon-button>
                <div class="dataLabel horizontalDataLabel startDateLabel">Start Date</div>
                <div class="horizontalDataField">
                    <vaadin-date-picker value="{{startDate}}"></vaadin-date-picker>
                </div>
                <div class="dataLabel horizontalDataLabel">End Date</div>
                <div class="horizontalDataFieldSmallMargin endDateContainer">
                    <vaadin-date-picker value="{{endDate}}"></vaadin-date-picker>                    
                </div>                
                <div class="horizontal layout flex end-justified">
                    <div class="filterStatus">[[filterStatus]]</div>
                    <paper-icon-button id="filterCrews" icon="filter-list" class="actionButton" on-tap="_filterCrewsClick"></paper-icon-button>
                </div>
            </div>
            <div>
                <div id="endDateErrorMessage" class="endDateErrorMessage removed">End Date must be greater than Start Date</div>
            </div>
            <cs-dialog id="filterCrewsDialog">
                <cs-filter-crew-chiefs-region crew-chief-filter="{{crewChiefFilter}}"
                                        on-close="_hideFilterCrewsDialog">
                </cs-filter-crew-chiefs-region>
            </cs-dialog>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isDialogShown: {
                type: Boolean,
                notify: true
            },
            referenceData: {
                type: Object,
                notify: true,
                observer: "_referenceDataChanged"
            },
            startDate: {
                type: String,
                notify: true,
                observer: "_dateChanged"
            },
            endDate: {
                type: String,
                notify: true,
                observer: "_dateChanged"
            },
            zoomLevel: {
                type: Number,
                value: 1,
                notify: true,
                observer: "_zoomLevelChanged"
            },
            dayWidth: {
                type: Number,
                value: 34,
                notify: true
            },
            filteredCrewChiefs: {
                type: Array,
                notify: true
            },
            /** Private **/
            selectedCompany: {
                type: Object,
                notify: true
            },
            selectedBranch: {
                type: Object,
                notify: true
            },
            crewChiefs: {
                type: Array,
                notify: true
            },
            crewChiefFilter: {
                type: Array,
                notify: true,
                observer: "_crewChiefFilterChanged"
            },
            filterStatus: {
                type: String
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
    _referenceDataChanged(newValue, oldValue) {
        this.filteredCrewChiefs = null;
        if (this.referenceData) {
            this.zoomLevel = Number(this.referenceData.applicationUser.zoomLevel);                                   
            if (this.referenceData.crewChiefs) {
                this.crewChiefs = JSON.parse(JSON.stringify(this.referenceData.crewChiefs));
                let filter = new Array();
                for (var crewChief of this.crewChiefs) {
                    crewChief.checked = true;
                    filter.push(crewChief);
                }
                this.crewChiefFilter = filter;
                this.startDate = this.referenceData.startDate;
                this.endDate = this.referenceData.endDate;
            }
        }        
    }

    _crewChiefFilterChanged(newValue, oldValue) {
        this.updateFilteredCrewChiefs();
        this.dispatchEvent(new CustomEvent('filterupdated', { bubbles: true, composed: true }));
    }

    _dateChanged(newValue, oldValue) {
        //this.crewChiefs = null;
        if (this.startDate && this.endDate && this.startDate != this.endDate) {
            if (this.endDate < this.startDate) {
                this.filteredCrewChiefs = null;
                this.$.endDateErrorMessage.classList.remove("removed");
            } else {
                this.$.endDateErrorMessage.classList.add("removed");
            }
        }
    }

    updateFilteredCrewChiefs() {
        let filteredCrewChiefs = new Array();
        if (this.crewChiefFilter) {
            let counter = 0;
            for (var crewChief of this.crewChiefFilter) {
                if (crewChief.checked) {
                    filteredCrewChiefs.push(this.crewChiefs[counter]);
                }
                counter++;
            }
        }
        this.filteredCrewChiefs = filteredCrewChiefs;
        if (this.crewChiefFilter.length == filteredCrewChiefs.length) {
            this.filterStatus = "Off";
        } else {
            this.filterStatus = "On";
        }
    }

    _zoomLevelChanged(newValue, oldValue) {
        if (this.zoomLevel) {
            this.setZoomButtonState();
            this.setDayWidth();
        }
    }

    _zoomInClick(e) {
        if (this.zoomLevel < 4) {
            this.zoomLevel = this.zoomLevel + 1;
            this.$.zoomIn.focused = false;
        }
    }

    _zoomOutClick(e) {
        if (this.zoomLevel > 1) {
            this.zoomLevel = this.zoomLevel - 1;
            this.$.zoomOut.focused = false;
        }
    }

    _createScheduleItemClick(e) {
        this.dispatchEvent(new CustomEvent('addclick', { bubbles: true, composed: true }));
    }

    _filterCrewsClick(e) {
        if (!this.isDialogShown) {
            this.$.filterCrewsDialog.show();
        }            
    }

    _hideFilterCrewsDialog(e) {
        this.$.filterCrewsDialog.hide();
    }

    // Private Methods
    setDayWidth() {
        this.dayWidth = this.zoomLevel * 34;
    }

    setZoomButtonState() {
        if (this.zoomLevel) {
            if (this.zoomLevel < 2) {
                this.$.zoomOut.disabled = true;
            } else {
                this.$.zoomOut.disabled = false;
            }
            if (this.zoomLevel > 3) {
                this.$.zoomIn.disabled = true;
            } else {
                this.$.zoomIn.disabled = false;
            }
        }
    } 
}
customElements.define('cs-parameter-panel', CsParameterPanel);