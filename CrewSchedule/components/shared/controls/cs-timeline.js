import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsTimeline extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment">
                .timelineContainer {
                    width: 600px;
                    height: 300px;                    
                }

                .dayContainer {
                    width: 34px;
                    height: 600px;
                }

                .monthHeader {
                    border: 1px solid var(--paper-red-600);
                    border-right: 1px solid var(--paper-grey-800);
                    background-color: var(--paper-red-600);
                }

                .dayHeader {
                    width: 34px;
                    border-right: 1px solid var(--paper-grey-800);
                    border-bottom: 1px solid var(--paper-grey-600);
                    text-align: center;
                    font-size: .8em;
                }

                .day {
                    width: 34px;                    
                    border-right: 1px solid var(--paper-grey-800);
                }
        
                .weekend {
                    background-color: var(--paper-grey-800);
                }                
            </style>
            
            <div class="horizontal layout">
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Mon</div>
                        <div>14</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Tue</div>
                        <div>15</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Wed</div>
                        <div>16</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Thu</div>
                        <div>17</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Fri</div>
                        <div>18</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader weekend">
                        <div class="monthHeader">MAY</div>
                        <div>Sat</div>
                        <div>19</div>
                    </div>
                    <div class="flex day weekend"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader weekend">
                        <div class="monthHeader">MAY</div>
                        <div>Sun</div>
                        <div>20</div>
                    </div>
                    <div class="flex day weekend"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Mon</div>
                        <div>21</div>
                    </div>
                    <div class="flex day"></div>
                </div>
                <div class="vertical layout dayContainer">
                    <div class="dayHeader">
                        <div class="monthHeader">MAY</div>
                        <div>Tue</div>
                        <div>22</div>
                    </div>
                    <div class="flex day"></div>
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