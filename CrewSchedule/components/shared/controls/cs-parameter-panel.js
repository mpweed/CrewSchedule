import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
import '../../desktop/views/sections/regions/cs-filter-crews-region.js'
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

                .endDateErrorMessage {
                    overflow: visible;
                    text-align: center;
                    font-size: .8em;
                    margin-top: 10px;
                    padding: 4px;
                    height: 20px;
                    width: 250px;
                    background-color: var(--paper-red-700);
                    border: 1px solid #FFFFFF;
                }

                .endDateErrorMessage::before {
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 655px;
                    margin-top: -8px;
                    border-width: 8px;
                    border-style: solid;
                    border-color: transparent #FFFFFF transparent transparent;
                }

                .actionButton {
                    width: 40px;
                    height: 40px;
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
                    <cs-dropdown light items="{{bootstrapData.applicationUser.companies}}" label-field="name" selected="{{selectedCompany}}"></cs-dropdown>
                </div>
                <div class="dataLabel horizontalDataLabel">Office</div>
                <div class="horizontalDataField officeField">
                    <cs-dropdown light items="{{selectedCompany.offices}}" label-field="name" selected="{{selectedOffice}}"></cs-dropdown>
                </div>
                <div class="horizontal layout flex end-justified">
                    <paper-icon-button id="createJob" icon="add" class="actionButton" on-tap="_addJobClick"></paper-icon-button>
                </div>
            </div>
            <div id="datepickerPanel" class="horizontal layout datepickerPanel">
                <paper-icon-button id="zoomOut" icon="zoom-out" class="actionButton" on-tap="_zoomOutClick"></paper-icon-button>
                <div class="dataLabel horizontalDataLabel startDateLabel">Start Date</div>
                <div class="horizontalDataField">
                    <vaadin-date-picker value="{{startDate}}"></vaadin-date-picker>
                </div>
                <div class="dataLabel horizontalDataLabel">End Date</div>
                <div class="horizontalDataFieldSmallMargin">
                    <vaadin-date-picker value="{{endDate}}"></vaadin-date-picker>
                    <!--<div id="endDateErrorMessage" class="endDateErrorMessage hidden">End Date must be greater than Start Date</div>-->
                </div>                
                <div class="horizontal layout flex end-justified">
                    <div class="filterStatus">[[filterStatus]]</div>
                    <paper-icon-button id="filterCrews" icon="filter-list" class="actionButton" on-tap="_filterCrewsClick"></paper-icon-button>
                </div>
            </div>
            <cs-dialog id="filterCrewsDialog">
                <cs-filter-crews-region crew-filter="{{crewFilter}}"
                                        on-close="_hideFilterCrewsDialog">
                </cs-filter-crews-region>
            </cs-dialog>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            bootstrapData: {
                type: Object,
                notify: true,
                observer: "_bootstrapDataChanged"
            },
            startDate: {
                type: Date,
                notify: true
            },
            endDate: {
                type: Date,
                notify: true,
                observer: "_endDateChanged"
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
            filteredCrews: {
                type: Array,
                notify: true
            },
            /** Private **/
            selectedCompany: {
                type: Object,
                notify: true
            },
            selectedOffice: {
                type: Object,
                notify: true
            },
            crews: {
                type: Array,
                notify: true
            },
            crewFilter: {
                type: Array,
                notify: true,
                observer: "_crewFilterChanged"
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

    ready() {
        super.ready();        
        let defaultStartDate = new Date(Date.now());
        let defaultEndDate = new Date(Date.now());
        defaultEndDate.setDate(defaultEndDate.getDate() + 31);
        this.startDate = (defaultStartDate.getFullYear() + '-' + (defaultStartDate.getMonth() + 1) + '-' + defaultStartDate.getDate()).toString();
        this.endDate = (defaultEndDate.getFullYear() + '-' + (defaultEndDate.getMonth() + 1) + '-' + defaultEndDate.getDate()).toString();
    }

    // Event Handlers
    _bootstrapDataChanged(newValue, oldValue) {
        this.filteredCrews = null;
        if (this.bootstrapData) {
            this.zoomLevel = Number(this.bootstrapData.applicationUser.zoomLevel);                                   
            if (this.bootstrapData.crews) {
                this.crews = JSON.parse(JSON.stringify(this.bootstrapData.crews));
                let filter = new Array();
                for (var crew of this.crews) {
                    crew.checked = true;
                    filter.push(crew);
                }
                this.crewFilter = filter;                
            }
        }        
    }

    _endDateChanged(newValue, oldValue) {
        this.crews = null;
        if (this.startDate && this.endDate && this.startDate != this.endDate) {
            if (this.endDate < this.startDate) {
                //this.$.endDateErrorMessage.classList.remove("hidden");
            } else {
                //this.$.endDateErrorMessage.classList.add("hidden");
                this.getCrews();
            }
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

    _addJobClick(e) {
        this.dispatchEvent(new CustomEvent('addclick', { bubbles: true, composed: true }));
    }

    _filterCrewsClick(e) {
        this.$.filterCrewsDialog.show();    
    }

    _hideFilterCrewsDialog(e) {
        this.$.filterCrewsDialog.hide();
    }

    _crewFilterChanged(newValue, oldValue) {
        let filteredCrews = new Array();
        if (this.crewFilter) {
            for (var crew of this.crewFilter) {
                if (crew.checked) {
                    filteredCrews.push(crew);
                }
            }
        }
        this.filteredCrews = filteredCrews;
        if (this.crewFilter.length == filteredCrews.length) {
            this.filterStatus = "Off";
        } else {
            this.filterStatus = "On";
        }
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

    getCrews() {
        /*** TEMPORARY ***/
        this.crews = null;
        if (this.bootstrapData && this.bootstrapData.crews) {
            this.crews = this.bootstrapData.crews;
        }        
    }
      
}
customElements.define('cs-parameter-panel', CsParameterPanel);