import { create } from '@storybook/theming';

/**
 * CKW Elements — Storybook Manager Theme
 *
 * Branded with the CKW design system: green accent colors,
 * Gotham typeface, and CKW grey palette throughout the entire
 * Storybook chrome (sidebar, toolbar, header, docs).
 */
export default create({
  base: 'light',

  // Brand
  brandTitle: 'CKW Elements',
  brandImage: '/ckw-logo.svg',
  brandUrl: '/',

  // Colors — CKW brand green + grey palette
  colorPrimary: '#365f10',   // interactive-primary (green-600)
  colorSecondary: '#365f10', // interactive-primary (green-600)

  // UI
  appBg: '#fafafa',          // background-canvas (grey-50)
  appContentBg: '#ffffff',   // background-default (white)
  appBorderColor: '#d5d8d5', // border-medium (grey-200)
  appBorderRadius: 8,

  // Typography — Gotham (CKW brand font)
  fontBase: '"Gotham", "Helvetica Neue", Arial, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text colors
  textColor: '#232623',      // text-primary (grey-800)
  textInverseColor: '#ffffff', // white
  textMutedColor: '#8d968d', // text-tertiary (grey-400)

  // Toolbar
  barTextColor: '#6a716a',   // text-secondary (grey-500)
  barSelectedColor: '#365f10', // interactive-primary (green-600)
  barHoverColor: '#21420b',  // interactive-primary-hover (green-700)
  barBg: '#ffffff',          // background-default (white)

  // Preview
  appPreviewBg: '#ffffff',   // background-default (white)
});
