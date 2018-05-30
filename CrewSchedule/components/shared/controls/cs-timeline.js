import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .companyOfficePanel {
                    position: relative;
                    padding-left: 100px;
                }

                .datepickerPanel {
                    position: relative;
                    padding-left: 100px;
                    padding-bottom: 10px;
                }

                .companyField {
                    width: 192px;
                    min-width: 192px;
                    margin-left: 4px;
                }

                .officeField {
                    width: 192px;
                    min-width: 192px;
                    margin-left: 25px;
                }

                .timelineContainer {                    
                    width: 100 %;                    
                    position: relative;
                    overflow: auto;
                }

                .dayContainer {
                    width: 34px;
                }

                .dayHeader {
                    width: 34px;
                    border-right: 1px solid var(--paper-grey-800);
                    border-bottom: 1px solid var(--paper-grey-600);
                    text-align: center;
                    font-size: .8em;
                }

                .yearHeader {
                    border: 1px solid var(--paper-orange-300);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-orange-300);
                    color: var(--paper-grey-900);
                }

                .alternateYearHeader {
                    border: 1px solid var(--paper-orange-500);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-orange-500);
                    color: var(--paper-grey-900);
                }

                .monthHeader {
                    border: 1px solid var(--paper-lime-300); 
                    border-right: 1px solid var(--paper-grey-800);                                       
                    background-color: var(--paper-lime-300);
                    color: var(--paper-grey-900);
                }

                .alternateMonthHeader {
                    border: 1px solid var(--paper-lime-600);
                    border-right: 1px solid var(--paper-grey-800);                                        
                    background-color: var(--paper-lime-600);
                }

                .day {
                    width: 34px;                    
                    border-right: 1px solid var(--paper-grey-800);
                }
        
                .weekend {
                    background-color: var(--paper-grey-800);
                }

                .jobContainer {
                    position: absolute;
                    overflow: visible;
                }

                .job {
                    height:24px;
                    border-left: 1px solid #ffffff;
                    border-right: 1px solid #ffffff;
                    text-align:center;
                    cursor:default;
                    overflow: hidden;
                    position: relative; 
                }

                .job:hover {
                    opacity: .8
                }

                .horizontalDataLabel {
                    margin-top: 4px;
                }

                .horizontalDataField {
                    padding-top: 10px;
                    margin-right: 20px;
                }

                .horizontalDataFieldSmallMargin {
                     padding-top: 10px;
                     margin-right: 8px;
                }

                .hline {
                    height:1px;
                    position: absolute;
                }

                .crewPanel {
                    width: 100px;
                    min-width: 100px;
                    padding-top: 80px;
                }

                .crew {
                    border-top: 1px solid var(--paper-grey-600);
                    color: var(--paper-orange-300);
                    font-weight: 400;
                    text-align: center;
                    cursor: default;
                    min-height: 34px;
                }
                
                .crewName {
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .jobContainer .tooltiptext {
                    visibility: hidden;
                    font-size: .9em;
                    height:24px;
                    width: 350px;
                    background-color: var(--paper-grey-900);
                    color: #FFFFFF;
                    text-align: center;
                    border: 1px solid var(--paper-grey-600);
                    top: -120%;
                    position: absolute;
                    z-index: 1;
                }

                .jobContainer .tooltiptext-left-align {
                    left: 0;
                    margin-left: 10px;
                }

                .jobContainer .tooltiptext-right-align {
                    right: 0;
                    margin-right: 10px;
                }

                .jobContainer .tooltiptext-center-align {
                    left: 50%;
                    margin-left: -175px;
                }
                
                .jobContainer:hover .tooltiptext {
                    visibility: visible;
                }

                .addJobButton {
                    width: 40px;
                    height: 40px;
                    color: var(--paper-lime-300);
                    cursor: default;
                }

                .addJobButton:hover {
                    color: #ffffff;
                }

                .filterCrewsButton {
                    width: 40px;
                    height: 40px;
                    color: var(--paper-lime-300);
                    cursor: default;
                }

                .filterCrewsButton:hover {
                    color: #ffffff;
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
            </style>
            <div id="companyOfficePanel" class="horizontal layout companyOfficePanel">
                <div class="dataLabel horizontalDataLabel">Company</div>
                <div class="horizontalDataField companyField">
                    <cs-dropdown light items="{{companies}}" label-field="name" selected="{{selectedCompany}}"></cs-dropdown>
                </div>
                <div class="dataLabel horizontalDataLabel">Office</div>
                <div class="horizontalDataField officeField">
                    <cs-dropdown light items="{{selectedCompany.offices}}" label-field="name" selected="{{selectedOffice}}"></cs-dropdown>
                </div>
                <div class="horizontal layout flex end-justified">
                    <paper-icon-button id="createJob" icon="add" class="addJobButton" on-tap="_addJobClick"></paper-icon-button>
                </div>
            </div>
            <div id="datepickerPanel" class="horizontal layout datepickerPanel">                
                <div class="dataLabel horizontalDataLabel">Start Date</div>
                <div class="horizontalDataField">
                    <vaadin-date-picker value="{{startDate}}"></vaadin-date-picker>
                </div>
                <div class="dataLabel horizontalDataLabel">End Date</div>
                <div class="horizontalDataFieldSmallMargin">
                    <vaadin-date-picker value="{{endDate}}"></vaadin-date-picker>
                </div>
                <div id="endDateErrorMessage" class="endDateErrorMessage hidden">End Date must be greater than Start Date</div>
                <div class="horizontal layout flex end-justified">
                    <paper-icon-button id="filterCrews" icon="filter-list" class="filterCrewsButton" on-tap="_filterCrewsClick"></paper-icon-button>
                </div>
            </div>            
            <div class="horizontal layout">
                <div class="crewPanel">                    
                    <template is="dom-repeat" items="[[crews]]" as="crew">
                        <div class="crew" style$="height:[[crew.height]]">
                            <div class="crewName">[[crew.name]]</div>
                        </div>
                    </template>
                </div>
                <div id="timelineContainer" class="timelineContainer scroll" style$="height:[[timelineContainerHeight]];width:[[timelineContainerWidth]]">
                    <div id="timelineHeader" class="horizontal layout">
                        <template is="dom-repeat" items="[[timelineArray]]" as="day">
                            <div class="vertical layout dayContainer">
                                <div class$="[[day.headerClassList]]">
                                    <div class$="[[day.yearHeaderClass]]">[[day.year]]</div>
                                    <div class$="[[day.monthHeaderClass]]">[[day.month]]</div>
                                    <div>[[day.day]]</div>
                                    <div>[[day.number]]</div>
                                </div>
                                <div class$="[[day.dayClassList]]" style$="height:[[dayHeight]]"></div>
                            </div>                        
                        </template>                
                    </div>
                    <div id="jobContainer">               
                    </div>                
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            crews: {
                type: Array
            },            
            startDate: {
                type: String,
                observer: "_dateChanged"
            },
            endDate: {
                type: String,
                observer: "_dateChanged"
            },
            timelineArray: {
                type: Array
            },
            dayHeight: {
                type: String
            },
            timelineContainerWidth: {
                type: String
            },
            timelineContainerHeight: {
                type: String
            },
            selectedJob: {
                type: Object
            },
            companies: {
                type: Array,
                notify: true
            },
            selectedCompany: {
                type: Object
            },
            selectedOffice: {
                type: Object
            }            
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();               
    }

    ready() {
        super.ready();
        Date.prototype.getMonthName = function () {
            let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[this.getDay()];
        };
        let defaultStartDate = new Date(Date.now());
        let defaultEndDate = new Date(Date.now());
        defaultEndDate.setDate(defaultEndDate.getDate() + 31);
        this.startDate = (defaultStartDate.getFullYear() + '-' + (defaultStartDate.getMonth() + 1) + '-' + defaultStartDate.getDate()).toString();
        this.endDate = (defaultEndDate.getFullYear() + '-' + (defaultEndDate.getMonth() + 1) + '-' + defaultEndDate.getDate()).toString();
    }


    // **TEMPORARY** - Static data used for layout design and development
    generateCrews() {
        this.crews = null;
        let crews = [
            {
                "id": "1",
                "name": "Crew 1",                
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "2",
                "name": "Crew 2",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "3",
                "name": "Crew 3",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "4",
                "name": "Crew 4",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "5",
                "name": "Crew 5",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "6",
                "name": "Crew 6",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "7",
                "name": "Crew 7",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "8",
                "name": "Crew 8",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "9",
                "name": "Crew 9",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "10",
                "name": "Crew 10",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "11",
                "name": "Crew 11",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "12",
                "name": "Crew 12",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            }
        ];
        this.crews = crews;
    }

    // Event Handlers
    _dateChanged(newValue, oldValue) {
        if (this.startDate && this.endDate && this.startDate != this.endDate) {
            if (this.endDate < this.startDate) {
                this.crews = null;
                this.clearTimeline();
                this.$.endDateErrorMessage.classList.remove("hidden");
            } else {
                // **TEMPORARY** - Static data used for layout design and development
                this.generateCrews()

                this.$.endDateErrorMessage.classList.add("hidden");
                this.generateTimeSpan();
            }
        }
    }

    _addJobClick(e) {

    }

    _filterCrewsClick(e) {

    }

    _jobClick(e) {
        let context = e.path[0].context;
        let crewId = e.path[0].attributes.crew.nodeValue;
        let jobId = e.path[0].attributes.job.nodeValue;
        for (var crew of context.crews) {
            if (crew.id === crewId) {
                for (var job of crew.jobs) {
                    if (job.id === jobId) {
                        context.selectedJob = job;
                        break;
                    }
                }
            }
        }
    }

    setUtcAdjustedDate(localDate) {        
        let timezoneOffset = localDate.getTimezoneOffset();
        let timezoneOffsetDays = (timezoneOffset / 1440);
        if (timezoneOffsetDays > 0) {
            localDate.setDate(localDate.getDate() + timezoneOffsetDays);
        } else {
            localDate.setDate(localDate.getDate() - timezoneOffsetDays);
        }
    }

    clearTimeline() {
        this.clearJobs();
        this.timelineArray = null;
    }

    clearJobs() {
        while (this.$.jobContainer.lastChild) {
            this.$.jobContainer.removeChild(this.$.jobContainer.lastChild);
        }
    }

    generateTimeSpan() {
        const DAY_WIDTH = 34;
        let dayCounter = 0;
        let timelineWidth = 0;
        this.clearJobs();
        this.timelineArray = new Array();
        let timeSpanStart = new Date(this.startDate);
        if (timeSpanStart.getHours() != 0) {
            this.setUtcAdjustedDate(timeSpanStart);
        }
        let timeSpanEnd = new Date(this.endDate);
        if (timeSpanEnd.getHours() != 0) {
            this.setUtcAdjustedDate(timeSpanEnd);
        }
        let currentDate = timeSpanStart;
        let currentDayFullYear = currentDate.getFullYear();
        let currentMonthName = currentDate.getMonthName();
        let currentDayName = currentDate.getDayName();
        let currentDay = null;
        let previousYear = currentDayFullYear;
        let previousMonth = currentMonthName;
        let yearHeaderClass = "yearHeader";
        let monthHeaderClass = "monthHeader";
        while (currentDate <= timeSpanEnd) {
            currentDay = new Object();
            currentDay.year = currentDate.getFullYear();
            currentDay.month = currentDate.getMonthName();
            currentDay.day = currentDate.getDayName();
            currentDay.number = currentDate.getDate();
            if (currentDay.day === 'Sat' || currentDay.day === 'Sun') {
                currentDay.headerClassList = "dayHeader weekend";
                currentDay.dayClassList = "day weekend";
            } else {
                currentDay.headerClassList = "dayHeader";
                currentDay.dayClassList = "day";
            }
            if (previousYear != currentDay.year) {
                previousYear = currentDay.year;
                if (yearHeaderClass == "yearHeader") {
                    yearHeaderClass = "alternateYearHeader";
                } else {
                    yearHeaderClass = "yearHeader";
                }
            }
            if (previousMonth != currentDay.month) {
                previousMonth = currentDay.month;
                if (monthHeaderClass == "monthHeader") {
                    monthHeaderClass = "alternateMonthHeader";
                } else {                    
                    monthHeaderClass = "monthHeader";
                }
            }
            currentDay.yearHeaderClass = yearHeaderClass;
            currentDay.monthHeaderClass = monthHeaderClass;
            this.push('timelineArray', currentDay);
            currentDate.setDate(currentDate.getDate() + 1);
            dayCounter++;
        }
        timelineWidth = DAY_WIDTH * dayCounter;
        let dayHeight = this.generateJobs(timelineWidth);
        this.dayHeight = dayHeight.toString() + "px;";
        this.timelineContainerWidth = (timelineWidth + 10).toString() + "px";
        this.timelineContainerHeight = (dayHeight + 100).toString() + "px";
    }    

    generateJobs(timelineWidth) {
        let additionalTopOffset = 0;
        if (this.crews && this.crews.length > 0 && this.startDate && this.endDate) {            
            for (var crew of this.crews) {
                this.removeOutOfRangeJobs(crew);
                this.adjustJobDates(crew);
                this.sortJobs(crew);
                this.generateSwimlanes(crew);
                additionalTopOffset = this.generateJobHtml(crew, additionalTopOffset);
                additionalTopOffset = this.generateCrewDivider(additionalTopOffset, timelineWidth);
                crew.height = (crew.height + 9) + "px;";
            }
        }
        return additionalTopOffset;
    }

    removeOutOfRangeJobs(crew) {
        let startDate = new Date(this.startDate);
        if (startDate.getHours() != 0) {
            this.setUtcAdjustedDate(startDate);
        }
        let endDate = new Date(this.endDate);
        if (endDate.getHours() != 0) {
            this.setUtcAdjustedDate(endDate);
        }        
        if (crew.jobs && crew.jobs.length > 0) {
            let deletionList = new Array();
            for (var i = 0; i < crew.jobs.length; i++) {
                let currentStartDate = new Date(crew.jobs[i].startDate);
                if (currentStartDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentStartDate);
                }
                let currentEndDate = new Date(crew.jobs[i].endDate);
                if (currentEndDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentEndDate);
                }
                if (currentEndDate < startDate) { // Job ends before start of timeline range
                    deletionList.push(crew.jobs[i]);
                }
                if (currentStartDate > endDate) { // Job starts after end of timeline range
                    deletionList.push(crew.jobs[i]);
                }
            }
            for (var i = 0; i < deletionList.length; i++) {
                var indexToDelete = crew.jobs.indexOf(deletionList[i]);
                crew.jobs.splice(indexToDelete, 1);
            }
        }
    }

    adjustJobDates(crew) {
        let startDate = new Date(this.startDate);
        let endDate = new Date(this.endDate);
        if (crew.jobs && crew.jobs.length > 0) {
            for (var job of crew.jobs) {
                let currentStartDate = new Date(job.startDate);
                if (currentStartDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentStartDate);
                }
                let currentEndDate = new Date(job.endDate);
                if (currentEndDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentEndDate);
                }
                job.originalStartDate = job.startDate;
                job.originalEndDate = job.endDate;
                if (currentStartDate < startDate) {
                    job.startDate = this.startDate;
                }
                if (currentEndDate > endDate) {
                    job.endDate = this.endDate;
                }
            }
        }
    }

    sortJobs(crew) {
        crew.jobs.sort(
            (a, b) => {
                return (new Date(a.startDate)) - (new Date(b.startDate));
            });
    }

    generateSwimlanes(crew) {        
        if (crew.jobs && crew.jobs.length > 0) {
            let clonedJobsArray = JSON.parse(JSON.stringify(crew.jobs));
            crew.swimlanes = new Array();
            while (clonedJobsArray.length > 0) {
                let previousJob = null;
                let currentJob = null;
                let previousJobEndDate = null;
                let currentJobStartDate = null;
                let currentSwimlane = new Array();
                let deletionList = new Array();
                for (var i = 0; i < clonedJobsArray.length; i++) {
                    currentJob = clonedJobsArray[i];
                    if (!previousJob) {
                        previousJob = currentJob;
                    }
                    if (previousJob.id === currentJob.id) {
                        currentSwimlane.push(currentJob);
                        deletionList.push(currentJob);
                    } else {
                        previousJobEndDate = new Date(previousJob.endDate);
                        if (previousJobEndDate.getHours() != 0) {
                            this.setUtcAdjustedDate(previousJobEndDate);
                        }
                        currentJobStartDate = new Date(currentJob.startDate);
                        if (currentJobStartDate.getHours() != 0) {
                            this.setUtcAdjustedDate(currentJobStartDate);
                        }
                        if (currentJobStartDate > previousJobEndDate) {
                            currentSwimlane.push(currentJob);
                            deletionList.push(currentJob);
                            previousJob = currentJob;
                        }                        
                    }
                }
                for (var i = 0; i < deletionList.length; i++) {
                    var indexToDelete = clonedJobsArray.indexOf(deletionList[i]);
                    clonedJobsArray.splice(indexToDelete, 1);
                }                
                crew.swimlanes.push(currentSwimlane);
            }
        }
    }

    generateJobHtml(crew, additionalTopOffset) {        
        const STARTING_TOP_OFFSET = 90;        
        const JOB_HEIGHT = 24;
        const JOB_TOP_MARGIN = 10;
        let currentJob = null;
        let crewHeight = 0;
        let topOffset = STARTING_TOP_OFFSET + additionalTopOffset;
        if (crew.swimlanes && crew.swimlanes.length > 0) {
            for (var swimlane of crew.swimlanes) {
                for (var i = 0; i < swimlane.length; i++) {
                    currentJob = swimlane[i];
                    currentJob.crew = crew.id;
                    currentJob.color = currentJob.projectManager.color;
                    currentJob.job = currentJob.id;
                    currentJob.top = topOffset;
                    currentJob.left = this.calculateLeftOffset(currentJob);
                    currentJob.width = this.calculateWidth(currentJob);
                    this.generateHtml(currentJob);
                }
                topOffset = topOffset + JOB_TOP_MARGIN + JOB_HEIGHT;
                crewHeight = crewHeight + JOB_TOP_MARGIN + JOB_HEIGHT;
            }            
        }
        if (crewHeight == 0) {
            crewHeight = 34;
        }
        crew.height = crewHeight;
        if (topOffset == (STARTING_TOP_OFFSET + additionalTopOffset)) {
            topOffset = topOffset + 34;
        }
        return (topOffset - STARTING_TOP_OFFSET);
    }

    calculateLeftOffset(job) {
        const MILLISECONDS_IN_DAY = 86400000;
        const DAY_WIDTH = 34;
        let timeSpanStart = new Date(this.startDate);
        if (timeSpanStart.getHours() != 0) {
            this.setUtcAdjustedDate(timeSpanStart);
        }
        let jobStartDate = new Date(job.startDate);
        if (jobStartDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobStartDate)
        }        
        let leftOffsetDays = Math.round((jobStartDate - timeSpanStart) / MILLISECONDS_IN_DAY);
        return (leftOffsetDays * DAY_WIDTH);
    }

    calculateWidth(job) {
        const MILLISECONDS_IN_DAY = 86400000;
        const DAY_WIDTH = 34;
        let jobStartDate = new Date(job.startDate);
        if (jobStartDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobStartDate);
        }
        let jobEndDate = new Date(job.endDate);
        if (jobEndDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobEndDate);
        }        
        // Adjust end date so that the full day is included in the width calculation
        jobEndDate.setDate(jobEndDate.getDate() + 1);
        let lengthInDays = Math.round((jobEndDate - jobStartDate) / MILLISECONDS_IN_DAY);
        return (lengthInDays * DAY_WIDTH);
    }

    generateHtml(job) {
        let newJobContainer = document.createElement('div');
        newJobContainer.classList = "jobContainer";
        newJobContainer.style.top = job.top.toString() + "px";
        newJobContainer.style.left = job.left.toString() + "px";
        newJobContainer.style.width = job.width.toString() + "px";
        let newJob = document.createElement('div');
        let crewAttr = document.createAttribute('crew');
        crewAttr.value = job.crew;
        newJob.setAttributeNode(crewAttr);
        let jobAttr = document.createAttribute('job');
        jobAttr.value = job.job;
        newJob.setAttributeNode(jobAttr);
        newJob.style.backgroundColor = job.color;
        newJob.style.width = job.width.toString() + "px";        
        newJob.classList = "job";
        newJob.addEventListener("click", this._jobClick);
        newJob.innerHTML = job.name;
        newJob.context = this;
        newJobContainer.appendChild(newJob);
        this.generateJobTooltip(job, newJobContainer);
        this.$.jobContainer.appendChild(newJobContainer);
    }

    generateJobTooltip(job, newJobContainer) {
        if (job.startDate === this.startDate || job.endDate === this.endDate || job.width < 350) {            
            if (job.startDate === this.startDate && job.width < 350) {               
                let newTooltip = document.createElement('span');
                newTooltip.classList = "tooltiptext tooltiptext-left-align";
                newTooltip.innerHTML = job.name;
                newJobContainer.appendChild(newTooltip);
            } else if (job.endDate === this.endDate && job.width < 350) {
                let newTooltip = document.createElement('span');
                newTooltip.classList = "tooltiptext tooltiptext-right-align";
                newTooltip.innerHTML = job.name;
                newJobContainer.appendChild(newTooltip);
            } else if (job.width < 350) {
                let newTooltip = document.createElement('span');
                newTooltip.classList = "tooltiptext tooltiptext-center-align";
                newTooltip.innerHTML = job.name;
                newJobContainer.appendChild(newTooltip);
            }            
        }        
    }

    generateCrewDivider(additionalTopOffset, timelineWidth) {
        const STARTING_TOP_OFFSET = 90;
        let topOffset = STARTING_TOP_OFFSET + additionalTopOffset;
        let divider = document.createElement('div');       
        divider.style.top = topOffset.toString() + "px";
        divider.style.width = timelineWidth.toString() + "px";
        divider.style.backgroundColor = "#616161";
        divider.classList = "hline";
        this.$.jobContainer.appendChild(divider);
        return (additionalTopOffset + 10);
    }

}
customElements.define('cs-timeline', CsTimeline);