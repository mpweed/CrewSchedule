import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
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
            </style>
            <div id="companyOfficePanel" class="horizontal layout companyOfficePanel">
                <paper-icon-button id="zoomIn" icon="zoom-in" class="actionButton" on-tap="_zoomInClick"></paper-icon-button>
                <div class="dataLabel horizontalDataLabel companyLabel">Company</div>
                <div class="horizontalDataField companyField">
                    <cs-dropdown light items="{{companies}}" label-field="name" selected="{{selectedCompany}}"></cs-dropdown>
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
                <paper-icon-button id="zoomOut" icon="zoom-out" class="actionButton" disabled on-tap="_zoomOutClick"></paper-icon-button>
                <div class="dataLabel horizontalDataLabel startDateLabel">Start Date</div>
                <div class="horizontalDataField">
                    <vaadin-date-picker value="{{startDate}}"></vaadin-date-picker>
                </div>
                <div class="dataLabel horizontalDataLabel">End Date</div>
                <div class="horizontalDataFieldSmallMargin">
                    <vaadin-date-picker value="{{endDate}}"></vaadin-date-picker>
                </div>
                <!--<div id="endDateErrorMessage" class="endDateErrorMessage hidden">End Date must be greater than Start Date</div>-->
                <div class="horizontal layout flex end-justified">
                    <paper-icon-button id="filterCrews" icon="filter-list" class="actionButton" on-tap="_filterCrewsClick"></paper-icon-button>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            bootstrapData: {
                type: Object,
                notify: true,
                observer: "bootstrapDataChanged"
            },
            crews: {
                type: Array,
                notify: true
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
    _bootstrapDataChanged(newValue, oldValue) {
        this.crews = null;
        if (this.bootstrapData && this.bootstrapData.crews) {
            this.crews = this.bootstrapData.crews;
        }
    }


    // Public Methods
      
}
customElements.define('cs-parameter-panel', CsParameterPanel);