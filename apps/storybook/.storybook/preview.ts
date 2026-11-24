import type { Preview } from '@storybook/react-vite';
import ckwTheme from './theme';

// CKW design tokens (consumed by token swatches / samples)
import '@ckwag/elements-tokens/tokens.css';

// Documentation chrome styles (CKW design tokens, Gotham, JetBrains Mono @font-face)
import '../src/docs.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: ckwTheme,
      codePanel: true,
    },
    options: {
      storySort: {
        includeNames: true,
        order: [
          'Welcome',
          'Getting Started',
          ['React', 'Releases', 'Storybook Standards', 'Prototyping with AI Agents'],
          'Foundations',
          ['Typography', 'Colors', 'Spacings', 'Borders', 'Shadows', 'Icons'],
          'Components',
          // Components alphabetically, each page as Docs → Playground → examples
          [
            'Badge',
            ['Docs', 'Playground', '*'],
            'Button',
            ['Docs', 'Playground', '*'],
            'Inline Message',
            ['Docs', 'Playground', '*'],
            'Input Field',
            ['Docs', 'Playground', '*'],
            'Loading Spinner',
            ['Docs', 'Playground', '*'],
            'Password Input',
            ['Docs', 'Playground', '*'],
            'Segmented Control',
            ['Docs', 'Playground', '*'],
            'Select',
            ['Docs', 'Playground', '*'],
            'Text Link',
            ['Docs', 'Playground', '*'],
            '*',
            ['Docs', 'Playground', '*'],
          ],
        ],
      },
    },
  },
};

export default preview;
