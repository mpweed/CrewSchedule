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
`<neon-animatable>` is a simple container element implementing `Polymer.NeonAnimatableBehavior`. This is a convenience element for use with `<neon-animated-pages>`.

```
<neon-animated-pages selected="0"
                     entry-animation="slide-from-right-animation"
                     exit-animation="slide-left-animation">
  <neon-animatable>1</neon-animatable>
  <neon-animatable>2</neon-animatable>
</neon-animated-pages>
```
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../@polymer/polymer/polymer-legacy.js';

import { IronResizableBehavior } from '../iron-resizable-behavior/iron-resizable-behavior.js';
import { NeonAnimatableBehavior } from './neon-animatable-behavior.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }
    </style>

    <slot></slot>
`,

  is: 'neon-animatable',
  behaviors: [NeonAnimatableBehavior, IronResizableBehavior]
});
