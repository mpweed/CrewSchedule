import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsLogin extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                .loginPanel {
                    width: 433px;
                    height: 300px;
                    margin: 60px auto;
                }

                .loginLogo {
                    width: 433px;
                    height: 100px;
                }

                .loginField {
                    margin-top: 20px;
                    margin-left: 75px;
                    margin-right: 75px;
                }

                .passwordField {
                    margin-top: 20px;
                    margin-left: 75px;
                    margin-right: 75px;
                    margin-bottom: 20px;
                }

                .loginButton {
                    --cs-button-color: var(--paper-lime-300);
                    --cs-button-focus-color: var(--paper-orange-300);
                    --cs-button-hover-color: var(--paper-orange-300);
                    --cs-button-active-color: var(--paper-lime-600);
                }              
            </style>
            <div id="loginPanel" class="loginPanel">
                <img class="loginLogo" src="../images/CSNameLogo.png" />
                <div class="loginField">
                    <cs-input light center-text required placeholder="User" id="loginId" value="{{login}}"></cs-input>
                </div>
                <div class="passwordField">
                    <cs-password-input light center-text required placeholder="Password" id="password" value="{{password}}" on-enterkeypressed="_login"></cs-input>
                </div>
                <div class="horizontal layout center-justified dialogButtons">
                    <cs-button id="loginButton" disabled class="loginButton" on-tap="_login">Login</cs-button>
                </div>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            login: {
                type: String,
                observer: "_validateInput"
            },
            password: {
                type: String,
                observer: "_validateInput"
            }
        }
    }

    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
        this.timer = null;
    }

    ready() {
        super.ready();
        this.$.loginId.reset();
        this.$.password.reset();
        this.$.loginId.focus();
    }

    // Events
    _validateInput() {
        if (this.$.loginId.isValid && this.$.password.isValid) {
            this.$.loginButton.disabled = false;
        } else {
            this.$.loginButton.disabled = true;
        }
    } 

    _login(e) {        
        this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: true } }));

        // Simulate login until real logic is coded
        this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.timer = null;

            // ***TEMPORARY*** FOR LAYOUT DEVELOPMENT ONLY            
            let bootData = this.generateLayoutBootData();

            this.dispatchEvent(new CustomEvent('busy', { bubbles: true, composed: true, detail: { status: false } }));
            this.dispatchEvent(new CustomEvent('loginsuccess', { bubbles: true, composed: true, detail: { bootstrapData: bootData } }));
        }, 2000);
    }

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
                "name": "Crew 1",
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
                "name": "Crew 2",
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
                "name": "Crew 3",
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
                "name": "Crew 4",
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
                "name": "Crew 5",
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
                "name": "Crew 6",
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
                "name": "Crew 7",
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
                "name": "Crew 8",
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
                "name": "Crew 9",
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
                "name": "Crew 10",
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
                "name": "Crew 11",
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
                "name": "Crew 12",
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

    // Public Methods
      
}
customElements.define('cs-login', CsLogin);