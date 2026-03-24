import { create } from '@storybook/theming';

export default create({
  base: 'light',

  // Brand
  brandTitle: 'CKW Elements',
  // brandImage: '/logo.svg',  // TODO: add CKW logo
  brandUrl: '/',

  // Colors — CKW brand green
  colorPrimary: '#365f10',   // Green/600 (interactive-primary)
  colorSecondary: '#365f10', // Green/600

  // UI
  appBg: '#fafafa',          // Grey/50 (background-canvas)
  appContentBg: '#ffffff',   // Neutrals/white (background-default)
  appBorderColor: '#d5d8d5', // Grey/200 (border-medium)
  appBorderRadius: 8,        // border-radius-sm

  // Typography — Gotham with fallbacks
  fontBase: '"Gotham", "Helvetica Neue", Arial, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text colors
  textColor: '#232623',      // Grey/800 (text-primary)
  textInverseColor: '#ffffff', // Neutrals/white

  // Toolbar
  barTextColor: '#6a716a',   // Grey/500
  barSelectedColor: '#365f10', // Green/600 (interactive-primary)
  barBg: '#ffffff',          // Neutrals/white
});
