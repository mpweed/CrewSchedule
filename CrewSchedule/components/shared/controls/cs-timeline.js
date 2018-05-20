import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">                
                .datepickerPanel {
                    background-color: var(--paper-grey-800);
                    padding-left: 10px;
                    padding-bottom: 10px;
                }

                .timelineContainer {                    
                    width: 100 %;
                    height: 600px;
                    overflow: auto;
                    margin-left: 10px;
                    margin-right: 10px;
                    position: relative;
                }

                .dayContainer {
                    width: 34px;
                    height: 600px;
                }

                .dayHeader {
                    width: 34px;
                    border-right: 1px solid var(--paper-grey-800);
                    border-bottom: 1px solid var(--paper-grey-600);
                    text-align: center;
                    font-size: .8em;
                }

                .yearHeader {
                    border: 1px solid var(--paper-light-blue-200);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-light-blue-200);
                    color: var(--paper-grey-900);
                }

                .alternateYearHeader {
                    border: 1px solid var(--paper-light-blue-300);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-light-blue-300);
                    color: var(--paper-grey-900);
                }

                .monthHeader {
                    border: 1px solid var(--paper-light-blue-400); 
                    border-right: 1px solid var(--paper-grey-800);                                       
                    background-color: var(--paper-light-blue-400);                    
                }

                .alternateMonthHeader {
                    border: 1px solid var(--paper-light-blue-500);
                    border-right: 1px solid var(--paper-grey-800);                                        
                    background-color: var(--paper-light-blue-500);
                }

                .day {
                    width: 34px;                    
                    border-right: 1px solid var(--paper-grey-800);
                }
        
                .weekend {
                    background-color: var(--paper-grey-800);
                }

                .job {
                    height:24px;
                    text-align:center;
                    cursor:default;
                    position:absolute; 
                }

                .job:hover {
                    opacity: .8
                }
            </style>
            <div class="horizontal layout flex datepickerPanel">
                <div class="dataField">
                    <div class="dataLabel">Start Date</div>
                    <vaadin-date-picker class="cs-datepicker" value="{{startDate}}"></vaadin-date-picker>
                </div>
                <div class="flex">
                    <div class="dataLabel">End Date</div>
                    <vaadin-date-picker class-"cs-datepicker" value="{{endDate}}"></vaadin-date-picker>
                </div>           
            </div>
            <div id="timelineContainer" class="timelineContainer scroll">
                <div class="horizontal layout">
                    <template is="dom-repeat" items="[[timelineArray]]" as="day">
                        <div class="vertical layout dayContainer">
                            <div class$="[[day.headerClassList]]">
                                <div class$="[[day.yearHeaderClass]]">[[day.year]]</div>
                                <div class$="[[day.monthHeaderClass]]">[[day.month]]</div>
                                <div>[[day.day]]</div>
                                <div>[[day.number]]</div>
                            </div>
                            <div class$="[[day.dayClassList]]"></div>
                        </div>                        
                    </template>                
                </div>
                <div id="jobContainer">
                    <!-- <div crew="1" job="2" style="background-color:red; top:80px; left:68px; width:340px;" class="job" on-tap="_jobTapped">Port Authority - NJ</div> -->
                </div>                
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            timelineArray: {
                type: Array
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String,
                observer: "_endDateChanged"
            },
            crews: {
                type: Array
            },
            selectedJob: {
                type: Object
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();

        // **TEMPORARY** - Static data used for layout design and development
        let crews = [
            {
                "id": "1",
                "name": "Crew 1",
                "color": "#e53935",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-5-16",
                        "endDate": "2018-6-17"
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-5-17",
                        "endDate": "2018-6-13"
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-6-22",
                        "endDate": "2018-6-28"
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-6-18",
                        "endDate": "2018-7-12"
                    }
                ]
            }
        ];
        this.crews = crews;

        // **PERMANENT** - Component initialization logic
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

    // Event Handlers
    _endDateChanged(newValue, oldValue) {
        if (this.startDate && this.endDate && this.startDate != this.endDate) {
            if (this.endDate < this.startDate) {
                // TODO: SHOW ERROR MESSAGE THAT END DATE MUST BE GREATER THAN START DATE
            } else {
                this.generateTimeSpan();
            }
        }
    }

    _jobTapped(e) {
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

    generateTimeSpan() {
        this.clearJobs();
        this.timelineArray = new Array();
        let timeSpanStart = new Date(this.startDate);
        let timeSpanEnd = new Date(this.endDate);
        let timezoneOffset = timeSpanStart.getTimezoneOffset();
        let timezoneOffsetDays = (timezoneOffset / 1440);
        if (timezoneOffsetDays > 0) {
            timeSpanStart.setDate(timeSpanStart.getDate() + timezoneOffsetDays);
            timeSpanEnd.setDate(timeSpanEnd.getDate() + timezoneOffsetDays);
        } else {
            timeSpanStart.setDate(timeSpanStart.getDate() - timezoneOffsetDays);
            timeSpanEnd.setDate(timeSpanEnd.getDate() - timezoneOffsetDays);
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
                currentDay.dayClassList = "flex day weekend";
            } else {
                currentDay.headerClassList = "dayHeader";
                currentDay.dayClassList = "flex day";
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
        }
        this.generateJobs();
    }

    clearJobs() {
        while (this.$.jobContainer.firstChild) {
            this.$.jobContainer.removeChild(this.$.jobContainer.firstChild);
        }
    }

    generateJobs() {
        if (this.crews && this.crews.length > 0 && this.startDate && this.endDate) {            
            let currentCrew = this.crews[0];
            let previousCrewHeight = 0;
            for (var crew of this.crews) {
                if (crew.id === currentCrew.id) { // Same crew
                    this.removeOutOfRangeJobsForCrew(crew);
                    this.adjustJobDatesForCrew(crew);
                    this.generateSwimlanesForCrew(crew);
                    previousCrewHeight = this.generateJobHtmlForCrew(crew, previousCrewHeight);
                } else { // New Crew
                    currentCrew = crew;
                }
            }
        }
    }

    removeOutOfRangeJobsForCrew(crew) {
        let startDate = new Date(this.startDate);
        let endDate = new Date(this.endDate);
        if (crew.jobs && crew.jobs.length > 0) {
            for (var i = 0; i < crew.jobs.length; i++) {
                let currentStartDate = new Date(crew.jobs[i].startDate);
                let currentEndDate = new Date(crew.jobs[i].endDate);                
                if (currentEndDate < startDate) { // Job ends before start of timeline range
                    crew.jobs.splice(i, 1);
                }
                if (currentStartDate > endDate) { // Job starts after end of timeline range
                    crew.jobs.splice(i, 1);
                }
            }
        }
    }

    adjustJobDatesForCrew(crew) {
        let startDate = new Date(this.startDate);
        let endDate = new Date(this.endDate);
        if (crew.jobs && crew.jobs.length > 0) {
            for (var job of crew.jobs) {
                let currentStartDate = new Date(job.startDate);
                let currentEndDate = new Date(job.endDate);
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

    generateSwimlanesForCrew(crew) {        
        if (crew.jobs && crew.jobs.length > 0) {
            let clonedJobsArray = JSON.parse(JSON.stringify(crew.jobs));
            crew.swimlanes = new Array();
            while (clonedJobsArray.length > 0) {
                let previousJob = null;
                let currentJob = null;
                let previousJobEndDate = null;
                let currentJobStartDate = null;
                let currentSwimlane = new Array();
                for (var i = 0; i < clonedJobsArray.length; i++) {
                    currentJob = clonedJobsArray[i];
                    if (!previousJob) {
                        previousJob = currentJob;
                    }
                    if (previousJob.id === currentJob.id) {
                        currentSwimlane.push(currentJob);
                        clonedJobsArray.splice(i, 1);
                    } else {
                        previousJobEndDate = new Date(previousJob.endDate);
                        currentJobStartDate = new Date(currentJob.startDate);
                        if (currentJobStartDate > previousJobEndDate) {
                            currentSwimlane.push(currentJob);
                            clonedJobsArray.splice(i, 1);
                        }
                        previousJob = currentJob;
                    }
                }
                crew.swimlanes.push(currentSwimlane);
            }
        }
    }

    generateJobHtmlForCrew(crew, previousCrewHeight) {        
        const TOP_OFFSET = 90;        
        const JOB_HEIGHT = 24;
        const JOB_TOP_MARGIN = 10;
        let currentJob = null;
        let crewHeight = 0;
        let topOffset = TOP_OFFSET + previousCrewHeight;

        if (crew.swimlanes && crew.swimlanes.length > 0) {
            let swimlaneIndex = 1;
            for (var swimlane of crew.swimlanes) {
                for (var i = 0; i < swimlane.length; i++) {
                    currentJob = swimlane[i];
                    currentJob.crew = crew.id;
                    currentJob.color = crew.color;
                    currentJob.job = currentJob.id;
                    currentJob.top = topOffset;
                    currentJob.left = this.calculateLeftOffset(currentJob);
                    currentJob.width = this.calculateWidth(currentJob);
                    this.generateJobHtml(currentJob);
                }
                topOffset = topOffset + JOB_TOP_MARGIN + JOB_HEIGHT;
                crewHeight = JOB_TOP_MARGIN + JOB_HEIGHT;
            }
        }
        return crewHeight;
    }

    calculateLeftOffset(job) {
        const MILLISECONDS_IN_DAY = 86400000;
        const DAY_WIDTH = 35;
        let timeSpanStart = new Date(this.startDate);
        let jobStartDate = new Date(job.startDate);
        let jobEndDate = new Date(job.endDate);
        let leftOffsetDays = (jobStartDate - timeSpanStart) / MILLISECONDS_IN_DAY;
        return (leftOffsetDays * DAY_WIDTH);
    }

    calculateWidth(job) {
        const MILLISECONDS_IN_DAY = 86400000;
        const DAY_WIDTH = 35;
        let jobStartDate = new Date(job.startDate);
        let jobEndDate = new Date(job.endDate);
        let lengthInDays = (jobEndDate - jobStartDate) / MILLISECONDS_IN_DAY;
        return (lengthInDays * DAY_WIDTH);
    }

    generateJobHtml(job) {
        let newJob = document.createElement('div');
        let crewAttr = document.createAttribute('crew');
        crewAttr.value = job.crew;
        newJob.setAttributeNode(crewAttr);
        let jobAttr = document.createAttribute('job');
        jobAttr.value = job.job;
        newJob.setAttributeNode(jobAttr);
        let styleAttr = document.createAttribute('style');
        let styleString = "background-color:" + job.color + ";";
        styleString = styleString + "top:" + job.top + "px;";
        styleString = styleString + "left:" + job.left + "px;";
        styleString = styleString + "width:" + job.width + "px;";
        styleAttr.value = styleString;
        newJob.setAttributeNode(styleAttr);
        let classAttr = document.createAttribute('class');
        classAttr.value = "job";
        newJob.setAttributeNode(classAttr);
        newJob.addEventListener("click", this._jobTapped);
        newJob.innerHTML = job.name;
        newJob.context = this;
        this.$.jobContainer.appendChild(newJob);
    }

}
customElements.define('cs-timeline', CsTimeline);