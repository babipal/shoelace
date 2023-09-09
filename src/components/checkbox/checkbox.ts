import SlCheckbox from './checkbox.component.js';

export * from './checkbox.component.js';
export default SlCheckbox;

SlCheckbox.define('dv-checkbox');

declare global {
  interface HTMLElementTagNameMap {
    'sl-checkbox': SlCheckbox;
  }
}
