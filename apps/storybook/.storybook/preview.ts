import type { Preview } from '@storybook/react-vite';
import ckwTheme from './theme';

// CKW design tokens (consumed by token swatches / samples)
import '@ckwag/elements-tokens/tokens.css';

// Documentation chrome styles (CKW design tokens, Gotham, JetBrains Mono @font-face)
import '../src/docs.css';

/**
 * Waits for the Gotham weights used by components before a story renders.
 * The @font-face rules use `font-display: swap`, so components that measure
 * text on mount would otherwise measure the fallback font, making visual
 * snapshots flaky.
 */
const loadFonts = async (): Promise<Record<string, never>> => {
  await Promise.all(
    ['325', '500', '700'].map((weight) => document.fonts.load(`${weight} 1em Gotham`)),
  );
  return {};
};

const preview: Preview = {
  loaders: [loadFonts],
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
            'Card',
            ['Docs', 'Playground', '*'],
            'Checkbox',
            ['Docs', 'Playground', '*'],
            'Inline Message',
            ['Docs', 'Playground', '*'],
            'Input Field',
            ['Docs', 'Playground', '*'],
            'Key-Value List',
            ['Docs', 'Playground', '*'],
            'Loading Spinner',
            ['Docs', 'Playground', '*'],
            'Password Input',
            ['Docs', 'Playground', '*'],
            'Radio Group',
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
