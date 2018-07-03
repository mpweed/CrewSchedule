import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsAccordion extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .accordionHeader {
                    margin-top: 20px;
                    border-top: 1px solid var(--paper-grey-800);
                    border-bottom: 1px solid var(--paper-grey-800);
                }

                .accordionCaption {
                    margin-top: 5px;
                    font-weight: 200;
                    font-size: 1.2em;
                    color: var(--paper-lime-300);
                }

                paper-icon-button {
                    color: var(--paper-grey-700);
                }

                paper-icon-button:hover {
                    color: #ffffff;
                }

                .collapsable {
                    overflow: hidden;                    
                }

                .collapsed {
                    height: 0px;
                    min-height: 0px;
                }
            </style>
            <div class="accordionHeader horizontal layout flex">
                <div class="accordionCaption flex">
                    [[caption]]
                </div>
                <paper-icon-button icon="[[accordionIcon]]" on-tap="_toggleAccordion"></paper-icon-button>
            </div>
            <div id="collapsableSection" class="collapsable collapsed">
                <slot></slot>
            </div>
            `;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            caption: {
                type: String
            },
            isAccordionVisible: {
                type: Boolean,
                value: false,
                observer: "_isAccordionVisibleChanged"
            },
            /** Private **/            
            accordionIcon: {
                type: String,
                value: "expand-more"
            }
        }
    }

    // Event Handlers
    _toggleAccordion(e) {
        this.isAccordionVisible = !this.isAccordionVisible;
    }

    _isAccordionVisibleChanged(newValue, oldValue) {
        if (newValue) {
            this.$.collapsableSection.classList.remove("collapsed");
            this.accordionIcon = "expand-less";
        } else {
            this.$.collapsableSection.classList.add("collapsed");
            this.accordionIcon = "expand-more";
        }
    }    
}
customElements.define('cs-accordion', CsAccordion);