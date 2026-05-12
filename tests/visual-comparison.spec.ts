import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'node:fs';
import * as path from 'node:path';

const SCREENSHOT_DIR = path.resolve('tests/screenshots');
const DIFF_DIR = path.resolve('tests/screenshots/diffs');

const THRESHOLD = 0.15;
const MAX_MISMATCH_PERCENT = 3;

interface ComparisonPair {
  name: string;
  react: string;
  mui: string;
  interaction?: 'none' | 'hover' | 'focus';
  targetSelector?: string;
  maxMismatchPercent?: number;
}

const BUTTON_PAIRS: ComparisonPair[] = [
  {
    name: 'button-primary-large',
    react: 'react-button-primary-large',
    mui: 'mui-button-primary-large',
  },
  {
    name: 'button-primary-medium',
    react: 'react-button-primary-medium',
    mui: 'mui-button-primary-medium',
  },
  {
    name: 'button-primary-small',
    react: 'react-button-primary-small',
    mui: 'mui-button-primary-small',
  },
  {
    name: 'button-secondary-large',
    react: 'react-button-secondary-large',
    mui: 'mui-button-secondary-large',
  },
  {
    name: 'button-secondary-medium',
    react: 'react-button-secondary-medium',
    mui: 'mui-button-secondary-medium',
  },
  {
    name: 'button-secondary-small',
    react: 'react-button-secondary-small',
    mui: 'mui-button-secondary-small',
  },
  {
    name: 'button-tertiary-large',
    react: 'react-button-tertiary-large',
    mui: 'mui-button-tertiary-large',
  },
  {
    name: 'button-tertiary-medium',
    react: 'react-button-tertiary-medium',
    mui: 'mui-button-tertiary-medium',
  },
  {
    name: 'button-tertiary-small',
    react: 'react-button-tertiary-small',
    mui: 'mui-button-tertiary-small',
  },
  {
    name: 'button-primary-disabled',
    react: 'react-button-primary-disabled',
    mui: 'mui-button-primary-disabled',
  },
  {
    name: 'button-secondary-disabled',
    react: 'react-button-secondary-disabled',
    mui: 'mui-button-secondary-disabled',
  },
  {
    name: 'button-tertiary-disabled',
    react: 'react-button-tertiary-disabled',
    mui: 'mui-button-tertiary-disabled',
  },
  { name: 'button-with-icon', react: 'react-button-with-icon', mui: 'mui-button-with-icon' },
];

const INPUT_PAIRS: ComparisonPair[] = [
  { name: 'input-default', react: 'react-input-default', mui: 'mui-input-default' },
  { name: 'input-filled', react: 'react-input-filled', mui: 'mui-input-filled' },
  { name: 'input-error', react: 'react-input-error', mui: 'mui-input-error' },
  { name: 'input-disabled', react: 'react-input-disabled', mui: 'mui-input-disabled' },
  { name: 'input-optional', react: 'react-input-optional', mui: 'mui-input-optional' },
  { name: 'input-with-icon', react: 'react-input-with-icon', mui: 'mui-input-with-icon' },
];

const SEGMENT_PAIRS: ComparisonPair[] = [
  { name: 'segment-default', react: 'react-segment-default', mui: 'mui-segment-default' },
  { name: 'segment-fill', react: 'react-segment-fill', mui: 'mui-segment-fill' },
  { name: 'segment-icon-label', react: 'react-segment-icon-label', mui: 'mui-segment-icon-label' },
  {
    name: 'segment-icon-compact',
    react: 'react-segment-icon-compact',
    mui: 'mui-segment-icon-compact',
  },
  {
    name: 'segment-middle-active',
    react: 'react-segment-middle-active',
    mui: 'mui-segment-middle-active',
  },
];

const INTERACTION_PAIRS: ComparisonPair[] = [
  {
    name: 'button-primary-large-hover',
    react: 'react-button-primary-large',
    mui: 'mui-button-primary-large',
    interaction: 'hover',
    targetSelector: '.ckw-button, .MuiButton-root, button',
    maxMismatchPercent: 8,
  },
  {
    name: 'button-primary-large-focus',
    react: 'react-button-primary-large',
    mui: 'mui-button-primary-large',
    interaction: 'focus',
    targetSelector: '.ckw-button, .MuiButton-root, button',
    maxMismatchPercent: 8,
  },
  {
    name: 'input-default-hover',
    react: 'react-input-default',
    mui: 'mui-input-default',
    interaction: 'hover',
    targetSelector: '.ckw-input-field__inner, .MuiOutlinedInput-root, input',
    maxMismatchPercent: 8,
  },
  {
    name: 'input-default-focus',
    react: 'react-input-default',
    mui: 'mui-input-default',
    interaction: 'focus',
    targetSelector: 'input',
    maxMismatchPercent: 8,
  },
  {
    name: 'segment-default-hover',
    react: 'react-segment-default',
    mui: 'mui-segment-default',
    interaction: 'hover',
    targetSelector: '[role="tab"], .MuiToggleButton-root, button',
    maxMismatchPercent: 8,
  },
  {
    name: 'segment-default-focus',
    react: 'react-segment-default',
    mui: 'mui-segment-default',
    interaction: 'focus',
    targetSelector: '[role="tab"], .MuiToggleButton-root, button',
    maxMismatchPercent: 8,
  },
];

const ALL_PAIRS = [...BUTTON_PAIRS, ...INPUT_PAIRS, ...SEGMENT_PAIRS, ...INTERACTION_PAIRS];

function storyUrl(storyId: string): string {
  return `/iframe.html?id=tests-fixtures--${storyId}&viewMode=story`;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function captureStory(
  page: import('@playwright/test').Page,
  storyId: string,
): Promise<Buffer> {
  await page.goto(storyUrl(storyId));

  const root = page.locator('#storybook-root > *').first();
  await root.waitFor({ state: 'visible', timeout: 10_000 });

  return await root.screenshot();
}

async function applyInteraction(
  page: import('@playwright/test').Page,
  pair: ComparisonPair,
  interaction: 'none' | 'hover' | 'focus',
): Promise<void> {
  if (interaction === 'none') return;

  const selectors = pair.targetSelector
    ? pair.targetSelector.split(',').map((s) => s.trim())
    : ['button', 'input', '[role="tab"]'];

  const storyRoot = page.locator('#storybook-root');

  for (const selector of selectors) {
    const locator = storyRoot.locator(selector).filter({ visible: true }).first();
    if ((await locator.count()) === 0) {
      continue;
    }

    if (interaction === 'hover') {
      await locator.hover();
    } else {
      await locator.focus();
    }
    await page.waitForTimeout(120);
    return;
  }
}

function compareScreenshots(
  reactBuffer: Buffer,
  muiBuffer: Buffer,
  diffPath: string,
): { mismatchPercent: number; totalPixels: number; diffPixels: number } {
  const reactPng = PNG.sync.read(reactBuffer);
  const muiPng = PNG.sync.read(muiBuffer);

  const width = Math.max(reactPng.width, muiPng.width);
  const height = Math.max(reactPng.height, muiPng.height);

  const normalizedReact = new PNG({ width, height });
  const normalizedMui = new PNG({ width, height });

  normalizedReact.data.fill(255);
  normalizedMui.data.fill(255);

  PNG.bitblt(reactPng, normalizedReact, 0, 0, reactPng.width, reactPng.height, 0, 0);
  PNG.bitblt(muiPng, normalizedMui, 0, 0, muiPng.width, muiPng.height, 0, 0);

  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(
    normalizedReact.data,
    normalizedMui.data,
    diff.data,
    width,
    height,
    { threshold: THRESHOLD },
  );

  const totalPixels = width * height;
  const mismatchPercent = (diffPixels / totalPixels) * 100;

  if (diffPixels > 0) {
    ensureDir(path.dirname(diffPath));
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  return { mismatchPercent, totalPixels, diffPixels };
}

test.describe('Visual Comparison: React vs MUI', () => {
  test.beforeAll(() => {
    ensureDir(SCREENSHOT_DIR);
    ensureDir(DIFF_DIR);
  });

  for (const pair of ALL_PAIRS) {
    test(`${pair.name}: React matches MUI within ${MAX_MISMATCH_PERCENT}% tolerance`, async ({
      page,
    }) => {
      await captureStory(page, pair.react);
      await applyInteraction(page, pair, pair.interaction ?? 'none');
      const finalReactScreenshot = await page.locator('#storybook-root > *').first().screenshot();

      await captureStory(page, pair.mui);
      await applyInteraction(page, pair, pair.interaction ?? 'none');
      const finalMuiScreenshot = await page.locator('#storybook-root > *').first().screenshot();

      const allowedMismatch = pair.maxMismatchPercent ?? MAX_MISMATCH_PERCENT;

      fs.writeFileSync(path.join(SCREENSHOT_DIR, `${pair.name}--react.png`), finalReactScreenshot);
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `${pair.name}--mui.png`), finalMuiScreenshot);

      const diffPath = path.join(DIFF_DIR, `${pair.name}--diff.png`);
      const { mismatchPercent, diffPixels, totalPixels } = compareScreenshots(
        finalReactScreenshot,
        finalMuiScreenshot,
        diffPath,
      );

      const message = [
        `${pair.name}: ${mismatchPercent.toFixed(2)}% pixel difference`,
        `(${diffPixels}/${totalPixels} pixels)`,
        diffPixels > 0 ? `Diff image: ${diffPath}` : '',
      ]
        .filter(Boolean)
        .join(' ');

      expect(mismatchPercent, message).toBeLessThanOrEqual(allowedMismatch);
    });
  }
});
