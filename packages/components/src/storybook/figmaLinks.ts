export interface FigmaReference {
  componentName: string;
  url: string;
  nodeId: string;
  scope: 'component-node' | 'foundation-node' | 'guide-node';
  note: string;
}

const figmaFileUrl =
  'https://www.figma.com/design/wGx1Y74QZIsy40UATyN6bI/%F0%9F%92%A0-CKW-Elements-%C2%B7-Design-System';

function getFigmaNodeUrl(nodeId: string) {
  return `${figmaFileUrl}?node-id=${nodeId.replace(':', '-')}&m=dev`;
}

export const ckwFigma = {
  fileUrl: figmaFileUrl,
  layoutGuideUrl: getFigmaNodeUrl('464:131'),
};

export const figmaReferences = {
  button: {
    componentName: 'Button',
    url: getFigmaNodeUrl('825:3416'),
    nodeId: '825:3416',
    scope: 'component-node',
    note: 'Exact Button component source in the CKW Elements Figma design system.',
  },
  inputField: {
    componentName: 'Input Field',
    url: getFigmaNodeUrl('100:443'),
    nodeId: '100:443',
    scope: 'component-node',
    note: 'Exact Input Field component source in the CKW Elements Figma design system.',
  },
  inlineMessage: {
    componentName: 'Inline Message',
    url: getFigmaNodeUrl('695:342'),
    nodeId: '695:342',
    scope: 'component-node',
    note: 'Exact Inline Message component source in the CKW Elements Figma design system.',
  },
  segmentedControl: {
    componentName: 'Segmented Control',
    url: getFigmaNodeUrl('928:624'),
    nodeId: '928:624',
    scope: 'component-node',
    note: 'Exact Segmented Control component source in the CKW Elements Figma design system.',
  },
  typography: {
    componentName: 'Typography',
    url: getFigmaNodeUrl('4:28'),
    nodeId: '4:28',
    scope: 'foundation-node',
    note: 'Typography foundation source in the CKW Elements Figma design system.',
  },
  colors: {
    componentName: 'Colors',
    url: getFigmaNodeUrl('2:73'),
    nodeId: '2:73',
    scope: 'foundation-node',
    note: 'Color foundation source in the CKW Elements Figma design system.',
  },
  spacings: {
    componentName: 'Spacings',
    url: getFigmaNodeUrl('2:74'),
    nodeId: '2:74',
    scope: 'foundation-node',
    note: 'Spacing foundation source in the CKW Elements Figma design system.',
  },
  borders: {
    componentName: 'Borders',
    url: getFigmaNodeUrl('106:1809'),
    nodeId: '106:1809',
    scope: 'foundation-node',
    note: 'Border foundation source in the CKW Elements Figma design system.',
  },
  shadows: {
    componentName: 'Shadows',
    url: getFigmaNodeUrl('2:76'),
    nodeId: '2:76',
    scope: 'foundation-node',
    note: 'Shadow foundation source in the CKW Elements Figma design system.',
  },
  icons: {
    componentName: 'Icons',
    url: getFigmaNodeUrl('164:2100'),
    nodeId: '164:2100',
    scope: 'foundation-node',
    note: 'Icon foundation and index source in the CKW Elements Figma design system.',
  },
  layoutGuide: {
    componentName: 'Layout Guide',
    url: getFigmaNodeUrl('464:131'),
    nodeId: '464:131',
    scope: 'guide-node',
    note: 'Layout guidance source in the CKW Elements Figma design system.',
  },
} satisfies Record<string, FigmaReference>;

/**
 * Returns a Storybook design parameter compatible with Figma design addons.
 */
export function getFigmaDesignParameter(reference: FigmaReference) {
  return {
    type: 'figma',
    url: reference.url,
  };
}
