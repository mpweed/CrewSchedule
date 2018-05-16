import '../../@polymer/polymer/lib/elements/custom-style.js';
import './version.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'lumo-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --lumo-icons-angle-down: "\\e909";
      --lumo-icons-angle-left: "\\e903";
      --lumo-icons-angle-right: "\\e906";
      --lumo-icons-angle-up: "\\e904";
      --lumo-icons-arrow-down: "\\e921";
      --lumo-icons-arrow-left: "\\e920";
      --lumo-icons-arrow-right: "\\e91f";
      --lumo-icons-arrow-up: "\\e91e";
      --lumo-icons-bar-chart: "\\e91d";
      --lumo-icons-bell: "\\e91c";
      --lumo-icons-calendar: "\\e908";
      --lumo-icons-checkmark: "\\e902";
      --lumo-icons-chevron-down: "\\e91b";
      --lumo-icons-chevron-left: "\\e91a";
      --lumo-icons-chevron-right: "\\e919";
      --lumo-icons-chevron-up: "\\e918";
      --lumo-icons-clock: "\\e917";
      --lumo-icons-cog: "\\e916";
      --lumo-icons-cross: "\\e907";
      --lumo-icons-download: "\\e915";
      --lumo-icons-dropdown: "\\e905";
      --lumo-icons-edit: "\\e914";
      --lumo-icons-error: "\\e913";
      --lumo-icons-eye-disabled: "\\e901";
      --lumo-icons-eye: "\\e900";
      --lumo-icons-menu: "\\e912";
      --lumo-icons-minus: "\\e911";
      --lumo-icons-phone: "\\e910";
      --lumo-icons-play: "\\e90f";
      --lumo-icons-plus: "\\e90e";
      --lumo-icons-reload: "\\e90d";
      --lumo-icons-search: "\\e90c";
      --lumo-icons-upload: "\\e90b";
      --lumo-icons-user: "\\e90a";
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
