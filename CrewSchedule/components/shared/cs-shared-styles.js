// Polymer Imports
import './external/@polymer/polymer/lib/elements/array-selector.js';
import './external/@polymer/polymer/lib/elements/dom-if.js';
import './external/@polymer/polymer/lib/elements/dom-repeat.js';
import './external/@polymer/paper-styles/color.js';
import './external/@polymer/paper-styles/default-theme.js';
import './external/@polymer/paper-styles/shadow.js';
import './external/@polymer/paper-styles/typography.js';
import './external/@polymer/iron-flex-layout/iron-flex-layout.js';
import './external/@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import './external/@polymer/iron-icon/iron-icon.js';
import './external/@polymer/iron-icons/av-icons.js';
import './external/@polymer/iron-icons/communication-icons.js';
import './external/@polymer/iron-icons/device-icons.js';
import './external/@polymer/iron-icons/editor-icons.js';
import './external/@polymer/iron-icons/hardware-icons.js';
import './external/@polymer/iron-icons/image-icons.js';
import './external/@polymer/iron-icons/iron-icons.js';
import './external/@polymer/iron-icons/maps-icons.js';
import './external/@polymer/iron-icons/notification-icons.js';
import './external/@polymer/iron-icons/places-icons.js';
import './external/@polymer/iron-icons/social-icons.js';
import './external/@polymer/paper-icon-button/paper-icon-button.js';
import './external/@polymer/paper-button/paper-button.js';
import './external/@polymer/paper-tooltip/paper-tooltip.js';
import './external/@polymer/paper-checkbox/paper-checkbox.js';
import './external/@polymer/iron-pages/iron-pages.js';
import './external/@polymer/iron-selector/iron-selector.js';
import './external/@polymer/neon-animation/neon-animations.js';
import './external/@polymer/iron-ajax/iron-ajax.js';

// Vaadin Imports
import './external/@vaadin/vaadin-date-picker/vaadin-date-picker.js';

// Local Imports
import './controls/cs-accordion.js';
import './controls/cs-button.js';
import './controls/cs-confirm.js';
import './controls/cs-dialog.js';
import './controls/cs-dropdown.js';
import './controls/cs-input.js';
import './controls/cs-password-input.js';
import './controls/cs-nav-bar.js';
import './controls/cs-notification-panel.js';
import './controls/cs-textarea.js';
import './controls/cs-timeline.js';
import './controls/cs-title-bar.js';
import './controls/cs-content-switcher.js';
import './controls/cs-color-picker.js';

// Shared Styles
const styleElement = document.createElement('dom-module');
styleElement.innerHTML =
    `<template>
        <style>
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

            cs-button {
                --cs-button-color: var(--paper-blue-grey-300);
                --cs-button-focus-color: var(--paper-blue-grey-100);
                --cs-button-hover-color: var(--paper-blue-grey-100);
                --cs-button-active-color: var(--paper-blue-grey-400);
                --cs-button-disabled-color: var(--paper-grey-600);
            }

            .panel {
                margin-left: 20px;
                margin-right: 20px;
                height: calc(100vh - 68px);
                overflow: hidden;
            }

            .panelScrollable {
                margin-left: 20px;
                margin-right: 20px;
            }

            .viewCaption {
                margin-top: 20px;                
                font-weight: 100;
                font-size: 2.5em;
                color: var(--paper-grey-600);
            }

            .subViewCaption {
                margin-top: 16px;
                font-weight: 100;
                font-size: 2.5em;
                color: var(--paper-grey-600);
            }

            .dataField {
                margin-right: 20px;
            }

            .dataLabel {
                color: var(--paper-grey-500);
                font-weight: 200;
                padding-right: 10px;
                padding-top: 10px;
            }

            .data {
                color: #ffffff;
                font-weight: 200;
                padding-right: 10px;
                padding-bottom: 10px;                
            }

            .dataLabelSmall {
                color: var(--paper-grey-500);
                font-weight: 200;
                padding-right: 10px;
                padding-top: 10px;
                font-size: .8em;
            }

            .dataSmall {
                color: #ffffff;
                font-weight: 200;
                padding-right: 10px;
                padding-bottom: 10px;
                font-size: .8em;
            }

            .dataHorizontal {
                color: #ffffff;
                font-weight: 200;
                padding-top: 4px;
                padding-bottom: 4px;
                padding-left: 10px;
            }

            .removed {
                display: none;
            }

            .hidden {
                visibility: hidden;
            }

            .dialogButtons {
                margin-top: 20px;
            }

            .saveButton {
                --cs-button-color: var(--paper-pink-400);
                --cs-button-focus-color: var(--paper-pink-300);
                --cs-button-hover-color: var(--paper-pink-300);
                --cs-button-active-color: var(--paper-pink-600);
            }

            .cancelButton {
                margin-left: 10px;
            }
        </style>
    </template>`;
styleElement.register('cs-shared-styles');