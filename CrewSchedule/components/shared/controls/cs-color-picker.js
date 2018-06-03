import { PolymerElement, html } from '../external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../cs-shared-styles.js';
class CsColorPicker extends GestureEventListeners(PolymerElement) {
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
                    padding-left: 10px;
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
                    max-height: 200px;
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

                .dropdownBodyLight {
                    border-color: var(--paper-grey-800);
                    background-color: var(--paper-grey-800);
                }

                .disabled {
                    color: var(--paper-grey-500);
                    pointer-events: none;
                }

                .selection {
                    margin-top: 3px;
                    height: 18px;
                    width: 100%;
                }
            </style>
            <div tabindex="1" id="dropdownBody" class="dropdownBody" on-click="_showDropdown">
                <div class="selection" style$="background-color:[[selectedItem.color]]"></div>
                <ul id="dropdown" class="dropdown scroll">
                    <template is="dom-repeat" items="[[internalItems]]" selected="{{selectedItem}}">
                        <li on-click="_updateSelection">
                            <div class="selection" style$="background-color:[[item.color]]"></div>
                        </li>
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
            internalItems: {
                type: Array
            },
            selectedItem: {
                type: Object,
                notify: true
            },
            selectedColor: {
                type: String,
                notify: true
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
        this.internalItems = [
            {
                "name": "#ffebee",
                "color": "#ffebee"
            },
            {
                "name": "#ffcdd2",
                "color": "#ffcdd2"
            },
            {
                "name": "#ef9a9a",
                "color": "#ef9a9a"
            },
            {
                "name": "#e57373",
                "color": "#e57373"
            },
            {
                "name": "#ef5350",
                "color": "#ef5350"
            },
            {
                "name": "#f44336",
                "color": "#f44336"
            },
            {
                "name": "#e53935",
                "color": "#e53935"
            },
            {
                "name": "#d32f2f",
                "color": "#d32f2f"
            },
            {
                "name": "#c62828",
                "color": "#c62828"
            },
            {
                "name": "#b71c1c",
                "color": "#b71c1c"
            },
            {
                "name": "#ff8a80",
                "color": "#ff8a80"
            },
            {
                "name": "#ff5252",
                "color": "#ff5252"
            },
            {
                "name": "#ff1744",
                "color": "#ff1744"
            },
            {
                "name": "#d50000",
                "color": "#d50000"
            },
            {
                "name": "#fce4ec",
                "color": "#fce4ec"
            },
            {
                "name": "#f8bbd0",
                "color": "#f8bbd0"
            },
            {
                "name": "#f48fb1",
                "color": "#f48fb1"
            },
            {
                "name": "#f06292",
                "color": "#f06292"
            },
            {
                "name": "#ec407a",
                "color": "#ec407a"
            },
            {
                "name": "#e91e63",
                "color": "#e91e63"
            },
            {
                "name": "#d81b60",
                "color": "#d81b60"
            },
            {
                "name": "#c2185b",
                "color": "#c2185b"
            },
            {
                "name": "#ad1457",
                "color": "#ad1457"
            },
            {
                "name": "#880e4f",
                "color": "#880e4f"
            },
            {
                "name": "#ff80ab",
                "color": "#ff80ab"
            },
            {
                "name": "#ff4081",
                "color": "#ff4081"
            },
            {
                "name": "#f50057",
                "color": "#f50057"
            },
            {
                "name": "#c51162",
                "color": "#c51162"
            },
            {
                "name": "#f3e5f5",
                "color": "#f3e5f5"
            },
            {
                "name": "#e1bee7",
                "color": "#e1bee7"
            },
            {
                "name": "#ce93d8",
                "color": "#ce93d8"
            },
            {
                "name": "#ba68c8",
                "color": "#ba68c8"
            },
            {
                "name": "#ab47bc",
                "color": "#ab47bc"
            },
            {
                "name": "#9c27b0",
                "color": "#9c27b0"
            },
            {
                "name": "#8e24aa",
                "color": "#8e24aa"
            },
            {
                "name": "#7b1fa2",
                "color": "#7b1fa2"
            },
            {
                "name": "#6a1b9a",
                "color": "#6a1b9a"
            },
            {
                "name": "#4a148c",
                "color": "#4a148c"
            },
            {
                "name": "#ea80fc",
                "color": "#ea80fc"
            },
            {
                "name": "#e040fb",
                "color": "#e040fb"
            },
            {
                "name": "#d500f9",
                "color": "#d500f9"
            },
            {
                "name": "#aa00ff",
                "color": "#aa00ff"
            },
            {
                "name": "#ede7f6",
                "color": "#ede7f6"
            },
            {
                "name": "#d1c4e9",
                "color": "#d1c4e9"
            },
            {
                "name": "#b39ddb",
                "color": "#b39ddb"
            },
            {
                "name": "#9575cd",
                "color": "#9575cd"
            },
            {
                "name": "#7e57c2",
                "color": "#7e57c2"
            },
            {
                "name": "#673ab7",
                "color": "#673ab7"
            },
            {
                "name": "#5e35b1",
                "color": "#5e35b1"
            },
            {
                "name": "#512da8",
                "color": "#512da8"
            },
            {
                "name": "#4527a0",
                "color": "#4527a0"
            },
            {
                "name": "#311b92",
                "color": "#311b92"
            },
            {
                "name": "#b388ff",
                "color": "#b388ff"
            },
            {
                "name": "#7c4dff",
                "color": "#7c4dff"
            },
            {
                "name": "#651fff",
                "color": "#651fff"
            },
            {
                "name": "#6200ea",
                "color": "#6200ea"
            },
            {
                "name": "#e8eaf6",
                "color": "#e8eaf6"
            },
            {
                "name": "#c5cae9",
                "color": "#c5cae9"
            },
            {
                "name": "#9fa8da",
                "color": "#9fa8da"
            },
            {
                "name": "#7986cb",
                "color": "#7986cb"
            },
            {
                "name": "#5c6bc0",
                "color": "#5c6bc0"
            },
            {
                "name": "#3f51b5",
                "color": "#3f51b5"
            },
            {
                "name": "#3949ab",
                "color": "#3949ab"
            },
            {
                "name": "#303f9f",
                "color": "#303f9f"
            },
            {
                "name": "#283593",
                "color": "#283593"
            },
            {
                "name": "#1a237e",
                "color": "#1a237e"
            },
            {
                "name": "#8c9eff",
                "color": "#8c9eff"
            },
            {
                "name": "#536dfe",
                "color": "#536dfe"
            },
            {
                "name": "#3d5afe",
                "color": "#3d5afe"
            },
            {
                "name": "#304ffe",
                "color": "#304ffe"
            },
            {
                "name": "#e3f2fd",
                "color": "#e3f2fd"
            },
            {
                "name": "#bbdefb",
                "color": "#bbdefb"
            },
            {
                "name": "#90caf9",
                "color": "#90caf9"
            },
            {
                "name": "#64b5f6",
                "color": "#64b5f6"
            },
            {
                "name": "#42a5f5",
                "color": "#42a5f5"
            },
            {
                "name": "#2196f3",
                "color": "#2196f3"
            },
            {
                "name": "#1e88e5",
                "color": "#1e88e5"
            },
            {
                "name": "#1976d2",
                "color": "#1976d2"
            },
            {
                "name": "#1565c0",
                "color": "#1565c0"
            },
            {
                "name": "#0d47a1",
                "color": "#0d47a1"
            },
            {
                "name": "#82b1ff",
                "color": "#82b1ff"
            },
            {
                "name": "#448aff",
                "color": "#448aff"
            },
            {
                "name": "#2979ff",
                "color": "#2979ff"
            },
            {
                "name": "#2962ff",
                "color": "#2962ff"
            },
            {
                "name": "#e1f5fe",
                "color": "#e1f5fe"
            },
            {
                "name": "#b3e5fc",
                "color": "#b3e5fc"
            },
            {
                "name": "#81d4fa",
                "color": "#81d4fa"
            },
            {
                "name": "#4fc3f7",
                "color": "#4fc3f7"
            },
            {
                "name": "#29b6f6",
                "color": "#29b6f6"
            },
            {
                "name": "#03a9f4",
                "color": "#03a9f4"
            },
            {
                "name": "#039be5",
                "color": "#039be5"
            },
            {
                "name": "#0288d1",
                "color": "#0288d1"
            },
            {
                "name": "#0277bd",
                "color": "#0277bd"
            },
            {
                "name": "#01579b",
                "color": "#01579b"
            },
            {
                "name": "#80d8ff",
                "color": "#80d8ff"
            },
            {
                "name": "#40c4ff",
                "color": "#40c4ff"
            },
            {
                "name": "#00b0ff",
                "color": "#00b0ff"
            },
            {
                "name": "#0091ea",
                "color": "#0091ea"
            },
            {
                "name": "#e0f7fa",
                "color": "#e0f7fa"
            },
            {
                "name": "#b2ebf2",
                "color": "#b2ebf2"
            },
            {
                "name": "#80deea",
                "color": "#80deea"
            },
            {
                "name": "#4dd0e1",
                "color": "#4dd0e1"
            },
            {
                "name": "#26c6da",
                "color": "#26c6da"
            },
            {
                "name": "#00bcd4",
                "color": "#00bcd4"
            },
            {
                "name": "#00acc1",
                "color": "#00acc1"
            },
            {
                "name": "#0097a7",
                "color": "#0097a7"
            },
            {
                "name": "#00838f",
                "color": "#00838f"
            },
            {
                "name": "#006064",
                "color": "#006064"
            },
            {
                "name": "#84ffff",
                "color": "#84ffff"
            },
            {
                "name": "#18ffff",
                "color": "#18ffff"
            },
            {
                "name": "#00e5ff",
                "color": "#00e5ff"
            },
            {
                "name": "#00b8d4",
                "color": "#00b8d4"
            },
            {
                "name": "#e0f2f1",
                "color": "#e0f2f1"
            },
            {
                "name": "#b2dfdb",
                "color": "#b2dfdb"
            },
            {
                "name": "#80cbc4",
                "color": "#80cbc4"
            },
            {
                "name": "#4db6ac",
                "color": "#4db6ac"
            },
            {
                "name": "#26a69a",
                "color": "#26a69a"
            },
            {
                "name": "#009688",
                "color": "#009688"
            },
            {
                "name": "#00897b",
                "color": "#00897b"
            },
            {
                "name": "#00796b",
                "color": "#00796b"
            },
            {
                "name": "#00695c",
                "color": "#00695c"
            },
            {
                "name": "#004d40",
                "color": "#004d40"
            },
            {
                "name": "#a7ffeb",
                "color": "#a7ffeb"
            },
            {
                "name": "#64ffda",
                "color": "#64ffda"
            },
            {
                "name": "#1de9b6",
                "color": "#1de9b6"
            },
            {
                "name": "#00bfa5",
                "color": "#00bfa5"
            },
            {
                "name": "#e8f5e9",
                "color": "#e8f5e9"
            },
            {
                "name": "#c8e6c9",
                "color": "#c8e6c9"
            },
            {
                "name": "#a5d6a7",
                "color": "#a5d6a7"
            },
            {
                "name": "#81c784",
                "color": "#81c784"
            },
            {
                "name": "#66bb6a",
                "color": "#66bb6a"
            },
            {
                "name": "#4caf50",
                "color": "#4caf50"
            },
            {
                "name": "#43a047",
                "color": "#43a047"
            },
            {
                "name": "#388e3c",
                "color": "#388e3c"
            },
            {
                "name": "#2e7d32",
                "color": "#2e7d32"
            },
            {
                "name": "#1b5e20",
                "color": "#1b5e20"
            },
            {
                "name": "#b9f6ca",
                "color": "#b9f6ca"
            },
            {
                "name": "#69f0ae",
                "color": "#69f0ae"
            },
            {
                "name": "#00e676",
                "color": "#00e676"
            },
            {
                "name": "#00c853",
                "color": "#00c853"
            },
            {
                "name": "#f1f8e9",
                "color": "#f1f8e9"
            },
            {
                "name": "#dcedc8",
                "color": "#dcedc8"
            },
            {
                "name": "#c5e1a5",
                "color": "#c5e1a5"
            },
            {
                "name": "#aed581",
                "color": "#aed581"
            },
            {
                "name": "#9ccc65",
                "color": "#9ccc65"
            },
            {
                "name": "#8bc34a",
                "color": "#8bc34a"
            },
            {
                "name": "#7cb342",
                "color": "#7cb342"
            },
            {
                "name": "#689f38",
                "color": "#689f38"
            },
            {
                "name": "#558b2f",
                "color": "#558b2f"
            },
            {
                "name": "#33691e",
                "color": "#33691e"
            },
            {
                "name": "#ccff90",
                "color": "#ccff90"
            },
            {
                "name": "#b2ff59",
                "color": "#b2ff59"
            },
            {
                "name": "#76ff03",
                "color": "#76ff03"
            },
            {
                "name": "#64dd17",
                "color": "#64dd17"
            },
            {
                "name": "#f9fbe7",
                "color": "#f9fbe7"
            },
            {
                "name": "#f0f4c3",
                "color": "#f0f4c3"
            },
            {
                "name": "#e6ee9c",
                "color": "#e6ee9c"
            },
            {
                "name": "#dce775",
                "color": "#dce775"
            },
            {
                "name": "#d4e157",
                "color": "#d4e157"
            },
            {
                "name": "#cddc39",
                "color": "#cddc39"
            },
            {
                "name": "#c0ca33",
                "color": "#c0ca33"
            },
            {
                "name": "#afb42b",
                "color": "#afb42b"
            },
            {
                "name": "#9e9d24",
                "color": "#9e9d24"
            },
            {
                "name": "#827717",
                "color": "#827717"
            },
            {
                "name": "#f4ff81",
                "color": "#f4ff81"
            },
            {
                "name": "#eeff41",
                "color": "#eeff41"
            },
            {
                "name": "#c6ff00",
                "color": "#c6ff00"
            },
            {
                "name": "#aeea00",
                "color": "#aeea00"
            },
            {
                "name": "#fffde7",
                "color": "#fffde7"
            },
            {
                "name": "#fff9c4",
                "color": "#fff9c4"
            },
            {
                "name": "#fff59d",
                "color": "#fff59d"
            },
            {
                "name": "#fff176",
                "color": "#fff176"
            },
            {
                "name": "#ffee58",
                "color": "#ffee58"
            },
            {
                "name": "#ffeb3b",
                "color": "#ffeb3b"
            },
            {
                "name": "#fdd835",
                "color": "#fdd835"
            },
            {
                "name": "#fbc02d",
                "color": "#fbc02d"
            },
            {
                "name": "#f9a825",
                "color": "#f9a825"
            },
            {
                "name": "#f57f17",
                "color": "#f57f17"
            },
            {
                "name": "#ffff8d",
                "color": "#ffff8d"
            },
            {
                "name": "#ffff00",
                "color": "#ffff00"
            },
            {
                "name": "#ffea00",
                "color": "#ffea00"
            },
            {
                "name": "#ffd600",
                "color": "#ffd600"
            },
            {
                "name": "#fff8e1",
                "color": "#fff8e1"
            },
            {
                "name": "#ffecb3",
                "color": "#ffecb3"
            },
            {
                "name": "#ffe082",
                "color": "#ffe082"
            },
            {
                "name": "#ffd54f",
                "color": "#ffd54f"
            },
            {
                "name": "#ffca28",
                "color": "#ffca28"
            },
            {
                "name": "#ffc107",
                "color": "#ffc107"
            },
            {
                "name": "#ffb300",
                "color": "#ffb300"
            },
            {
                "name": "#ffa000",
                "color": "#ffa000"
            },
            {
                "name": "#ff8f00",
                "color": "#ff8f00"
            },
            {
                "name": "#ff6f00",
                "color": "#ff6f00"
            },
            {
                "name": "#ffe57f",
                "color": "#ffe57f"
            },
            {
                "name": "#ffd740",
                "color": "#ffd740"
            },
            {
                "name": "#ffc400",
                "color": "#ffc400"
            },
            {
                "name": "#ffab00",
                "color": "#ffab00"
            },
            {
                "name": "#fff3e0",
                "color": "#fff3e0"
            },
            {
                "name": "#ffe0b2",
                "color": "#ffe0b2"
            },
            {
                "name": "#ffcc80",
                "color": "#ffcc80"
            },
            {
                "name": "#ffb74d",
                "color": "#ffb74d"
            },
            {
                "name": "#ffa726",
                "color": "#ffa726"
            },
            {
                "name": "#ff9800",
                "color": "#ff9800"
            },
            {
                "name": "#fb8c000",
                "color": "#fb8c00"
            },
            {
                "name": "#f57c00",
                "color": "#f57c00"
            },
            {
                "name": "#ef6c00",
                "color": "#ef6c00"
            },
            {
                "name": "#e65100",
                "color": "#e65100"
            },
            {
                "name": "#ffd180",
                "color": "#ffd180"
            },
            {
                "name": "#ffab40",
                "color": "#ffab40"
            },
            {
                "name": "#ff9100",
                "color": "#ff9100"
            },
            {
                "name": "#ff6500",
                "color": "#ff6500"
            },
            {
                "name": "#fbe9e7",
                "color": "#fbe9e7"
            },
            {
                "name": "#ffccbc",
                "color": "#ffccbc"
            },
            {
                "name": "#ffab91",
                "color": "#ffab91"
            },
            {
                "name": "#ff8a65",
                "color": "#ff8a65"
            },
            {
                "name": "#ff7043",
                "color": "#ff7043"
            },
            {
                "name": "#ff5722",
                "color": "#ff5722"
            },
            {
                "name": "#f4511e",
                "color": "#f4511e"
            },
            {
                "name": "#e64a19",
                "color": "#e64a19"
            },
            {
                "name": "#d84315",
                "color": "#d84315"
            },
            {
                "name": "#bf360c",
                "color": "#bf360c"
            },
            {
                "name": "#ff9e80",
                "color": "#ff9e80"
            },
            {
                "name": "#ff6e40",
                "color": "#ff6e40"
            },
            {
                "name": "#ff3d00",
                "color": "#ff3d00"
            },
            {
                "name": "#dd2c00",
                "color": "#dd2c00"
            },
            {
                "name": "#efebe9",
                "color": "#efebe9"
            },
            {
                "name": "#d7ccc8",
                "color": "#d7ccc8"
            },
            {
                "name": "#bcaaa4",
                "color": "#bcaaa4"
            },
            {
                "name": "#a1887f",
                "color": "#a1887f"
            },
            {
                "name": "#8d6e63",
                "color": "#8d6e63"
            },
            {
                "name": "#795548",
                "color": "#795548"
            },
            {
                "name": "#6d4c41",
                "color": "#6d4c41"
            },
            {
                "name": "#5d4037",
                "color": "#5d4037"
            },
            {
                "name": "#4e342e",
                "color": "#4e342e"
            },
            {
                "name": "#3e2723",
                "color": "#3e2723"
            },
            {
                "name": "#fafafa",
                "color": "#fafafa"
            },
            {
                "name": "#f5f5f5",
                "color": "#f5f5f5"
            },
            {
                "name": "#eeeeee",
                "color": "#eeeeee"
            },
            {
                "name": "#e0e0e0",
                "color": "#e0e0e0"
            },
            {
                "name": "#bdbdbd",
                "color": "#bdbdbd"
            },
            {
                "name": "#9e9e9e",
                "color": "#9e9e9e"
            },
            {
                "name": "#757575",
                "color": "#757575"
            },
            {
                "name": "#616161",
                "color": "#616161"
            },
            {
                "name": "#424242",
                "color": "#424242"
            },
            {
                "name": "#212121",
                "color": "#212121"
            },
            {
                "name": "#eceff1",
                "color": "#eceff1"
            },
            {
                "name": "#cfd8dc",
                "color": "#cfd8dc"
            },
            {
                "name": "#b0bec5",
                "color": "#b0bec5"
            },
            {
                "name": "#90a4ae",
                "color": "#90a4ae"
            },
            {
                "name": "#78909c",
                "color": "#78909c"
            },
            {
                "name": "#607d8b",
                "color": "#607d8b"
            },
            {
                "name": "#546e7a",
                "color": "#546e7a"
            },
            {
                "name": "#455a64",
                "color": "#455a64"
            },
            {
                "name": "#37474f",
                "color": "#37474f"
            },
            {
                "name": "#263238",
                "color": "#263238"
            }
        ];
    }

    disconnectedCallback() {
        document.removeEventListener("click", this._boundListener);
    }

    // Event Handlers
    _lightChanged(newValue, oldValue) {
        if (newValue) {
            this.$.dropdownBody.classList.add("dropdownBodyLight");
        } else {
            this.$.dropdownBody.classList.remove("dropdownBodyLight");
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

    _selectedItemChanged(newValue, oldValue) {
        this.$.dropdownBody.classList.remove("active");
    }

    _updateSelection(e) {
        this.selectedItem = e.model.item;
        this.selectedColor = this.selectedItem.color;
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
}
customElements.define('cs-color-picker', CsColorPicker);