import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                :host {
                    margin-bottom: 10px;
                    overflow: hidden;
                }

                .timelineContainer {                    
                    width: 100%;                    
                    position: relative;
                    overflow: auto;
                }

                .dayHeader {
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
                    /* width: 34px; */                    
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
                    cursor: pointer;
                    overflow: hidden;
                    position: relative; 
                }

                .job:hover {
                    opacity: .8
                }                

                .hline {
                    height:1px;
                    position: absolute;
                }

                .crewPanel {
                    width: 100px;
                    min-width: 100px;
                    border-top: 1px solid var(--paper-grey-600);
                }

                .crew {
                    border-top: 1px solid var(--paper-grey-600);
                    color: #FFFFFF;
                    font-size: .8em;
                    font-weight: 400;
                    text-align: center;
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

                .scheduleContainer {
                    overflow: auto;
                }

                .zoomLabel {
                    margin-top: 11px;
                    text-align: center;
                    font-size: .8em;
                    color: var(--paper-grey-600);
                }

                .zoomValue {
                    color: #FFFFFF;
                    background-color: var(--paper-grey-800);
                    text-align: center;
                    font-size: .9em;
                    width: 20px;
                    padding: 4px;
                    margin-left: 37px;
                    margin-top: 6px;
                    margin-bottom: 14px;
                }
            </style>
            <cs-parameter-panel on-filterupdated="_handleFilterUpdated"
                                is-dialog-shown="{{isDialogShown}}"
                                reference-data="{{referenceData}}"
                                start-date="{{startDate}}"
                                end-date="{{endDate}}"
                                zoom-level="{{zoomLevel}}"
                                day-width="{{dayWidth}}"
                                filtered-crew-chiefs="{{crewChiefs}}">
            </cs-parameter-panel>
            <div id="scheduleContainer" class="scheduleContainer scroll" style$="height:[[scheduleContainerHeight]]">
                <div class="horizontal layout">
                    <div id="crewPanel" class="crewPanel">
                        <div class="zoomLabel">Zoom Level</div>
                        <div class="zoomValue">[[zoomLevel]]</div>
                        <template is="dom-repeat" items="[[crewChiefs]]" as="crewChief">
                            <div class="crew" style$="height:[[crewChief.height]]">
                                <div class="crewName">[[crewChief.name]]</div>
                            </div>
                        </template>
                    </div>
                    <div id="timelineContainer" class="timelineContainer scroll" style$="height:[[timelineContainerHeight]]; width:[[timelineContainerWidth]]">
                        <div id="timelineHeader" class="horizontal layout">
                            <template is="dom-repeat" items="[[timelineArray]]" as="day">
                                <div class="vertical layout" style$="width:[[dayWidthFormatted]]">
                                    <div class$="[[day.headerClassList]]" style$="width:[[dayWidthFormatted]]">
                                        <div class$="[[day.yearHeaderClass]]">[[day.year]]</div>
                                        <div class$="[[day.monthHeaderClass]]">[[day.month]]</div>
                                        <div>[[day.day]]</div>
                                        <div>[[day.number]]</div>
                                    </div>
                                    <div class$="[[day.dayClassList]]" style$="height:[[dayHeight]] width:[[dayWidthFormatted]]"></div>
                                </div>                        
                            </template>                
                        </div>
                        <div id="jobContainer">               
                        </div>                
                    </div>
                </div>
            </div>`;
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
                notify: true
            },
            /** Private **/
            startDate: {
                type: Date,
                observer: "_dateChanged"
            },
            endDate: {
                type: Date,
                observer: "_dateChanged"
            },
            zoomLevel: {
                type: Number
            },
            dayWidth: {
                type: Number,
                observer: "_dayWidthChanged"
            },
            dayWidthFormatted: {
                type: String
            },
            crewChiefs: {
                type: Array
            },
            timelineArray: {
                type: Array
            },
            dayHeight: {
                type: String
            },
            scheduleContainerHeight: {
                type: String,
                notify: true
            },
            timelineContainerWidth: {
                type: String
            },
            timelineContainerHeight: {
                type: String
            },
            selectedScheduleItem: {
                type: Object,
                observer: "_selectedScheduleItemChanged"
            }
        }
    }

    constructor() {
        super();
        this._boundResizeListener = this._onWindowResize.bind(this);
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();        
    }

    ready() {
        super.ready();       
        window.addEventListener("resize", this._boundResizeListener)
    }

    disconnectedCallback() {
        document.removeEventListener("resize", this._boundResizeListener);
    }

    // Event Handlers
    _onWindowResize(e) {
        this.scheduleContainerHeight = (window.innerHeight - 158).toString() + "px";
    }

    _dayWidthChanged(newValue, oldValue) {
        this.dayWidthFormatted = this.dayWidth.toString() + "px;";
        this.regenerateTimeSpan();
    }

    _dateChanged(newValue, oldValue) {
        if (this.startDate && this.endDate && this.startDate != this.endDate) {
            if (this.endDate < this.startDate) {
                this.clearTimeline();
                this.$.crewPanel.classList.add("hidden");
            } else {
                this.$.crewPanel.classList.remove("hidden");
                this.regenerateTimeSpan();
            }
        }        
    }

    _handleFilterUpdated(e) {
        this.regenerateTimeSpan();    
    }

    regenerateTimeSpan() {
        this.clearTimeline();
        if (this.crewChiefs) {
            this.generateTimeSpan();
        }
    }

    _jobClick(e) {        
        let context = e.path[0].context;
        context.selectedScheduleItem = null;
        let crewChiefId = e.path[0].attributes.crewChief.nodeValue;
        let scheduleItemId = e.path[0].attributes.scheduleItem.nodeValue;
        for (var crewChief of context.crewChiefs) {
            if (crewChief.id === Number(crewChiefId)) {
                for (var scheduleItem of crewChief.scheduleItems) {
                    if (scheduleItem.id === Number(scheduleItemId)) {
                        context.selectedScheduleItem = scheduleItem;
                        break;
                    }
                }
            }
        }        
    }

    _selectedScheduleItemChanged(newValue, oldValue) {
        if (newValue) {
            this.dispatchEvent(new CustomEvent('editclick', { bubbles: true, composed: true, detail: { scheduleItem: this.selectedScheduleItem } }));
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
        Date.prototype.getMonthName = function () {
            let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[this.getDay()];
        };
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
        timelineWidth = this.dayWidth * dayCounter;
        let dayHeight = this.generateScheduleItems(timelineWidth);
        this.dayHeight = dayHeight.toString() + "px;";
        this.timelineContainerWidth = (timelineWidth + 10).toString() + "px";
        this.timelineContainerHeight = (dayHeight + 100).toString() + "px";
        this.scheduleContainerHeight = (window.innerHeight - 158).toString() + "px";
    }    

    generateScheduleItems(timelineWidth) {
        let additionalTopOffset = 0;
        if (this.crewChiefs && this.crewChiefs.length > 0 && this.startDate && this.endDate) {            
            for (var crewChief of this.crewChiefs) {
                this.removeOutOfRangeScheduleItems(crewChief);
                this.adjustScheduleItemDates(crewChief);
                this.sortScheduleItems(crewChief);
                this.generateSwimlanes(crewChief);
                additionalTopOffset = this.generateScheduleItemHtml(crewChief, additionalTopOffset);
                additionalTopOffset = this.generateCrewChiefDivider(additionalTopOffset, timelineWidth);
                crewChief.height = (crewChief.height + 9) + "px;";
            }
        }
        return additionalTopOffset;
    }

    removeOutOfRangeScheduleItems(crewChief) {
        let startDate = new Date(this.startDate);
        if (startDate.getHours() != 0) {
            this.setUtcAdjustedDate(startDate);
        }
        let endDate = new Date(this.endDate);
        if (endDate.getHours() != 0) {
            this.setUtcAdjustedDate(endDate);
        }        
        if (crewChief.scheduleItems && crewChief.scheduleItems.length > 0) {
            let deletionList = new Array();
            for (var i = 0; i < crewChief.scheduleItems.length; i++) {
                let currentStartDate = new Date(crewChief.scheduleItems[i].startDate);
                if (currentStartDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentStartDate);
                }
                let currentEndDate = new Date(crewChief.scheduleItems[i].endDate);
                if (currentEndDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentEndDate);
                }
                if (currentEndDate < startDate) { // Job ends before start of timeline range
                    deletionList.push(crewChief.scheduleItems[i]);
                }
                if (currentStartDate > endDate) { // Job starts after end of timeline range
                    deletionList.push(crewChief.scheduleItems[i]);
                }
            }
            for (var i = 0; i < deletionList.length; i++) {
                var indexToDelete = crewChief.scheduleItems.indexOf(deletionList[i]);
                crewChief.scheduleItems.splice(indexToDelete, 1);
            }
        }
    }

    adjustScheduleItemDates(crewChief) {
        let startDate = new Date(this.startDate);
        let endDate = new Date(this.endDate);
        if (crewChief.scheduleItems && crewChief.scheduleItems.length > 0) {
            for (var scheduleItem of crewChief.scheduleItems) {
                let currentStartDate = new Date(scheduleItem.startDate);
                if (currentStartDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentStartDate);
                }
                let currentEndDate = new Date(scheduleItem.endDate);
                if (currentEndDate.getHours() != 0) {
                    this.setUtcAdjustedDate(currentEndDate);
                }
                scheduleItem.originalStartDate = scheduleItem.startDate;
                scheduleItem.originalEndDate = scheduleItem.endDate;
                if (currentStartDate < startDate) {
                    scheduleItem.startDate = this.startDate;
                }
                if (currentEndDate > endDate) {
                    scheduleItem.endDate = this.endDate;
                }
            }
        }
    }

    sortScheduleItems(crewChief) {
        crewChief.scheduleItems.sort(
            (a, b) => {
                return (new Date(a.startDate)) - (new Date(b.startDate));
            });              
    }

    generateSwimlanes(crewChief) {        
        if (crewChief.scheduleItems && crewChief.scheduleItems.length > 0) {
            let clonedScheduleItemsArray = JSON.parse(JSON.stringify(crewChief.scheduleItems));
            crewChief.swimlanes = new Array();
            while (clonedScheduleItemsArray.length > 0) {
                let previousScheduleItem = null;
                let currentScheduleItem = null;
                let previousScheduleEndDate = null;
                let currentScheduleItemStartDate = null;
                let currentSwimlane = new Array();
                let deletionList = new Array();
                for (var i = 0; i < clonedScheduleItemsArray.length; i++) {
                    currentScheduleItem = clonedScheduleItemsArray[i];
                    if (!previousScheduleItem) {
                        previousScheduleItem = currentScheduleItem;
                    }
                    if (previousScheduleItem.id === currentScheduleItem.id) {
                        currentSwimlane.push(currentScheduleItem);
                        deletionList.push(currentScheduleItem);
                    } else {
                        previousJobEndDate = new Date(previousScheduleItem.endDate);
                        if (previousJobEndDate.getHours() != 0) {
                            this.setUtcAdjustedDate(previousJobEndDate);
                        }
                        currentJobStartDate = new Date(currentScheduleItem.startDate);
                        if (currentJobStartDate.getHours() != 0) {
                            this.setUtcAdjustedDate(currentJobStartDate);
                        }
                        if (currentJobStartDate > previousJobEndDate) {
                            currentSwimlane.push(currentScheduleItem);
                            deletionList.push(currentScheduleItem);
                            previousScheduleItem = currentScheduleItem;
                        }                        
                    }
                }
                for (var i = 0; i < deletionList.length; i++) {
                    var indexToDelete = clonedScheduleItemsArray.indexOf(deletionList[i]);
                    clonedScheduleItemsArray.splice(indexToDelete, 1);
                }                
                crewChief.swimlanes.push(currentSwimlane);
            }
        }
    }

    generateScheduleItemHtml(crewChief, additionalTopOffset) {        
        const STARTING_TOP_OFFSET = 90;        
        const SCHEDULE_ITEM_HEIGHT = 24;
        const SCHEDULE_ITEM_TOP_MARGIN = 10;
        let currentScheduleItem = null;
        let crewChiefHeight = 0;
        let topOffset = STARTING_TOP_OFFSET + additionalTopOffset;
        if (crewChief.swimlanes && crewChief.swimlanes.length > 0) {
            for (var swimlane of crewChief.swimlanes) {
                for (var i = 0; i < swimlane.length; i++) {
                    currentScheduleItem = swimlane[i];
                    currentScheduleItem.crewChief = crewChief.id;
                    currentScheduleItem.color = currentScheduleItem.projectManagerColor;
                    currentScheduleItem.scheduleItem = currentScheduleItem.id;
                    currentScheduleItem.top = topOffset;
                    currentScheduleItem.left = this.calculateLeftOffset(currentScheduleItem);
                    currentScheduleItem.width = this.calculateWidth(currentScheduleItem);
                    this.generateHtml(currentScheduleItem);
                }
                topOffset = topOffset + SCHEDULE_ITEM_TOP_MARGIN + SCHEDULE_ITEM_HEIGHT;
                crewChiefHeight = crewChiefHeight + SCHEDULE_ITEM_TOP_MARGIN + SCHEDULE_ITEM_HEIGHT;
            }            
        }
        if (crewChiefHeight == 0) {
            crewChiefHeight = 34;
        }
        crewChief.height = crewChiefHeight;
        if (topOffset == (STARTING_TOP_OFFSET + additionalTopOffset)) {
            topOffset = topOffset + 34;
        }
        return (topOffset - STARTING_TOP_OFFSET);
    }

    calculateLeftOffset(job) {
        const MILLISECONDS_IN_DAY = 86400000;
        let timeSpanStart = new Date(this.startDate);
        if (timeSpanStart.getHours() != 0) {
            this.setUtcAdjustedDate(timeSpanStart);
        }
        let jobStartDate = new Date(job.startDate);
        if (jobStartDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobStartDate)
        }        
        let leftOffsetDays = Math.round((jobStartDate - timeSpanStart) / MILLISECONDS_IN_DAY);
        return (leftOffsetDays * this.dayWidth);
    }

    calculateWidth(scheduleItem) {
        const MILLISECONDS_IN_DAY = 86400000;
        let jobStartDate = new Date(scheduleItem.startDate);
        if (jobStartDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobStartDate);
        }
        let jobEndDate = new Date(scheduleItem.endDate);
        if (jobEndDate.getHours() != 0) {
            this.setUtcAdjustedDate(jobEndDate);
        }        
        // Adjust end date so that the full day is included in the width calculation
        jobEndDate.setDate(jobEndDate.getDate() + 1);
        let lengthInDays = Math.round((jobEndDate - jobStartDate) / MILLISECONDS_IN_DAY);
        return (lengthInDays * this.dayWidth);
    }

    generateHtml(scheduleItem) {
        let newJobContainer = document.createElement('div');
        newJobContainer.classList = "jobContainer";
        newJobContainer.style.top = scheduleItem.top.toString() + "px";
        newJobContainer.style.left = scheduleItem.left.toString() + "px";
        newJobContainer.style.width = scheduleItem.width.toString() + "px";
        let newJob = document.createElement('div');
        let crewAttr = document.createAttribute('crewChief');
        crewAttr.value = scheduleItem.employeeId;
        newJob.setAttributeNode(crewAttr);
        let scheduleItemAttr = document.createAttribute('scheduleItem');
        scheduleItemAttr.value = scheduleItem.id;
        newJob.setAttributeNode(scheduleItemAttr);
        newJob.style.backgroundColor = scheduleItem.color;
        newJob.style.width = scheduleItem.width.toString() + "px";        
        newJob.classList = "job";
        newJob.addEventListener("click", this._jobClick);
        newJob.innerHTML = scheduleItem.projectNumber;
        newJob.context = this;
        newJobContainer.appendChild(newJob);
        this.generateScheduleItemTooltip(scheduleItem, newJobContainer);
        this.$.jobContainer.appendChild(newJobContainer);
    }

    generateScheduleItemTooltip(scheduleItem, newJobContainer) {
        scheduleItem.startDate = scheduleItem.startDate.split('T')[0];
        if (scheduleItem.startDate === this.startDate) {
            let newTooltip = document.createElement('span');
            newTooltip.classList = "tooltiptext tooltiptext-left-align";
            newTooltip.innerHTML = scheduleItem.projectNumber;
            newJobContainer.appendChild(newTooltip);
        } else if (scheduleItem.endDate === this.endDate) {
            let newTooltip = document.createElement('span');
            newTooltip.classList = "tooltiptext tooltiptext-right-align";
            newTooltip.innerHTML = scheduleItem.projectNumber;
            newJobContainer.appendChild(newTooltip);
        } else {
            let newTooltip = document.createElement('span');
            newTooltip.classList = "tooltiptext tooltiptext-center-align";
            newTooltip.innerHTML = scheduleItem.projectNumber;
            newJobContainer.appendChild(newTooltip);
        }         
    }

    generateCrewChiefDivider(additionalTopOffset, timelineWidth) {
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