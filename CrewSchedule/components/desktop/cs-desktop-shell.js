﻿import { PolymerElement, html } from '../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../shared/cs-shared-styles.js';
class CsDesktopShell extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .content {                
                    height: calc(100vh - 48px);
                }                

                .appPanel {
                    opacity: 0;
                    -webkit-transition: opacity 1s ease-in-out;
                    -moz-transition: opacity 1s ease-in-out;
                    -o-transition: opacity 1s ease-in-out;
                    transition: opacity 1s ease-in-out;
                }

                .appPanelShown {
                    opacity: 1;
                }
            </style>
            <div id="loginPanel" class="removed"> <!-- Remove class list for production -->
                <cs-login on-busy="_handleBusy"
                          on-loginsuccess="_hideLoginPanel">
                </cs-login>
            </div>
            <div id="appPanel" class="appPanel appPanelShown"> <!-- Replace "appPanelShown" class with "hidden" class for production -->
                <cs-title-bar on-busy="_handleBusy"
                              on-success="_handleSuccess"
                              on-exception="_handleException"
                              on-dialogshown="_handleDialogShown"
                              on-dialoghidden="_handleDialogHidden"
                              is-dialog-shown="{{isDialogShown}}"
                              bootstrap-data="{{bootstrapData}}">
                </cs-title-bar>
                <div class="horizontal layout content flex">
                    <cs-nav-bar page="{{page}}"
                                bootstrap-data="{{bootstrapData}}">
                    </cs-nav-bar>
                    <cs-content-switcher on-busy="_handleBusy"
                                         on-success="_handleSuccess"
                                         on-exception="_handleException"
                                         on-dialogshown="_handleDialogShown"
                                         on-dialoghidden="_handleDialogHidden"
                                         is-dialog-shown="{{isDialogShown}}"
                                         bootstrap-data="{{bootstrapData}}"
                                         page="{{page}}">
                    </cs-content-switcher>
                </div>
            </div>
            <cs-notification-panel is-busy="[[isBusy]]" 
                                   is-success="{{isSuccess}}" 
                                   is-exception="{{isException}}" 
                                   error-message="[[errorMessage]]">
            </cs-notification-panel>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isBusy: {
                type: Boolean,
                notify: true
            },
            isSuccess: {
                type: Boolean,
                notify: true
            },
            isException: {
                type: Boolean,
                notify: true
            },
            isDialogShown: {
                type: Boolean,
                notify: true
            },
            errorMessage: {
                type: String,
                notify: true
            },
            bootstrapData: {
                type: Object,
                notify: true
            }
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        //***** TEMPORARY FOR LAYOUT PURPOSES WHEN LOGIN IS NOT USED *****
        this.bootstrapData = StaticData.bootstrapData();
    }

    // TEMPORARY METHODS
    generateLayoutBootData() {
        let retval = new Object();
        retval.applicationUser = {
            "name": "Michael Weed",
            "jobTitle": "System Administrator",
            "role": "System Administrator",
            "zoomLevel": "1",
            "companies": [
                {
                    "id": "1",
                    "name": "Control Point",
                    "offices": [
                        {
                            "id": "1",
                            "name": "Warren, NJ"
                        }
                    ]
                }
            ]
        };

        retval.crews = [
            {
                "id": "1",
                "name": "Boyer, Bill",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "2",
                "name": "Adutwum, George",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "3",
                "name": "Melhado, Ed",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "4",
                "name": "O'Connor, Kyle",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "5",
                "name": "Regal, Kevin",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "6",
                "name": "Acerbi, Brian",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "7",
                "name": "Connor, Doug",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "8",
                "name": "Gebreyesus, Dawit",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "9",
                "name": "Aguilar, Carlos",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "10",
                "name": "Cote, Dennis",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "11",
                "name": "McQuillen, Kyle",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "12",
                "name": "Tappen, Edward",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            }
        ];
        return retval;
    }

    // Event Handlers
    _handleBusy(e) {
        this.isBusy = e.detail.status;
    }

    _handleSuccess(e) {
        this.isSuccess = true;
    }

    _handleException(e) {
        this.isException = true;
        this.errorMessage = e.detail;
    }

    _handleDialogShown(e) {
        this.isDialogShown = true;
    }

    _handleDialogHidden(e) {
        this.isDialogShown = false;
    }

    _hideLoginPanel(e) {
        this.bootstrapData = e.detail.bootstrapData;
        this.$.loginPanel.classList.add("removed");
        this.$.appPanel.classList.remove("hidden");
        this.$.appPanel.classList.add("appPanelShown");
    }
}
customElements.define('cs-desktop-shell', CsDesktopShell);