﻿import { PolymerElement, html } from '../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../shared/cs-shared-styles.js';
import '../../shared/controls/cs-dialog.js';
import '../../desktop/views/sections/regions/cs-create-schedule-item-region.js';
import '../../desktop/views/sections/regions/cs-edit-job-region.js';
import '../../desktop/views/sections/regions/cs-edit-pto-region.js';
import '../../desktop/views/sections/regions/cs-edit-leave-region.js';
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
                <cs-timeline is-dialog-shown="{{isDialogShown}}"
                             reference-data="{{referenceData}}" 
                             on-addclick="_showAddDialog" 
                             on-editclick="_showEditDialog"></cs-timeline>
                <cs-dialog id="addDialog">
                    <cs-create-schedule-item-region on-close="_hideAddDialog"
                                                    reference-data="{{referenceData}}">
                    </cs-create-schedule-item-region>
                </cs-dialog>                
                <cs-dialog id="editJobDialog">
                    <cs-edit-job-region on-close="_hideEditJobDialog"
                                        reference-data="{{referenceData}}">
                    </cs-edit-job-region>
                </cs-dialog>
                <cs-dialog id="editPtoDialog">
                    <cs-edit-pto-region on-close="_hideEditPtoDialog"
                                        reference-data="{{referenceData}}">
                    </cs-edit-pto-region>
                </cs-dialog>
                <cs-dialog id="editLeaveDialog">
                    <cs-edit-leave-region on-close="_hideEditLeaveDialog"
                                          reference-data="{{referenceData}}">
                    </cs-edit-leave-region>
                </cs-dialog>
            </div>`;
    }

    // Public Properties
    static get properties() {
        return {
            /** Public **/
            isDialogShown: {
                type: Boolean,
                notify: true
            },
            referenceData: {
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
    _showAddDialog(e) {
        if (!this.isDialogShown) {
            this.$.addDialog.show();
        }        
    }    

    _showEditDialog(e) {
        if (!this.isDialogShown) {
            let scheduleItem = e.detail.scheduleItem;
            switch (scheduleItem.type) {
                case "Job":
                    if (this.referenceData.applicationUser.roleId < 4 || scheduleItem.projectManagerId == this.referenceData.applicationUser.id) {
                        this.$.editJobDialog.show();
                    }
                    break;
                case "PTO":
                    if (this.referenceData.applicationUser.roleId < 4) {
                        this.$.editPtoDialog.show();
                    }
                    break;
                case "Leave":
                    if (this.referenceData.applicationUser.roleId < 4) {
                        this.$.editLeaveDialog.show();
                    }
                    break;
            }            
        }
    }

    _hideAddDialog(e) {
        this.$.addDialog.hide();
    }   

    _hideEditJobDialog(e) {
        this.$.editJobDialog.hide();
    }

    _hideEditPtoDialog(e) {
        this.$.editPtoDialog.hide();
    }

    _hideEditLeaveDialog(e) {
        this.$.editLeaveDialog.hide();
    } 
}
customElements.define('cs-schedule-view', CsScheduleView);