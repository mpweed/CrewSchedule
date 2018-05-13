import { PolymerElement, html } from '../shared/external/@polymer/polymer/polymer-element.js';

class CsDesktopShell extends PolymerElement {    
    static get template() {
        return html`
            <style>
                /* CSS rules for your element */
            </style>

            <!-- shadow DOM for your element -->

            <div>[[greeting]]</div> <!-- data bindings in shadow DOM -->
            `;
    }
    
    static get properties() {
        return {
            greeting: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.greeting = 'Hello Desktop!';
    }

    // Add methods to the element's public API
    greetMe() {
        console.log(this.greeting);
    }

}
customElements.define('cs-desktop-shell', CsDesktopShell);