import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment">
                .datepickerPanel {
                    background-color: var(--paper-grey-200);
                }

                .timelineContainer {
                    width: 800px;
                    height: 600px;
                    overflow: auto;
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
                    border: 1px solid var(--paper-amber-400);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-amber-100);
                    color: var(--paper-grey-900);
                }

                .alternateYearHeader {
                    border: 1px solid var(--paper-orange-200);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-orange-200);
                    color: var(--paper-grey-900);
                }

                .monthHeader {
                    border: 1px solid var(--paper-red-300); 
                    border-right: 1px solid var(--paper-grey-800);                                       
                    background-color: var(--paper-red-300);                    
                }

                .alternateMonthHeader {
                    border: 1px solid var(--paper-red-600);
                    border-right: 1px solid var(--paper-grey-800);                                        
                    background-color: var(--paper-red-600);
                }

                .day {
                    width: 34px;                    
                    border-right: 1px solid var(--paper-grey-800);
                }
        
                .weekend {
                    background-color: var(--paper-grey-800);
                }

                .scroll::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }

                .scroll::-webkit-scrollbar-thumb {
                    background-color: #616161;
                    border-radius: 20px;
                }

                .scroll::-webkit-scrollbar-track {
                    background-color: #424242;
                }

                .scroll::-webkit-scrollbar-thumb:hover {
                    background-color: #757575;
                }

                .scroll::-webkit-scrollbar-corner {
                    background-color: #424242;
                }
            </style>
            <div class="horizontal layout datepickerPanel">
                <vaadin-date-picker value="{{startDate}}"></vaadin-date-picker>
                <vaadin-date-picker value="{{endDate}}"></vaadin-date-picker>
            </div>
            <div class="timelineContainer scroll">
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
            </div>
            `;
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
            }
        }
    }

    // Lifecycle Callbacks
    constructor() {
        super();        
    }

    ready() {
        super.ready();       
    }

    connectedCallback() {
        super.connectedCallback();
        Date.prototype.getMonthName = function () {
            let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[this.getDay()];
        };
        let today = new Date(Date.now());
        let start = today.toLocaleDateString();
        this.startDate = start;
        let endDt = new Date(today.setDate(today.getDate() + 31));
        let end = endDt.toLocaleDateString();
        this.endDate = end;
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

    generateTimeSpan() {
        this.timelineArray = new Array();
        //let timeSpanStart = new Date('12/11/2018');
        //let timeSpanEnd = new Date('03/23/2019');
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
        

    }

}
customElements.define('cs-timeline', CsTimeline);