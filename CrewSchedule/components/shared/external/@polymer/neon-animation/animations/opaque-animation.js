/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/*
`<opaque-animation>` makes an element `opacity:1` for the duration of the animation. Used to prevent
webkit/safari from drawing a frame before an animation for elements that animate from display:none.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../../@polymer/polymer/polymer-legacy.js';

import { NeonAnimationBehavior } from '../neon-animation-behavior.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({

  is: 'opaque-animation',

  behaviors: [NeonAnimationBehavior],

  configure: function(config) {
    var node = config.node;
    this._effect = new KeyframeEffect(
        node,
        [{'opacity': '1'}, {'opacity': '1'}],
        this.timingFromConfig(config));
    node.style.opacity = '0';
    return this._effect;
  },

  complete: function(config) {
    config.node.style.opacity = '';
  }

});
