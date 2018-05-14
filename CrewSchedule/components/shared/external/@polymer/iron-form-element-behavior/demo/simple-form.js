/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({

  is: 'simple-form',

  extends: 'form',

  properties: {formElements: {type: Object, notify: true}},

  listeners: {
    'iron-form-element-register': '_elementRegistered',
    'iron-form-element-unregister': '_elementUnregistered'
  },

  ready: function() {
    this.formElements = [];
  },

  _elementRegistered: function(e) {
    this.formElements.push(e.target);
    e.target._parentForm = this;
  },

  _elementUnregistered: function(e) {
    var target = e.detail.target;
    if (target) {
      var index = this.formElements.indexOf(target);
      if (index > -1) {
        this.formElements.splice(index, 1);
      }
    }
  }

});
