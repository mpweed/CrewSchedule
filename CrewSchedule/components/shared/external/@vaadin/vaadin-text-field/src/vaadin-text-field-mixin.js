/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import '../../vaadin-themable-mixin/vaadin-themable-mixin.js';

import { ControlStateMixin } from '../../vaadin-control-state-mixin/vaadin-control-state-mixin.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="vaadin-text-field-shared-styles">
  <template>
    <style>
      :host {
        display: inline-flex;
        outline: none;
      }

      :host::before {
        content: "\\2003";
        width: 0;
        display: inline-block;
        /* Size and position this element on the same vertical position as the input-field element
           to make vertical align for the host element work as expected */
      }

      :host([hidden]) {
        display: none !important;
      }

      .vaadin-text-field-container,
      .vaadin-text-area-container {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        max-width: 100%;
        width: var(--vaadin-text-field-default-width, 12em);
      }

      [part="label"]:empty {
        display: none;
      }

      [part="input-field"] {
        display: flex;
        align-items: center;
        flex: auto;
      }

      /* Reset the native input styles */
      [part="value"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 0;
        font: inherit;
        font-size: 1em;
        line-height: normal;
        color: inherit;
        background-color: transparent;
        /* Disable default invalid style in Firefox */
        box-shadow: none;
      }

      [part="input-field"] ::slotted(*) {
        flex: none;
      }

      /* Slotted by vaadin-dropdown-menu-text-field */
      [part="value"],
      [part="input-field"] ::slotted([part="value"]) {
        flex: auto;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      [part="value"]::-ms-clear {
        display: none;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
 * @polymerMixin
 * @mixes Vaadin.ControlStateMixin
 */
export const TextFieldMixin = subclass => class VaadinTextFieldMixin extends ControlStateMixin(subclass) {
  static get properties() {
    return {
      /**
       * Whether the value of the control can be automatically completed by the browser.
       * List of available options at:
       * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete
       */
      autocomplete: {
        type: String
      },

      /**
       * This is a property supported by Safari that is used to control whether
       * autocorrection should be enabled when the user is entering/editing the text.
       * Possible values are:
       * on: Enable autocorrection.
       * off: Disable autocorrection.
       */
      autocorrect: {
        type: String
      },

      /**
       * This is a property supported by Safari and Chrome that is used to control whether
       * autocapitalization should be enabled when the user is entering/editing the text.
       * Possible values are:
       * characters: Characters capitalization.
       * words: Words capitalization.
       * sentences: Sentences capitalization.
       * none: No capitalization.
       */
      autocapitalize: {
        type: String
      },

      /**
       * Error to show when the input value is invalid.
       */
      errorMessage: {
        type: String,
        value: ''
      },

      /**
       * String used for the label element.
       */
      label: {
        type: String,
        value: '',
        observer: '_labelChanged'
      },

      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },

      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      },

      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },

      /**
       * A hint to the user of what can be entered in the control.
       */
      placeholder: {
        type: String
      },

      /**
       * This attribute indicates that the user cannot modify the value of the control.
       */
      readonly: {
        type: Boolean,
        reflectToAttribute: true
      },

      /**
       * Specifies that the user must fill in a value.
       */
      required: {
        type: Boolean,
        reflectToAttribute: true
      },


      /**
       * The initial value of the control.
       * It can be used for two-way data binding.
       */
      value: {
        type: String,
        value: '',
        observer: '_valueChanged',
        notify: true
      },

      /**
       * This property is set to true when the control value is invalid.
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },

      /**
       * When set to true, user is prevented from typing a value that
       * conflicts with the given `pattern`.
       */
      preventInvalidInput: {
        type: Boolean
      },

      _labelId: {
        type: String
      },

      _errorId: {
        type: String
      }
    };
  }

  get focusElement() {
    return this.root.querySelector('[part=value]');
  }

  _onInput(e) {
    if (this.preventInvalidInput) {
      const input = this.focusElement;
      if (input.value.length > 0 && !this.checkValidity()) {
        input.value = this.value || '';
      }
    }
  }

  _onChange(e) {
    // In the Shadow DOM, the `change` event is not leaked into the
    // ancestor tree, so we must do this manually.
    const changeEvent = new CustomEvent('change', {
      detail: {
        sourceEvent: e
      },
      bubbles: e.bubbles,
      cancelable: e.cancelable,
    });
    this.dispatchEvent(changeEvent);
  }

  _valueChanged(newVal, oldVal) {
    // setting initial value to empty string, skip validation
    if (newVal === '' && oldVal === undefined) {
      return;
    }
    if (this.invalid) {
      this.validate();
    }
    if (newVal !== '' && newVal != null) {
      this.setAttribute('has-value', '');
    } else {
      this.removeAttribute('has-value');
    }
  }

  _labelChanged(label) {
    if (label !== '' && label != null) {
      this.setAttribute('has-label', '');
    } else {
      this.removeAttribute('has-label');
    }
  }

  /**
   * Returns true if the current input value satisfies all constraints (if any)
   * @returns {boolean}
   */
  checkValidity() {
    if (this.required || this.pattern || this.maxlength || this.minlength) {
      return this.focusElement.checkValidity();
    } else {
      return !this.invalid;
    }
  }


  ready() {
    super.ready();
    if (!(window.ShadyCSS && window.ShadyCSS.nativeCss)) {
      this.updateStyles();
    }

    var uniqueId = TextFieldMixin._uniqueId = 1 + TextFieldMixin._uniqueId || 0;
    this._errorId = `${this.constructor.is}-error-${uniqueId}`;
    this._labelId = `${this.constructor.is}-label-${uniqueId}`;

    if (navigator.userAgent.match(/Trident/)) {
      this._addIEListeners();
    }
  }

  /**
   * Returns true if `value` is valid.
   * `<iron-form>` uses this to check the validity or all its elements.
   *
   * @return {boolean} True if the value is valid.
   */
  validate() {
    return !(this.invalid = !this.checkValidity());
  }

  _addIEListeners() {
    // IE11 dispatches `input` event in following cases:
    // - focus or blur, when placeholder attribute is set
    // - placeholder attribute value changed
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101220/
    const prevent = e => {
      e.stopImmediatePropagation();
      this.focusElement.removeEventListener('input', prevent);
    };
    const shouldPreventInput = () => this.placeholder && this.focusElement.addEventListener('input', prevent);
    this.focusElement.addEventListener('focusin', shouldPreventInput);
    this.focusElement.addEventListener('focusout', shouldPreventInput);
    this._createPropertyObserver('placeholder', shouldPreventInput);
  }

  _getActiveErrorId(invalid, errorMessage, errorId) {
    return errorMessage && invalid ? errorId : undefined;
  }

  _getActiveLabelId(label, labelId) {
    return label ? labelId : undefined;
  }

  _getErrorMessageAriaHidden(invalid, errorMessage, errorId) {
    return (!this._getActiveErrorId(invalid, errorMessage, errorId)).toString();
  }

  /**
   * @protected
   */
  attributeChangedCallback(prop, oldVal, newVal) {
    super.attributeChangedCallback(prop, oldVal, newVal);
    // Needed until Edge has CSS Custom Properties (present in Edge Preview)
    if (!(window.ShadyCSS && window.ShadyCSS.nativeCss) &&
      /^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(prop)) {
      this.updateStyles();
    }

    // Safari has an issue with repainting shadow root element styles when a host attribute changes.
    // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && this.root) {
      const WEBKIT_PROPERTY = '-webkit-backface-visibility';
      this.root.querySelectorAll('*').forEach(el => {
        el.style[WEBKIT_PROPERTY] = 'visible';
        el.style[WEBKIT_PROPERTY] = '';
      });
    }
  }

  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
};
