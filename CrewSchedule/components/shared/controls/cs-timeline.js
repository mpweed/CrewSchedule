import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment">
                .timelineContainer {
                    height: 300px;
                    width: 600px;
                }

                .dayHeader {
                    border: 1px solid var(--paper-grey-600);
                }

                .day {
                    border: 1px solid var(--paper-grey-600);
                    background-color: var(--paper-grey-600);
                }
        
                .weekend {
                    border: 1px solid var(--paper-grey-600);
                    background-color: var(--paper-grey-700);
                }
            </style>
            <div class="timelineContainer>
                <div class="vertical layout flex">
                    <div class="dayHeader">
                        <div>Mon</div>
                        <div>14</div>
                    </div>
                    <div class="day flex"></div>
                </div>
            </div>
            `;
    }

    // Public Properties
    static get properties() {
        return {
            timelineArray: {
                type: Array
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.generateTimeSpan();
    }

    // Event Handlers

    generateTimeSpan() {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        Date.prototype.getMonthName = function () {
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            return days[this.getDay()];
        };
        var timeSpanStart = new Date('05/14/2018');
        var timeSpanEnd = new Date('05/21/2018');
        var timeSpanStartDay = timeSpanStart.getDayName();
        var timeSpanStartMonth = timeSpanStart.getMonthName();
    }

}
customElements.define('cs-timeline', CsTimeline);