import type { Preview } from '@storybook/react-vite';
import ckwTheme from './theme';

// CKW design tokens (consumed by token swatches / samples)
import '@ckw-elements/tokens/tokens.css';

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
        order: [
          'Welcome',
          'Getting Started',
          ['React', 'Releases', 'Storybook Standards', 'Prototyping with AI Agents'],
          'Foundations',
          ['Typography', 'Colors', 'Spacings', 'Borders', 'Shadows', 'Icons'],
          'Components',
          [
            'Icon',
            ['React Playground'],
            'Button',
            ['Overview', 'React Playground'],
            'Input Field',
            ['Overview', 'React Playground'],
            'Segmented Control',
            ['Overview', 'React Playground'],
          ],
        ],
      },
    },
  },
};

export default preview;
