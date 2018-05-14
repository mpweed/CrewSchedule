/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/paper-styles/shadow.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
        --paper-icon-button-ink-color: #fff;
        --iron-icon-fill-color: #fff;
      }

      :host([collapsed]) #background {
        transform: scaleY(calc(60/230));
      }

      :host([collapsed]) #youtube-logo {
        transform: scale(calc(60/230)) translateY(-195px);
      }

      :host([collapsed]) #back {
        transform: translateX(0);
      }

      :host([collapsed]) #content {
        opacity: 0;
        transition-delay: 0s;
        transform: translateY(-10px);
      }

      #background {
        height: 230px;
        background-image: linear-gradient(#E7291A, #C21616);
        @apply --shadow-elevation-2dp;
        transform-origin: 0 0;
        transition: transform 0.3s;
        transform: scaleY(1);
      }

      #youtube-logo {
        display: block;
        position: absolute;
        margin: auto;
        top: 30px;

        left: calc(50% - 75px);

        width: 150px;
        height: calc(150px / 1.45);
        background-image: radial-gradient(transparent 50%, #fff 50%);
        border-radius: 9% / 13%;
        transition: transform 0.3s;
      }

      #youtube-logo:before,
      #youtube-logo:after {
        content: '';
        display: block;
        position: absolute;
        background-color: #fff;
        width: 90%;
        height: 14%;
        left: 5%;
        border-radius: 100% / 90%;
      }

      #youtube-logo:before {
        top: -3.7%;
      }

      #youtube-logo:after {
        bottom: -3.7%;
      }

      #youtube-logo > .lr-edge {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #youtube-logo > .lr-edge:before,
      #youtube-logo > .lr-edge:after {
        content: '';
        display: block;
        position: absolute;
        background-color: #fff;
        width: 10%;
        height: 90%;
        top: 5%;

        border-radius: 100% / 90%;
      }

      #youtube-logo > .lr-edge:before {
        left: -2.5%;
      }

      #youtube-logo > .lr-edge:after {
        right: -2.5%;
      }

      #youtube-logo > .play-icon {
        display: block;
        position: absolute;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
        overflow: hidden;
        background-image:
          linear-gradient(90deg, #fff 38%, transparent 38%),
          linear-gradient(35deg, transparent 57%, rgba(0, 0, 0, 0.3) 57%);
      }

      #youtube-logo > .play-icon:before,
      #youtube-logo > .play-icon:after {
        content: '';
        display: block;
        position: absolute;
        width: 200%;
        height: 65%;
        background-color: #fff;
      }

      #youtube-logo > .play-icon:before {
        transform-origin: top left;
        top: -80%;
        transform: rotate(29deg);
      }

      #youtube-logo > .play-icon:after {
        transform-origin: bottom left;
        bottom: -80%;
        transform: rotate(-29deg);
      }

      #content {
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        transition: transform 0.15s, opacity 0.15s;
        transition-delay: 0.2s;
      }

      #back {
        position: absolute;
        top: 10px;
        transform: translateX(-64px);
        transition: transform 0.3s;
      }
    </style>
    <div id="background"></div>
    <div id="youtube-logo">
      <div class="lr-edge"></div>
      <div class="play-icon"></div>
    </div>
    <div id="content">
      <slot></slot>
    </div>
    <a id="back" href="../#/search/"><paper-icon-button icon="icons:arrow-back"></paper-icon-button></a>
`,

  is: 'youtube-toolbar'
});
