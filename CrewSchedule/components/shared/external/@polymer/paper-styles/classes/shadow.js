const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<style>
.shadow-transition {
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.shadow-elevation-2dp {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.shadow-elevation-3dp {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
              0 1px 8px 0 rgba(0, 0, 0, 0.12),
              0 3px 3px -2px rgba(0, 0, 0, 0.4);
}

.shadow-elevation-4dp {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
}

.shadow-elevation-6dp {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12),
              0 3px 5px -1px rgba(0, 0, 0, 0.4);
}

.shadow-elevation-8dp {
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12),
              0 5px 5px -3px rgba(0, 0, 0, 0.4);
}

.shadow-elevation-16dp {
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0  6px 30px 5px rgba(0, 0, 0, 0.12),
              0  8px 10px -5px rgba(0, 0, 0, 0.4);
}

</style>`;

document.head.appendChild($_documentContainer.content);

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
Note that this file probably doesn't do what you expect it to do. It's not
a `<style is=custom-style include="..."` type of style include, which mean
these styles will only apply to the main document, regardless of where
you import this file.

For a set of styles that can be applied to an element, check paper-styles/shadow.html.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
