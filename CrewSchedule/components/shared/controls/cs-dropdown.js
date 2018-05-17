import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsDropdown extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                :host {
                    overflow: auto;
                }

                .dropdownBody {
                    position: relative; /* Enable absolute positioning for children and pseudo elements */
                    height: 26px;
                    padding-top: 2px;
                    padding-left: 20px;
                    padding-right: 46px;
                    border: 1px solid var(--paper-grey-900);
                    color: #ffffff;
                    background-color: var(--paper-grey-900);
                    outline: 0;
                    cursor: pointer;
                }

                .dropdownBody:focus {
                    border: 1px solid #ffffff
                }

                .dropdownBody:after {
                    content: "";
                    width: 0;
                    height: 0;
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    margin-top: -3px;
                    border-width: 6px 6px 0 6px;
                    border-style: solid;
                    border-color: grey transparent;
                }

                .dropdownBody .dropdown {
                    position: absolute;
                    max-height: 100px;
                    top: 100%;
                    left: 0px;
                    right: 0px;
                    border: 1px solid var(--paper-grey-600);
                    -webkit-padding-start: 0px;
                    -webkit-margin-before: 0px;
                    margin-left: 10px;
                    margin-right: 10px;
                    padding-left: 10px;
                    padding-right: 10px;
                    background-color: var(--paper-grey-900);
                    transition: all 0.3s ease-out;
                    font-weight: 200;
                    font-size: .9em;
                    overflow: auto;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 150;
                }

                    .dropdownBody .dropdown li {
                        display: block;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        min-height: 21px;
                        text-decoration: none;
                        color: #ffffff;
                        transition: all 0.3s ease-out;
                    }                        

                        /* Hover state */
                        .dropdownBody .dropdown li:hover {
                            background-color: var(--paper-grey-800);
                        }

                .dropdownBody.active .dropdown {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                .dropdownCaption {                    
                    font-weight: 200;
                    font-size: .9em;
                    margin-top: 2px;
                    display: block;
                    height: 18px;
                    overflow: hidden;
                }

                .dropdownBodyLight {
                    border-color: var(--paper-grey-800);
                    background-color: var(--paper-grey-800);
                }

                .disabled {
                    color: var(--paper-grey-500);
                    pointer-events: none;
                }
            </style>
            <div tabindex="1" id="dropdownBody" class="dropdownBody" on-click="_showDropdown">
                <span id="dropdownCaption" class="dropdownCaption">[[labelValue]]</span>
                <ul id="dropdown" class="dropdown scroll">
                    <template is="dom-repeat" items="[[internalItems]]">
                        <li on-click="_updateSelection">[[item.label]]</li>
                    </template>
                </ul>
            </div>
            `;
    }

    constructor() {
        super();
        this._boundListener = this._closeDropdown.bind(this);
    }

    // Public Properties
    static get properties() {
        return {
            items: {
                type: Array,
                observer: "_updateInternalItems"
            },
            internalItems: {
                type: Array
            },
            labelField: {
                type: String,
                observer: "_updateInternalItems"
            },
            labelValue: {
                type: String
            },
            selected: {
                type: Object,
                notify: true,
                observer: "_selectedChanged"
            },
            disabled: {
                type: Boolean,
                observer: "_disabledChanged"
            },
            light: {
                type: Boolean,
                value: false,
                observer: "_lightChanged"
            }
        }
    }

    // Lifecycle Callbacks           
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("click", this._boundListener);
    }

    disconnectedCallback() {
        document.removeEventListener("click", this._boundListener);
    }

    // Event Handlers
    _updateInternalItems() {
        if (this.items != undefined && this.items != null && this.items.length > 0) {
            this.internalItems = new Array();
            if (this.labelField != undefined && this.labelField != null && this.labelField.trim() != "") {
                // A label field has been defined. So attempt to use it for populating the dropdown internal list
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i];
                    if (Object.keys(item).length > 0) {
                        // Add label field value of item to dropdown internal items list
                        let labelProp = item[this.labelField];
                        if (labelProp) {
                            this.push("internalItems", { "label": item[this.labelField] });
                        }
                    }
                }
            } else {
                // A label field has not been set. So attempt to use the item literal for populating the dropdown internal list
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i];
                    if (item) {
                        this.push("internalItems", { "label": item });
                    }
                }
            }
            if (!this.selected) {
                this.selected = this.items[0];
            }
        } else {
            this.internalItems = null;
            this.selected = null;
        }
    }

    _lightChanged(newValue, oldValue) {
        if (newValue) {
            this.$.dropdownBody.classList.add("dropdownBodyLight");
        } else {
            this.$.dropdownBody.classList.remove("dropdownBodyLight");
        }
    }

    _selectedChanged(newValue, oldValue) {
        if (newValue) {
            if (this.labelField != undefined && this.labelField != null && this.labelField.trim() != "") {
                this.labelValue = newValue[this.labelField];
            } else {
                this.labelValue = newValue;
            }
        } else {
            this.labelValue = "";
        }
    }

    _showDropdown(e) {
        // Don't propogate the event to the document
        if (e.stopPropagation) {
            e.stopPropagation();   // W3C model
        } else {
            e.cancelBubble = true; // IE model
        }
        this.$.dropdownBody.classList.add("active")
    }

    _updateSelection(e) {
        this.selected = this.findSelectedItem(e.model.item);
        this.$.dropdownBody.classList.remove("active");
        // Don't propogate the event to the document
        if (e.stopPropagation) {
            e.stopPropagation();   // W3C model
        } else {
            e.cancelBubble = true; // IE model
        }
    }

    _closeDropdown(e) {
        this.$.dropdownBody.classList.remove("active");
    }

    _disabledChanged(newValue, oldValue) {
        if (newValue) {
            this.$.dropdownBody.classList.add("disabled");
        } else {
            this.$.dropdownBody.classList.remove("disabled");
        }
    }

    // Methods
    findSelectedItem(item) {
        let retval = null;
        if (this.labelField != undefined && this.labelField != null && this.labelField.trim() != "") {
            // A label field has been defined. So attempt to use it to find the selected item
            for (let i = 0; i < this.items.length; i++) {
                let externalItem = this.items[i];
                if (externalItem[this.labelField] == item.label) {
                    retval = externalItem;
                    break;
                }
            }
        } else {
            // A label field has not been set. So attempt to use the literal value to find the selected item
            for (let i = 0; i < this.items.length; i++) {
                let externalItem = this.items[i];
                if (externalItem == item.label) {
                    retval = externalItem;
                    break;
                }
            }
        }
        return retval;
    }    
}
customElements.define('cs-dropdown, CsDropdown);