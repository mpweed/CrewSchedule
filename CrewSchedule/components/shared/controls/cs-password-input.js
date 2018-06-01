import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsPasswordInput extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .inputField {                
                    width: 100%;
                }

                .internalInput {
                    font-family: 'Roboto', 'Noto', sans-serif;
                    -webkit-font-smoothing: antialiased;
                    text-rendering: optimizeLegibility;
                    font-weight: 200;
                    font-size: .9em;
                    height: 26px;
                    width: calc(100% - 44px);
                    padding-left: 20px;
                    padding-right: 20px;
                    border: none;
                    border: 1px solid var(--paper-grey-900);
                    color: #ffffff;
                    background-color: var(--paper-grey-900);
                    outline: 0;
                }

                .internalInputLight {
                    border-color: var(--paper-grey-800);
                    background-color: var(--paper-grey-800);
                }

                .internalInput:focus {
                    border: 1px solid #ffffff
                }

                .internalInputLight:focus {
                    border: 1px solid #ffffff
                }

                .counterField {
                    width: 100%;
                    font-size: .8em;
                }

                .counter {
                    margin-right: 14px;
                }

                .requiredIndicator {
                    border-bottom: 2px solid red;
                }

                .disabled {
                    color: var(--paper-grey-500);
                }
            </style>
            <div class="inputField">
                <input tabindex="1" id="internalInput" type="text" placeholder="[[placeholder]]" value="{{value::input}}" class="internalInput" on-blur="_checkRequired" />
                <template is="dom-if" if="[[characterCounter]]">
                    <div class="horizontal end-justified layout counterField">
                        <div class="counter">[[counter]]</div>
                    </div>
                </template>
            </div>
            `;
    }

    // Public Properties
    static get properties() {
        return {
            placeholder: {
                type: String
            },
            value: {
                type: String,
                notify: true,
                observer: "_valueChanged"
            },
            characterCounter: {
                type: Boolean
            },
            maxLength: {
                type: Number,
                observer: "_maxLengthChanged"
            },
            counter: {
                type: String
            },
            required: {
                type: Boolean,
                observer: "_requiredChanged"
            },
            isValid: {
                type: Boolean,
                observer: "_isValidChanged"
            },
            disabled: {
                type: Boolean,
                observer: "_disabledChanged"
            },
            light: {
                type: Boolean,
                value: false,
                observer: "_lightChanged"
            },
            inputType: {
                type: String,
                observer: "_inputTypeChanged"
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this._valueChanged(this.value);
        this.isValid = true;        
    }

    _requiredChanged(newValue, oldValue) {
        if (this.required) {
            this.isValid = false;
        }
        this.$.internalInput.classList.remove("requiredIndicator");
    }

    _valueChanged(newValue, oldValue) {
        if (newValue) {
            // Hold to max length if set
            if (this.maxLength) {
                if (newValue.length <= Math.abs(this.maxLength)) {
                    this.counter = newValue.length.toString() + "/" + Math.abs(this.maxLength).toString();
                } else {
                    this.value = oldValue;
                    return;
                }
            } else {
                if (this.characterCounter) {
                    this.counter = newValue.length.toString();
                }
            }
        } else {
            if (this.maxLength) {
                this.counter = "0" + "/" + Math.abs(this.maxLength).toString();
            } else {
                if (this.characterCounter) {
                    this.counter = "0";
                }
            }
        }
        this._checkRequired(null);
    }

    _lightChanged(newValue, oldValue) {
        if (newValue) {
            this.$.internalInput.classList.add("internalInputLight");
        } else {
            this.$.internalInput.classList.remove("internalInputLight");
        }
    }

    _maxLengthChanged(newValue, oldValue) {
        if (newValue) {
            this.characterCounter = true;
        }
    }

    _inputTypeChanged(newValue, oldValue) {
        if (newValue) {
            switch (newValue) {
                case "Phone":
                    this.placeholder = "XXX.XXX.XXXX";
                    break;
            }
        }
    }

    _isValidChanged(newValue, oldValue) {
        if (this.isValid) {
            this.$.internalInput.classList.remove("requiredIndicator");
            this.dispatchEvent(new CustomEvent('validation', { bubbles: true, composed: true, detail: { id: this.id, state: "valid" } }));
        } else {
            this.$.internalInput.classList.add("requiredIndicator");
            this.dispatchEvent(new CustomEvent('validation', { bubbles: true, composed: true, detail: { id: this.id, state: "invalid" } }));
        }
    }

    _checkRequired(e) {
        if (this.required) {
            if (!this.value) {
                this.isValid = !this.isValid;
                this.isValid = false;
            } else if (this.inputType) {
                switch (this.inputType) {
                    case "Phone":
                        this.isValid = !this.isValid;
                        this.isValid = this._isInputValid();
                        break;
                }
            } else {
                this.isValid = !this.isValid;
                this.isValid = true;
            }
        } else if (this.inputType && this.value) {
            switch (this.inputType) {
                case "Phone":
                    this.isValid = !this.isValid;
                    this.isValid = this._isInputValid();
                    break;
            }
        } else {
            this.isValid = !this.isValid;
            this.isValid = true;
        }
    }

    _isInputValid(input) {
        switch (this.inputType) {
            case "Phone":
                var re = /[2-9]{1}\d{2}\.[2-9]{1}\d{2}\.\d{4}/;
                return re.test(this.value);
                break;
        }
    }

    _disabledChanged(newValue, oldValue) {
        if (newValue) {
            this.$.internalInput.disabled = true;
            this.$.internalInput.classList.add("disabled");
        } else {
            this.$.internalInput.disabled = false;
            this.$.internalInput.classList.remove("disabled");
        }
    }

    //Public Methods
    reset() {
        this.value = "";
        this.$.internalInput.classList.remove("requiredIndicator");
    }    
}
customElements.define('cs-password-input', CsPasswordInput);