import { create } from '@storybook/theming';

/**
 * CKW Elements — Storybook Manager Theme
 *
 * Uses specs-tokens (neutral grays) for the entire Storybook chrome
 * (sidebar, toolbar, header). The actual CKW brand colors are only
 * used inside the docs canvas for token swatches and component demos.
 */
export default create({
  base: 'light',

  // Brand
  brandTitle: 'CKW Elements',
  brandImage: '/ckw-logo.svg',
  brandUrl: '/',

  // Colors — specs neutral palette (NOT CKW brand green)
  colorPrimary: '#3b3c3f',   // specs-900
  colorSecondary: '#4f4f55', // specs-700

  // UI
  appBg: '#f3f3f4',          // specs-050
  appContentBg: '#ffffff',   // specs-white
  appBorderColor: '#dadadd', // specs-200
  appBorderRadius: 8,

  // Typography — Roboto (specs font) for the chrome
  fontBase: '"Roboto", "Helvetica Neue", Arial, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text colors
  textColor: '#3b3c3f',      // specs-900
  textInverseColor: '#ffffff', // specs-white
  textMutedColor: '#94959c', // specs-400

  // Toolbar
  barTextColor: '#94959c',   // specs-400
  barSelectedColor: '#3b3c3f', // specs-900
  barHoverColor: '#4f4f55',  // specs-700
  barBg: '#ffffff',          // specs-white

  // Preview
  appPreviewBg: '#ffffff',   // specs-white
});
