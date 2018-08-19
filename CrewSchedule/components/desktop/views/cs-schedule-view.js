import { PolymerElement, html } from '../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../shared/cs-shared-styles.js';
import '../../shared/controls/cs-dialog.js';
import '../../desktop/views/sections/regions/cs-create-schedule-item-region.js';
import '../../desktop/views/sections/regions/cs-edit-job-region.js';
import '../../desktop/views/sections/regions/cs-edit-pto-region.js';
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
                <cs-timeline id="timeline"
                             is-dialog-shown="{{isDialogShown}}"
                             reference-data="{{referenceData}}" 
                             on-createclick="_showCreateDialog" 
                             on-editclick="_showEditDialog"></cs-timeline>
                <cs-dialog id="createDialog">
                    <cs-create-schedule-item-region on-close="_hideCreateDialog"
                                                    reference-data="{{referenceData}}">
                    </cs-create-schedule-item-region>
                </cs-dialog>                
                <cs-dialog id="editJobDialog">
                    <cs-edit-job-region on-close="_hideEditJobDialog"
                                        reference-data="{{referenceData}}"
                                        schedule-item="{{scheduleItem}}">
                    </cs-edit-job-region>
                </cs-dialog>
                <cs-dialog id="editPtoDialog">
                    <cs-edit-pto-region on-close="_hideEditPtoDialog"
                                        reference-data="{{referenceData}}"
                                        schedule-item="{{scheduleItem}}">
                    </cs-edit-pto-region>
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
            },
            scheduleItem: {
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
    _showCreateDialog(e) {
        if (!this.isDialogShown) {
            this.$.createDialog.show();
        }        
    }    

    _showEditDialog(e) {
        if (!this.isDialogShown) {
            this.scheduleItem = null;
            this.scheduleItem = e.detail.scheduleItem;
            switch (this.scheduleItem.type) {
                case "Job":
                    if (this.referenceData.applicationUser.roleId < 4 ||
                        this.scheduleItem.projectManager.id === this.referenceData.applicationUser.id) {
                        this.$.editJobDialog.show();
                    } else if (this.scheduleItem.affectedProjectManager &&
                        this.scheduleItem.affectedProjectManager.id === this.referenceData.applicationUser.id &&
                        this.scheduleItem.statusId === 2) {
                        this.$.editJobDialog.show();
                    }
                    break;
                case "PTO":
                case "Leave":
                    if (this.referenceData.applicationUser.roleId < 4) {
                        this.$.editPtoDialog.show();
                    }
                    break;
            }            
        }
    }

    _hideCreateDialog(e) {
        this.$.createDialog.hide();
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

    // Public Methods
    refreshView() {
        this.$.timeline.refresh();
    }
}
customElements.define('cs-schedule-view', CsScheduleView);