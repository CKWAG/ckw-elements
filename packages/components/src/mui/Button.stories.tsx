import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

function PlaceholderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004ZM8.27349 5.84828C8.54446 5.70327 8.87324 5.71916 9.12896 5.88963L10.5605 6.84401L11.4108 5.99375C11.7362 5.66832 12.2639 5.66832 12.5893 5.99375L13.4395 6.84401L14.8711 5.88963C15.1269 5.71916 15.4556 5.70327 15.7266 5.84828C15.9975 5.99329 16.1667 6.27567 16.1667 6.58301V9.08301C16.1667 10.1881 15.7277 11.2479 14.9463 12.0293C14.3644 12.6113 13.6279 13.0033 12.8334 13.1655V16.0604C13.0003 15.8158 13.2029 15.5704 13.4371 15.3362C14.4456 14.3277 15.659 13.9058 16.147 14.394C16.6352 14.8822 16.2134 16.0954 15.2049 17.104C14.476 17.8328 13.8418 18.2558 13.25 18.2497L12.8334 18.2494L11.1667 18.2497H10.75C10.1583 18.2558 9.52412 17.8328 8.79522 17.104C7.78669 16.0954 7.36484 14.8822 7.853 14.394C8.34116 13.9058 9.55446 14.3277 10.563 15.3362C10.7972 15.5704 10.9998 15.8158 11.1667 16.0604V13.1655C10.3722 13.0033 9.63575 12.6113 9.05377 12.0293C8.27236 11.2479 7.83337 10.1881 7.83337 9.08301V6.58301C7.83337 6.27567 8.00252 5.99329 8.27349 5.84828ZM9.50004 8.14011V9.08301C9.50004 9.74605 9.76343 10.3819 10.2323 10.8508C10.7011 11.3196 11.337 11.583 12 11.583C12.663 11.583 13.299 11.3196 13.7678 10.8508C14.2366 10.3819 14.5 9.74605 14.5 9.08301V8.14011L13.7956 8.60972C13.4651 8.83007 13.025 8.78648 12.7441 8.5056L12 7.76152L11.256 8.5056C10.975 8.78648 10.535 8.83007 10.2045 8.60972L9.50004 8.14011Z"
        fill="currentColor"
      />
    </svg>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          const indent = code.replace(/^/gm, '  ');
          return `import { ThemeProvider } from '@mui/material/styles';\nimport { ckwTheme } from '@ckw-elements/components/mui/theme';\nimport { Button } from '@ckw-elements/components/mui';\n\n<ThemeProvider theme={ckwTheme}>\n${indent}\n</ThemeProvider>`;
        },
      },
    },
  },
  argTypes: {
    children: {
      name: 'Text',
      description: 'Text content within the button.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    variant: {
      name: 'Variant',
      description:
        'Visual style variant. Primary → contained, Secondary → outlined, Tertiary → text.',
      control: { type: 'inline-radio' },
      options: ['Primary', 'Secondary', 'Tertiary'],
      table: { category: 'General', defaultValue: { summary: 'Primary' } },
    },
    size: {
      name: 'Size',
      description: 'Button size. Large and Medium are 48px height, Small is 40px.',
      control: { type: 'inline-radio' },
      options: ['Large', 'Medium', 'Small'],
      table: { category: 'General', defaultValue: { summary: 'Large' } },
    },
    fullWidth: {
      name: 'Full width',
      description: 'Stretch to fill the parent container width.',
      control: { type: 'boolean' },
      table: { category: 'General', defaultValue: { summary: 'false' } },
    },
    startIcon: {
      name: 'Start icon',
      description: 'Show an icon before the label.',
      control: { type: 'boolean' },
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    endIcon: {
      name: 'End icon',
      description: 'Show an icon after the label.',
      control: { type: 'boolean' },
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to true, makes the component appear inactive and disables its functionality.',
      control: { type: 'boolean' },
      table: { category: 'States', defaultValue: { summary: 'false' } },
    },
    onClick: { control: false, table: { disable: true } },
    htmlType: { control: false, table: { disable: true } },
    href: { control: false, table: { disable: true } },
    sx: { control: false, table: { disable: true } },
  },
  args: {
    children: 'Button',
    variant: 'Primary',
    size: 'Large',
    disabled: false,
    fullWidth: false,
    startIcon: false,
    endIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const MUIPlayground: Story = {
  name: 'MUI Playground',
  render: ({ startIcon, endIcon, ...args }) => {
    const showStart = Boolean(startIcon);
    const showEnd = Boolean(endIcon) && !showStart;
    return (
      <Button
        {...args}
        startIcon={showStart ? <PlaceholderIcon /> : undefined}
        endIcon={showEnd ? <PlaceholderIcon /> : undefined}
      />
    );
  },
};
