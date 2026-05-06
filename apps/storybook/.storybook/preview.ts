import type { Preview } from '@storybook/react';
import ckwTheme from './theme';

// CKW design tokens (consumed by token swatches / samples)
import '@ckw-elements/tokens/tokens.css';

// Documentation chrome styles (CKW design tokens, Gotham, JetBrains Mono @font-face)
import '../src/docs.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: ckwTheme,
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Typography', 'Colors', 'Spacings', 'Borders', 'Shadows'],
          'Components',
          ['Button', 'Input Field', 'Segmented Control'],
        ],
      },
    },
  },
};

export default preview;
