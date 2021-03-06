import '../vaadin-development-mode-detector/vaadin-development-mode-detector.js';

/**
 * @polymerMixin
 */
export const ElementMixin = superClass => {
  try {
    return class VaadinElementMixin extends superClass {
    };
  } finally {
    // This is run every time a new class is declared, not every time an instance is created
    if (window.Vaadin.runIfDevelopmentMode) {
      window.Vaadin.runIfDevelopmentMode('vaadin-usage-statistics');
    }
  }
};
