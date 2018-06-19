import { PolymerElement, html } from '../../shared/external/@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '../../shared/external/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../shared/cs-shared-styles.js';
import '../../shared/controls/cs-dialog.js'
import '../../desktop/views/sections/regions/cs-create-schedule-item-region.js'
import '../../desktop/views/sections/regions/cs-edit-schedule-item-region.js'
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
                    <cs-create-schedule-item-region on-close="_hideAddDialog">
                    </cs-create-schedule-item-region>
                </cs-dialog>                
                <cs-dialog id="editDialog">
                    <cs-edit-schedule-item-region on-close="_hideEditDialog">
                    </cs-edit-schedule-item-region>
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
            this.$.editDialog.show();
        }
    }

    _hideAddDialog(e) {
        this.$.addDialog.hide();
    }   

    _hideEditDialog(e) {
        this.$.editDialog.hide();
    }    
}
customElements.define('cs-schedule-view', CsScheduleView);