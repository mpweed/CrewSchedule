﻿import { PolymerElement, html } from '../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../shared/cs-shared-styles.js';
import '../../shared/controls/cs-dialog.js'
import '../../desktop/views/sections/regions/cs-add-job-region.js'
import '../../desktop/views/sections/regions/cs-filter-crews-region.js'
import '../../desktop/views/sections/regions/cs-edit-job-region.js'
class CsScheduleView extends GestureEventListeners(PolymerElement) {    
    static get template() {
        return html`
            <style include="iron-flex iron-flex-alignment cs-shared-styles">
                :host {
                    position: absolute;
                    top: 49px;
                    left: 49px;
                    width: calc(100vw - 50px);
                    height: 100%;
                    margin-bottom: 10px;
                }

                .viewPanel {
                    margin-right: 10px;
                    margin-bottom: 10px;
                    overflow: hidden;
                }
            </style>
            <div class="viewPanel">
                <cs-timeline bootstrap-data="{{bootstrapData}}" 
                             on-addclick="_showAddJobDialog" 
                             on-filterclick="_showFilterCrewsDialog" 
                             on-editclick="_showEditJobDialog"></cs-timeline>
                <cs-dialog id="addJobDialog">
                    <cs-add-job-region on-close="_hideAddJobDialog">
                    </cs-add-job-region>
                </cs-dialog>
                <cs-dialog id="filterCrewsDialog">
                    <cs-filter-crews-region on-close="_hideFilterCrewsDialog">
                    </cs-filter-crews-region>
                </cs-dialog>
                <cs-dialog id="editJobDialog">
                    <cs-edit-job-region on-close="_hideEditJobDialog">
                    </cs-edit-job-region>
                </cs-dialog>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {            
            bootstrapData: {
                type: Object,
                notify: true
            }
        }
    }
    
    // Lifecycle Callbacks
    connectedCallback() {
        super.connectedCallback();
    }

    // Event Handlers
    _showAddJobDialog(e) {
        this.$.addJobDialog.show();
    }

    _showFilterCrewsDialog(e) {
        this.$.filterCrewsDialog.show();
    }

    _showEditJobDialog(e) {
        this.$.editJobDialog.show();
    }

    _hideAddJobDialog(e) {
        this.$.addJobDialog.hide();
    }

    _hideFilterCrewsDialog(e) {
        this.$.filterCrewsDialog.hide();
    }

    _hideEditJobDialog(e) {
        this.$.editJobDialog.hide();
    }
}
customElements.define('cs-schedule-view', CsScheduleView);