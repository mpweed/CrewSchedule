import '../../../vaadin-lumo-styles/color.js';
import '../../../vaadin-lumo-styles/sizing.js';
import '../../../vaadin-lumo-styles/spacing.js';
import '../../../vaadin-lumo-styles/style.js';
import '../../../vaadin-lumo-styles/typography.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="lumo-month-calendar" theme-for="vaadin-month-calendar">
  <template>
    <style>
      :host {
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        font-size: var(--lumo-font-size-m);
        color: var(--lumo-body-text-color);
        text-align: center;
        padding: 0 var(--lumo-space-xs);
      }

      /* Month header */

      [part="month-header"] {
        color: var(--lumo-header-text-color);
        font-size: var(--lumo-font-size-l);
        line-height: 1;
        font-weight: 500;
        margin-bottom: var(--lumo-space-m);
      }

      /* Week days and numbers */

      [part="weekdays"],
      [part="weekday"],
      [part="week-numbers"] {
        font-size: var(--lumo-font-size-xs);
        line-height: 1;
        color: var(--lumo-tertiary-text-color);
      }

      [part="weekdays"] {
        margin-bottom: var(--lumo-space-s);
      }

      /* TODO should have part="week-number" for the cell in weekdays-container */
      [part="weekday"]:empty,
      [part="week-numbers"] {
        width: var(--lumo-size-xs);
      }

      /* Date and week number cells */

      [part="date"],
      [part="week-number"] {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: var(--lumo-size-m);
        position: relative;
      }

      [part="date"] {
        transition: color 0.1s;
      }

      /* Today date */

      [part="date"][today] {
        color: var(--lumo-primary-text-color);
      }

      /* Focused date */

      [part="date"]::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 2em;
        min-height: 2em;
        width: 80%;
        height: 80%;
        max-height: 100%;
        max-width: 100%;
        border-radius: var(--lumo-border-radius);
      }

      [part="date"][focused]::before {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      :host(:not([focused])) [part="date"][focused]::before {
        animation: vaadin-date-picker-month-calendar-focus-date 1.4s infinite;
      }

      @keyframes vaadin-date-picker-month-calendar-focus-date {
        50% {
          box-shadow: 0 0 0 2px transparent;
        }
      }

      /* TODO should not rely on the role attribute */
      [part="date"][role="button"]:not([disabled]):not([selected]):hover::before {
        background-color: var(--lumo-primary-color-10pct);
      }

      [part="date"][selected] {
        color: var(--lumo-primary-contrast-color);
      }

      [part="date"][selected]::before {
        background-color: var(--lumo-primary-color);
      }

      @media (pointer: coarse) {
        [part="date"]:hover:not([selected])::before,
        [part="date"][focused]:not([selected])::before {
          display: none;
        }

        [part="date"][role="button"]:not([disabled]):active::before {
          display: block;
        }

        [part="date"][selected]::before {
          box-shadow: none;
        }
      }

      /* Disabled */

      :host([disabled]) * {
        color: var(--lumo-disabled-text-color) !important;
      }


      /******** CS Style Overrides ********/
      	:host {
	        -moz-user-select: none;
	        -ms-user-select: none;
	        -webkit-user-select: none;
	        -webkit-tap-highlight-color: transparent;
	        user-select: none;
	        font-size: var(--lumo-font-size-m);
	        color: #ffb74d;
	        text-align: center;
	        padding: 0 var(--lumo-space-xs);
	      }
  
        	[part="month-header"] {
	        color: #ffb74d;
	        font-size: var(--lumo-font-size-l);
	        line-height: 1;
	        font-weight: 500;
	        margin-bottom: var(--lumo-space-m);
	        }

        [part="weekdays"],
	    [part="weekday"],
	    [part="week-numbers"] {
	        font-size: var(--lumo-font-size-xs);
	        line-height: 1;
	        color: #dce775;
	    }

        [part="date"][role="button"]:not([disabled]):not([selected]):hover::before {
	        background-color: #dce775;
	    }


        [part="date"][focused]::before {
	        box-shadow: 0 0 0 2px #dce775;
	    }

        [part="date"][selected]::before {
	        background-color: #dce775;
	    }

        [part="date"][today] {
		color: #dce775;
	    }

        [part="date"][selected] {
		color: #f57c00; /* paper-orange-700 */
	    }

    </style>
  </template>
</dom-module><custom-style>
  <style>
    @keyframes vaadin-date-picker-month-calendar-focus-date {
      50% {
        box-shadow: 0 0 0 2px transparent;
      }
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
