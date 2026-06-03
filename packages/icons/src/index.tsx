import React from 'react';

export const iconNames = [
  'account-tie',
  'add',
  'add-circle',
  'arrow-down',
  'arrow-down-circle',
  'arrow-down-circle-filled',
  'arrow-left',
  'arrow-left-circle',
  'arrow-left-circle-filled',
  'arrow-right',
  'arrow-right-circle',
  'arrow-right-circle-filled',
  'arrow-up',
  'arrow-up-circle',
  'arrow-up-circle-filled',
  'arrow-up-right',
  'bank',
  'bar-graph',
  'bar-graph-rising',
  'battery',
  'bin',
  'box',
  'box-filled',
  'building',
  'calendar',
  'calendar-blank',
  'calendar-restricted',
  'check',
  'check-box',
  'check-circle-filled',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-up-down',
  'circle',
  'clock',
  'clock-quarter',
  'close',
  'close-circle-filled',
  'cloudy',
  'coins',
  'download',
  'envelopes',
  'external-link',
  'faq',
  'file',
  'file-download',
  'file-upload',
  'graph-ascend',
  'heart',
  'heater',
  'high-voltage-pole',
  'hourglass',
  'house',
  'house-filled',
  'hyperlink',
  'hyperlink-break',
  'inbox',
  'information',
  'keys',
  'leaf',
  'letter',
  'lightbulb',
  'lightning',
  'lightning-filled',
  'list',
  'lock',
  'log-out',
  'log-out-door',
  'megaphone',
  'message',
  'meter',
  'minus-circle',
  'no-fire',
  'oven',
  'paper',
  'paper-filled',
  'paperclip',
  'pencil',
  'people',
  'phone',
  'placeholder',
  'plug',
  'plug-filled',
  'plus',
  'power-button',
  'price-tag',
  'qr-code',
  'question',
  'question-filled',
  'reactive-energy',
  'redo-arrow',
  'ruler',
  'search',
  'security',
  'settings',
  'shopping-cart',
  'snowflake',
  'solar-panel',
  'standard-badge',
  'swap',
  'table',
  'television',
  'terminated-contract',
  'transaction',
  'uncheck-box',
  'upload',
  'view-off',
  'view-on',
  'warning',
  'warning-circle',
  'warning-circle-filled',
  'warning-filled',
  'washing-machine',
] as const;

export type IconName = (typeof iconNames)[number];

export interface IconMetadata {
  name: IconName;
  componentName: string;
  figmaNodeId: string;
}

export const iconMetadata = [
  { name: 'account-tie', componentName: 'IconAccountTie', figmaNodeId: '174:856' },
  { name: 'add', componentName: 'IconAdd', figmaNodeId: '491:588' },
  { name: 'add-circle', componentName: 'IconAddCircle', figmaNodeId: '164:3256' },
  { name: 'arrow-down', componentName: 'IconArrowDown', figmaNodeId: '164:3260' },
  { name: 'arrow-down-circle', componentName: 'IconArrowDownCircle', figmaNodeId: '491:660' },
  {
    name: 'arrow-down-circle-filled',
    componentName: 'IconArrowDownCircleFilled',
    figmaNodeId: '491:661',
  },
  { name: 'arrow-left', componentName: 'IconArrowLeft', figmaNodeId: '174:741' },
  { name: 'arrow-left-circle', componentName: 'IconArrowLeftCircle', figmaNodeId: '491:714' },
  {
    name: 'arrow-left-circle-filled',
    componentName: 'IconArrowLeftCircleFilled',
    figmaNodeId: '491:689',
  },
  { name: 'arrow-right', componentName: 'IconArrowRight', figmaNodeId: '174:750' },
  { name: 'arrow-right-circle', componentName: 'IconArrowRightCircle', figmaNodeId: '491:715' },
  {
    name: 'arrow-right-circle-filled',
    componentName: 'IconArrowRightCircleFilled',
    figmaNodeId: '491:695',
  },
  { name: 'arrow-up', componentName: 'IconArrowUp', figmaNodeId: '174:749' },
  { name: 'arrow-up-circle', componentName: 'IconArrowUpCircle', figmaNodeId: '491:716' },
  {
    name: 'arrow-up-circle-filled',
    componentName: 'IconArrowUpCircleFilled',
    figmaNodeId: '491:701',
  },
  { name: 'arrow-up-right', componentName: 'IconArrowUpRight', figmaNodeId: '174:744' },
  { name: 'bank', componentName: 'IconBank', figmaNodeId: '174:797' },
  { name: 'bar-graph', componentName: 'IconBarGraph', figmaNodeId: '324:5946' },
  { name: 'bar-graph-rising', componentName: 'IconBarGraphRising', figmaNodeId: '174:813' },
  { name: 'battery', componentName: 'IconBattery', figmaNodeId: '1317:720' },
  { name: 'bin', componentName: 'IconBin', figmaNodeId: '174:829' },
  { name: 'box', componentName: 'IconBox', figmaNodeId: '174:830' },
  { name: 'box-filled', componentName: 'IconBoxFilled', figmaNodeId: '628:5805' },
  { name: 'building', componentName: 'IconBuilding', figmaNodeId: '492:696' },
  { name: 'calendar', componentName: 'IconCalendar', figmaNodeId: '174:875' },
  { name: 'calendar-blank', componentName: 'IconCalendarBlank', figmaNodeId: '174:877' },
  { name: 'calendar-restricted', componentName: 'IconCalendarRestricted', figmaNodeId: '174:876' },
  { name: 'check', componentName: 'IconCheck', figmaNodeId: '174:917' },
  { name: 'check-box', componentName: 'IconCheckBox', figmaNodeId: '491:653' },
  { name: 'check-circle-filled', componentName: 'IconCheckCircleFilled', figmaNodeId: '176:945' },
  { name: 'chevron-down', componentName: 'IconChevronDown', figmaNodeId: '177:1013' },
  { name: 'chevron-left', componentName: 'IconChevronLeft', figmaNodeId: '177:976' },
  { name: 'chevron-right', componentName: 'IconChevronRight', figmaNodeId: '177:975' },
  { name: 'chevron-up', componentName: 'IconChevronUp', figmaNodeId: '177:977' },
  { name: 'chevron-up-down', componentName: 'IconChevronUpDown', figmaNodeId: '805:243' },
  { name: 'circle', componentName: 'IconCircle', figmaNodeId: '177:1538' },
  { name: 'clock', componentName: 'IconClock', figmaNodeId: '491:786' },
  { name: 'clock-quarter', componentName: 'IconClockQuarter', figmaNodeId: '491:800' },
  { name: 'close', componentName: 'IconClose', figmaNodeId: '491:824' },
  { name: 'close-circle-filled', componentName: 'IconCloseCircleFilled', figmaNodeId: '491:838' },
  { name: 'cloudy', componentName: 'IconCloudy', figmaNodeId: '491:842' },
  { name: 'coins', componentName: 'IconCoins', figmaNodeId: '326:6453' },
  { name: 'download', componentName: 'IconDownload', figmaNodeId: '537:545' },
  { name: 'envelopes', componentName: 'IconEnvelopes', figmaNodeId: '491:856' },
  { name: 'external-link', componentName: 'IconExternalLink', figmaNodeId: '492:461' },
  { name: 'faq', componentName: 'IconFaq', figmaNodeId: '537:573' },
  { name: 'file', componentName: 'IconFile', figmaNodeId: '492:104' },
  { name: 'file-download', componentName: 'IconFileDownload', figmaNodeId: '492:107' },
  { name: 'file-upload', componentName: 'IconFileUpload', figmaNodeId: '492:110' },
  { name: 'graph-ascend', componentName: 'IconGraphAscend', figmaNodeId: '492:168' },
  { name: 'heart', componentName: 'IconHeart', figmaNodeId: '535:984' },
  { name: 'heater', componentName: 'IconHeater', figmaNodeId: '492:182' },
  { name: 'high-voltage-pole', componentName: 'IconHighVoltagePole', figmaNodeId: '495:146' },
  { name: 'hourglass', componentName: 'IconHourglass', figmaNodeId: '492:186' },
  { name: 'house', componentName: 'IconHouse', figmaNodeId: '373:797' },
  { name: 'house-filled', componentName: 'IconHouseFilled', figmaNodeId: '625:5762' },
  { name: 'hyperlink', componentName: 'IconHyperlink', figmaNodeId: '492:475' },
  { name: 'hyperlink-break', componentName: 'IconHyperlinkBreak', figmaNodeId: '535:942' },
  { name: 'inbox', componentName: 'IconInbox', figmaNodeId: '492:746' },
  { name: 'information', componentName: 'IconInformation', figmaNodeId: '492:545' },
  { name: 'keys', componentName: 'IconKeys', figmaNodeId: '492:561' },
  { name: 'leaf', componentName: 'IconLeaf', figmaNodeId: '492:577' },
  { name: 'letter', componentName: 'IconLetter', figmaNodeId: '535:988' },
  { name: 'lightbulb', componentName: 'IconLightbulb', figmaNodeId: '492:581' },
  { name: 'lightning', componentName: 'IconLightning', figmaNodeId: '492:601' },
  { name: 'lightning-filled', componentName: 'IconLightningFilled', figmaNodeId: '625:5787' },
  { name: 'list', componentName: 'IconList', figmaNodeId: '492:597' },
  { name: 'lock', componentName: 'IconLock', figmaNodeId: '492:598' },
  { name: 'log-out', componentName: 'IconLogOut', figmaNodeId: '492:637' },
  { name: 'log-out-door', componentName: 'IconLogOutDoor', figmaNodeId: '492:651' },
  { name: 'megaphone', componentName: 'IconMegaphone', figmaNodeId: '492:732' },
  { name: 'message', componentName: 'IconMessage', figmaNodeId: '492:750' },
  { name: 'meter', componentName: 'IconMeter', figmaNodeId: '537:559' },
  { name: 'minus-circle', componentName: 'IconMinusCircle', figmaNodeId: '492:754' },
  { name: 'no-fire', componentName: 'IconNoFire', figmaNodeId: '492:779' },
  { name: 'oven', componentName: 'IconOven', figmaNodeId: '492:795' },
  { name: 'paper', componentName: 'IconPaper', figmaNodeId: '495:132' },
  { name: 'paper-filled', componentName: 'IconPaperFilled', figmaNodeId: '625:5801' },
  { name: 'paperclip', componentName: 'IconPaperclip', figmaNodeId: '493:127' },
  { name: 'pencil', componentName: 'IconPencil', figmaNodeId: '493:141' },
  { name: 'people', componentName: 'IconPeople', figmaNodeId: '535:794' },
  { name: 'phone', componentName: 'IconPhone', figmaNodeId: '496:179' },
  { name: 'placeholder', componentName: 'IconPlaceholder', figmaNodeId: '324:5980' },
  { name: 'plug', componentName: 'IconPlug', figmaNodeId: '533:506' },
  { name: 'plug-filled', componentName: 'IconPlugFilled', figmaNodeId: '1033:792' },
  { name: 'plus', componentName: 'IconPlus', figmaNodeId: '164:3240' },
  { name: 'power-button', componentName: 'IconPowerButton', figmaNodeId: '493:155' },
  { name: 'price-tag', componentName: 'IconPriceTag', figmaNodeId: '535:970' },
  { name: 'qr-code', componentName: 'IconQrCode', figmaNodeId: '533:523' },
  { name: 'question', componentName: 'IconQuestion', figmaNodeId: '533:531' },
  { name: 'question-filled', componentName: 'IconQuestionFilled', figmaNodeId: '535:956' },
  { name: 'reactive-energy', componentName: 'IconReactiveEnergy', figmaNodeId: '324:5958' },
  { name: 'redo-arrow', componentName: 'IconRedoArrow', figmaNodeId: '533:565' },
  { name: 'ruler', componentName: 'IconRuler', figmaNodeId: '533:569' },
  { name: 'search', componentName: 'IconSearch', figmaNodeId: '533:615' },
  { name: 'security', componentName: 'IconSecurity', figmaNodeId: '533:619' },
  { name: 'settings', componentName: 'IconSettings', figmaNodeId: '533:623' },
  { name: 'shopping-cart', componentName: 'IconShoppingCart', figmaNodeId: '533:637' },
  { name: 'snowflake', componentName: 'IconSnowflake', figmaNodeId: '533:651' },
  { name: 'solar-panel', componentName: 'IconSolarPanel', figmaNodeId: '1316:686' },
  { name: 'standard-badge', componentName: 'IconStandardBadge', figmaNodeId: '537:577' },
  { name: 'swap', componentName: 'IconSwap', figmaNodeId: '534:665' },
  { name: 'table', componentName: 'IconTable', figmaNodeId: '535:1012' },
  { name: 'television', componentName: 'IconTelevision', figmaNodeId: '534:669' },
  { name: 'terminated-contract', componentName: 'IconTerminatedContract', figmaNodeId: '1199:470' },
  { name: 'transaction', componentName: 'IconTransaction', figmaNodeId: '535:743' },
  { name: 'uncheck-box', componentName: 'IconUncheckBox', figmaNodeId: '491:655' },
  { name: 'upload', componentName: 'IconUpload', figmaNodeId: '535:780' },
  { name: 'view-off', componentName: 'IconViewOff', figmaNodeId: '535:839' },
  { name: 'view-on', componentName: 'IconViewOn', figmaNodeId: '535:838' },
  { name: 'warning', componentName: 'IconWarning', figmaNodeId: '535:868' },
  { name: 'warning-circle', componentName: 'IconWarningCircle', figmaNodeId: '535:896' },
  {
    name: 'warning-circle-filled',
    componentName: 'IconWarningCircleFilled',
    figmaNodeId: '535:897',
  },
  { name: 'warning-filled', componentName: 'IconWarningFilled', figmaNodeId: '535:869' },
  { name: 'washing-machine', componentName: 'IconWashingMachine', figmaNodeId: '535:902' },
] as const satisfies readonly IconMetadata[];

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Accessible label. Omit for decorative icons. */
  title?: string;
  /** Icon width and height. Defaults to 24. */
  size?: number | string;
}

export type IconComponent = (props: IconProps) => React.ReactElement;

export interface IconByNameProps extends IconProps {
  /** Icon name from the CKW Elements icon set. */
  name: IconName;
}

function getAccessibilityProps(title: string | undefined): React.SVGProps<SVGSVGElement> {
  return title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
}

/** Renders the account tie icon from the CKW Elements Figma icon set. */
export function IconAccountTie({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8334 13.6665C14.3799 13.6683 15.8625 14.2836 16.9561 15.3772C18.0496 16.4707 18.6649 17.9533 18.6667 19.4998V20.3332H5.33337V19.4998C5.33518 17.9533 5.95044 16.4707 7.04398 15.3772C8.13756 14.2836 9.62019 13.6683 11.1667 13.6665H12.8334ZM10.2967 15.4349C9.50543 15.6039 8.77989 15.9996 8.20935 16.5734C7.63898 17.1472 7.24752 17.8744 7.08305 18.6665H10.6109L11.1667 16.9998L10.2967 15.4349ZM12.7504 16.9998L13.3615 18.6665H16.917C16.7485 17.849 16.3389 17.1006 15.7411 16.5181C15.1432 15.9355 14.3842 15.5455 13.5625 15.3983L12.7504 16.9998ZM10.4058 4.81724C11.1671 4.50195 12.0049 4.41966 12.813 4.58042C13.6212 4.7412 14.3634 5.13792 14.946 5.72055C15.5287 6.30322 15.9261 7.04535 16.087 7.85353C16.2477 8.66179 16.1647 9.50021 15.8493 10.2616C15.534 11.0226 15.0002 11.6731 14.3153 12.1308C13.6301 12.5888 12.8241 12.8332 12 12.8332C10.8954 12.8318 9.83601 12.3928 9.05489 11.6117C8.27382 10.8306 7.8347 9.77115 7.83337 8.66652C7.83341 7.84254 8.07793 7.0372 8.53568 6.35206C8.99352 5.66686 9.64444 5.1326 10.4058 4.81724ZM12 6.16652C11.337 6.16652 10.7013 6.43015 10.2325 6.89894C9.76366 7.36775 9.50008 8.00354 9.50004 8.66652C9.50004 9.16097 9.64689 9.64455 9.92159 10.0557C10.1962 10.4666 10.5864 10.7868 11.043 10.9761C11.4998 11.1653 12.0026 11.2149 12.4875 11.1185C12.9725 11.022 13.418 10.7838 13.7676 10.4341C14.1171 10.0846 14.3555 9.63957 14.452 9.1548C14.5485 8.66993 14.4988 8.16705 14.3096 7.7103C14.1205 7.25355 13.8002 6.86276 13.3892 6.58807C12.978 6.31336 12.4945 6.16652 12 6.16652Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the add icon from the CKW Elements Figma icon set. */
export function IconAdd({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8334 11.1667H21.1667V12.8333H12.8334V21.1667H11.1667V12.8333H2.83337V11.1667H11.1667V2.83334H12.8334V11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the add circle icon from the CKW Elements Figma icon set. */
export function IconAddCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.1667 17V12.8333H7V11.1667H11.1667V7H12.8333V11.1667H17V12.8333H12.8333V17H11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow down icon from the CKW Elements Figma icon set. */
export function IconArrowDown({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8333 19.1549L17.8927 14.0955L19.0711 15.2739L12.5891 21.7558C12.2637 22.0812 11.7362 22.0812 11.4108 21.7558L4.92883 15.2739L6.10722 14.0955L11.1666 19.1549V2H12.8333V19.1549Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow down circle icon from the CKW Elements Figma icon set. */
export function IconArrowDownCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.8333 7V14.1548L14.7441 12.2441L15.9226 13.4226L12.5892 16.7559C12.2638 17.0813 11.7362 17.0813 11.4108 16.7559L8.07741 13.4226L9.25593 12.2441L11.1667 14.1548V7H12.8333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow down circle filled icon from the CKW Elements Figma icon set. */
export function IconArrowDownCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.75 13.5656L9.13388 11.9494L7.36612 13.7172L11.1161 17.4672C11.6042 17.9553 12.3958 17.9553 12.8839 17.4672L16.6339 13.7172L14.8661 11.9494L13.25 13.5656V6.16667H10.75V13.5656Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow left icon from the CKW Elements Figma icon set. */
export function IconArrowLeft({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M9.9045 6.10728L4.84509 11.1667H22V12.8334H4.84509L9.9045 17.8928L8.72612 19.0712L2.24419 12.5892C1.91876 12.2638 1.91878 11.7363 2.24419 11.4109L8.72612 4.92889L9.9045 6.10728Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow left circle icon from the CKW Elements Figma icon set. */
export function IconArrowLeftCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.66667C16.6024 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6024 20.3333 12 20.3333C7.39767 20.3333 3.66667 16.6023 3.66667 12C3.66667 7.39762 7.39767 3.66667 12 3.66667ZM22 12C22 6.47715 17.5229 2 12 2C6.47717 2 2 6.47715 2 12C2 17.5228 6.47717 22 12 22C17.5229 22 22 17.5228 22 12ZM17 12.8333H9.84517L11.7559 14.7441L10.5774 15.9226L7.24408 12.5892C6.91867 12.2638 6.91867 11.7362 7.24408 11.4108L10.5774 8.07741L11.7559 9.25593L9.84517 11.1667H17V12.8333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow left circle filled icon from the CKW Elements Figma icon set. */
export function IconArrowLeftCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 17.5228 6.47717 22 12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.47717 2 2 6.47715 2 12ZM10.4344 10.75L12.0506 9.13388L10.2828 7.36612L6.53275 11.1161C6.04467 11.6042 6.04467 12.3958 6.53275 12.8839L10.2828 16.6339L12.0506 14.8661L10.4344 13.25H17.8333V10.75H10.4344Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow right icon from the CKW Elements Figma icon set. */
export function IconArrowRight({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.7558 11.4108C22.0812 11.7362 22.0812 12.2637 21.7558 12.5891L15.2739 19.0711L14.0955 17.8927L19.1549 12.8333H2V11.1666H19.1549L14.0955 6.10722L15.2739 4.92883L21.7558 11.4108Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow right circle icon from the CKW Elements Figma icon set. */
export function IconArrowRightCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20.3333C7.39762 20.3333 3.66667 16.6024 3.66667 12C3.66667 7.39767 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39767 20.3333 12C20.3333 16.6024 16.6023 20.3333 12 20.3333ZM2 12C2 17.5229 6.47715 22 12 22C17.5228 22 22 17.5229 22 12C22 6.47717 17.5228 2 12 2C6.47715 2 2 6.47717 2 12ZM7 11.1667H14.1548L12.2441 9.25592L13.4226 8.07742L16.7559 11.4108C17.0813 11.7362 17.0813 12.2638 16.7559 12.5892L13.4226 15.9226L12.2441 14.7441L14.1548 12.8333H7V11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow right circle filled icon from the CKW Elements Figma icon set. */
export function IconArrowRightCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 6.47717 17.5228 2 12 2C6.47715 2 2 6.47717 2 12C2 17.5229 6.47715 22 12 22C17.5228 22 22 17.5229 22 12ZM13.5656 13.25L11.9494 14.8661L13.7172 16.6339L17.4672 12.8839C17.9553 12.3958 17.9553 11.6042 17.4672 11.1161L13.7172 7.36608L11.9494 9.13392L13.5656 10.75H6.16667V13.25H13.5656Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow up icon from the CKW Elements Figma icon set. */
export function IconArrowUp({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M11.4108 2.24419C11.7362 1.91878 12.2637 1.91876 12.5891 2.24419L19.0711 8.72612L17.8927 9.9045L12.8333 4.84509V22H11.1666V4.84509L6.10722 9.9045L4.92883 8.72612L11.4108 2.24419Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow up circle icon from the CKW Elements Figma icon set. */
export function IconArrowUpCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3333 12C20.3333 16.6024 16.6024 20.3333 12 20.3333C7.39767 20.3333 3.66667 16.6024 3.66667 12C3.66667 7.39767 7.39767 3.66667 12 3.66667C16.6024 3.66667 20.3333 7.39767 20.3333 12ZM12 22C17.5229 22 22 17.5229 22 12C22 6.47717 17.5229 2 12 2C6.47717 2 2 6.47717 2 12C2 17.5229 6.47717 22 12 22ZM11.1667 17V9.84517L9.25592 11.7559L8.07742 10.5774L11.4108 7.24408C11.7362 6.91867 12.2638 6.91867 12.5892 7.24408L15.9226 10.5774L14.7441 11.7559L12.8333 9.84517V17H11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow up circle filled icon from the CKW Elements Figma icon set. */
export function IconArrowUpCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47717 2 2 6.47717 2 12C2 17.5229 6.47717 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47717 17.5229 2 12 2ZM13.25 10.4344L14.8661 12.0506L16.6339 10.2828L12.8839 6.53275C12.3958 6.04467 11.6042 6.04467 11.1161 6.53275L7.36608 10.2828L9.13392 12.0506L10.75 10.4344V17.8333H13.25V10.4344Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the arrow up right icon from the CKW Elements Figma icon set. */
export function IconArrowUpRight({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1667 2H12.0001V3.66667H19.1549L2.24414 20.5774L3.42265 21.7559L20.3334 4.84518V12H22.0001V2.83333C22.0001 2.3731 21.627 2 21.1667 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the bank icon from the CKW Elements Figma icon set. */
export function IconBank({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.1663 21.1667H2.83299V19.5H21.1663V21.1667ZM6.99966 18.25H5.33299V11.5833H6.99966V18.25ZM10.8888 18.25H9.22215V11.5833H10.8888V18.25ZM14.778 18.25H13.1113V11.5833H14.778V18.25ZM18.6663 18.25H16.9997V11.5833H18.6663V18.25ZM11.6334 2.91798C11.9025 2.78626 12.2263 2.80842 12.4773 2.9839L20.8107 8.81723C21.1087 9.02581 21.2374 9.40376 21.1281 9.75066C21.0187 10.0975 20.6967 10.3333 20.333 10.3333H3.66633C3.30275 10.3332 2.98056 10.0974 2.87124 9.75066C2.76199 9.40388 2.89084 9.02582 3.18863 8.81723L11.5219 2.9839L11.6334 2.91798ZM6.30955 8.66668H17.6898L11.9997 4.68312L6.30955 8.66668Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the bar graph icon from the CKW Elements Figma icon set. */
export function IconBarGraph({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M16.8333 3C16.3731 3 16 3.37309 16 3.83333V20.1666C16 20.6269 16.3731 20.9999 16.8333 20.9999H20.1667C20.6269 20.9999 21 20.6269 21 20.1666V3.83333C21 3.37309 20.6269 3 20.1667 3H16.8333ZM10.3333 10.9999C9.87309 10.9999 9.5 11.373 9.5 11.8333V20.1666C9.5 20.6269 9.87309 20.9999 10.3333 20.9999H13.6667C14.1269 20.9999 14.5 20.6269 14.5 20.1666V11.8333C14.5 11.373 14.1269 10.9999 13.6667 10.9999H10.3333ZM3.83333 7C3.3731 7 3 7.37308 3 7.83333L3 20.1666C3 20.6269 3.3731 20.9999 3.83333 20.9999H7.16667C7.6269 20.9999 8 20.6269 8 20.1666V7.83333C8 7.37308 7.6269 7 7.16667 7H3.83333ZM19.3333 19.3333H17.6667V4.66667H19.3333V19.3333ZM12.8333 19.3333H11.1667V12.6666H12.8333V19.3333ZM6.33333 19.3333H4.66667L4.66667 8.66667H6.33333V19.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the bar graph rising icon from the CKW Elements Figma icon set. */
export function IconBarGraphRising({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M17.8333 9.5C17.3731 9.5 17 9.87309 17 10.3333V21.1667C17 21.6269 17.3731 22 17.8333 22H21.1667C21.6269 22 22 21.6269 22 21.1667V10.3333C22 9.87309 21.6269 9.5 21.1667 9.5H17.8333ZM10.3333 12C9.87309 12 9.5 12.3731 9.5 12.8333V21.1667C9.5 21.6269 9.87309 22 10.3333 22H13.6667C14.1269 22 14.5 21.6269 14.5 21.1667V12.8333C14.5 12.3731 14.1269 12 13.6667 12H10.3333ZM2.83333 14.5C2.3731 14.5 2 14.8731 2 15.3333V21.1667C2 21.6269 2.3731 22 2.83333 22H6.16667C6.6269 22 7 21.6269 7 21.1667V15.3333C7 14.8731 6.6269 14.5 6.16667 14.5H2.83333ZM20.3333 20.3333H18.6667V11.1667H20.3333V20.3333ZM12.8333 20.3333H11.1667V13.6667H12.8333V20.3333ZM5.33333 20.3333H3.66667V16.1667H5.33333V20.3333ZM13.4942 4.32748L9.91667 7.90495L7.58919 5.57748C7.26376 5.25203 6.73624 5.25203 6.41081 5.57748L2.24414 9.74414L3.42253 10.9225L7 7.34505L9.32748 9.67252L9.39095 9.72949C9.71826 9.99645 10.2008 9.97762 10.5058 9.67252L14.6725 5.50586L17 7.83333V2H11.1667L13.4942 4.32748Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the battery icon from the CKW Elements Figma icon set. */
export function IconBattery({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M14.5 2C14.9603 2 15.3334 2.3731 15.3334 2.83333V4.5H17.8334C18.2936 4.5 18.6667 4.8731 18.6667 5.33333V21.1667C18.6667 21.6269 18.2936 22 17.8334 22H6.16671C5.70647 22 5.33337 21.6269 5.33337 21.1667V5.33333C5.33337 4.8731 5.70647 4.5 6.16671 4.5H8.66671V2.83333C8.66671 2.3731 9.03981 2 9.50004 2H14.5ZM10.3334 5.33333C10.3334 5.79357 9.96027 6.16667 9.50004 6.16667H7.00004V20.3333H17V6.16667H14.5C14.0398 6.16667 13.6667 5.79357 13.6667 5.33333V3.66667H10.3334V5.33333ZM12.6665 12.2083H15.3334L11.3335 17.8333V13.4583H8.66671L12.6665 7.83333V12.2083Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the bin icon from the CKW Elements Figma icon set. */
export function IconBin({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2542 4.49992H22V2.83325H2V4.49992H3.74584L5.33747 20.4162C5.38007 20.8422 5.73854 21.1666 6.16667 21.1666H17.8333C18.2615 21.1666 18.6199 20.8422 18.6625 20.4162L20.2542 4.49992ZM18.5792 4.49992H5.42083L6.92083 19.4999H17.0792L18.5792 4.49992ZM8.875 16.1666V7.83325H10.5417V16.1666H8.875ZM13.4583 7.83325V16.1666H15.125V7.83325H13.4583Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the box icon from the CKW Elements Figma icon set. */
export function IconBox({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M11.7413 2.87485C11.9375 2.81072 12.1516 2.82108 12.3419 2.9066L20.6752 6.6566C20.6785 6.65809 20.6816 6.65995 20.685 6.66148C20.7195 6.67757 20.7534 6.6958 20.7859 6.71682C20.8174 6.73721 20.8473 6.7595 20.8754 6.78355C20.8812 6.78854 20.886 6.79469 20.8916 6.79983C20.913 6.81911 20.9336 6.83882 20.9527 6.86005C20.9633 6.87183 20.9729 6.88432 20.9828 6.89667C20.9963 6.91354 21.0089 6.93092 21.021 6.94875C21.0301 6.9621 21.0388 6.9756 21.047 6.98944C21.0578 7.0073 21.0679 7.02536 21.0772 7.04396C21.0843 7.05819 21.0912 7.07246 21.0975 7.0871C21.107 7.10887 21.1145 7.13128 21.122 7.15383C21.126 7.16604 21.1306 7.17803 21.1341 7.19045C21.1418 7.21741 21.1472 7.24486 21.152 7.27265C21.1537 7.28217 21.1564 7.29151 21.1578 7.30113C21.1631 7.33916 21.1667 7.37768 21.1667 7.41669V16.5834C21.1667 16.9113 20.9742 17.2089 20.6752 17.3434L12.3419 21.0934C12.1245 21.1912 11.8756 21.1912 11.6582 21.0934L3.32491 17.3434C3.02587 17.2089 2.83337 16.9113 2.83337 16.5834V7.41669C2.83337 7.37772 2.83619 7.33913 2.84152 7.30113C2.84286 7.29152 2.84553 7.28216 2.84721 7.27265C2.85208 7.24489 2.85751 7.21739 2.86512 7.19045C2.86862 7.17804 2.87326 7.16603 2.87732 7.15383C2.88482 7.1313 2.89236 7.10886 2.90173 7.0871C2.90804 7.07248 2.91496 7.05818 2.92208 7.04396C2.93138 7.02538 2.94152 7.00729 2.95219 6.98944C2.96047 6.9756 2.96917 6.96209 2.97823 6.94875C2.99034 6.93093 3.003 6.91354 3.01648 6.89667C3.02634 6.88433 3.03602 6.87183 3.04659 6.86005C3.06563 6.83882 3.08635 6.81911 3.10762 6.79983C3.11329 6.79469 3.11808 6.78854 3.1239 6.78355C3.15213 6.75935 3.18253 6.73731 3.21423 6.71682C3.24654 6.69593 3.28 6.67751 3.31433 6.66148C3.31785 6.65984 3.32137 6.6582 3.32491 6.6566L11.6582 2.9066L11.7413 2.87485ZM4.50004 16.0438L11.1667 19.0443V11.7054L4.50004 8.70494V16.0438ZM17 9.82961V13.4274L15.5425 14.0834H15.3334V10.5799L12.8334 11.7054V19.0443L19.5 16.0438V8.70494L17 9.82961ZM5.69714 7.41587L12 10.2528L14.1355 9.29087L7.83256 6.45477L5.69714 7.41587ZM9.86381 5.54087L16.1659 8.37697L18.3021 7.41669L12 4.58059L9.86381 5.54087Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the box filled icon from the CKW Elements Figma icon set. */
export function IconBoxFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.342 2.90665C12.1245 2.80879 11.8755 2.80879 11.658 2.90665L3.329 6.65473C3.31191 6.66231 3.29502 6.67048 3.27838 6.67925C3.19243 6.72449 3.11642 6.78366 3.05263 6.85322C3.04867 6.85753 3.04476 6.86189 3.04089 6.86629C3.01383 6.89708 2.98912 6.92978 2.96692 6.96411C2.96437 6.96804 2.96186 6.972 2.95938 6.97598C2.87863 7.10559 2.83337 7.2575 2.83337 7.41658V16.5833C2.83337 16.5858 2.83338 16.5883 2.83341 16.5909C2.83347 16.5975 2.83361 16.604 2.83382 16.6105C2.83617 16.683 2.84792 16.7538 2.8681 16.8214C2.93621 17.0498 3.10046 17.2423 3.32474 17.3432L11.658 21.0932C11.851 21.18 12.0688 21.1898 12.2673 21.1226C12.294 21.1135 12.3204 21.1031 12.3463 21.0913L20.6754 17.3432C20.9744 17.2086 21.1667 16.9112 21.1667 16.5833V7.41658C21.1667 7.39609 21.166 7.37571 21.1645 7.35548C21.1573 7.2577 21.133 7.16345 21.0941 7.0764C21.0605 7.00141 21.0161 6.93175 20.9622 6.86977C20.9018 6.80025 20.8295 6.74038 20.7476 6.69347C20.7286 6.68263 20.7092 6.67249 20.6893 6.66308L20.6764 6.65709L20.6711 6.65473L12.342 2.90665ZM12.8334 19.0444L19.5 16.0444V8.70541L17 9.83042V13.4276L15.5429 14.0833H15.3334V10.5804L12.8334 11.7054V19.0444ZM12 10.2528L14.136 9.29159L7.83337 6.45541L5.69742 7.41658L12 10.2528ZM16.1667 8.37777L9.86407 5.54159L12 4.58041L18.3026 7.41658L16.1667 8.37777Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the building icon from the CKW Elements Figma icon set. */
export function IconBuilding({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66671 2.83325C3.20647 2.83325 2.83337 3.20635 2.83337 3.66659V20.3333C2.83337 20.7935 3.20647 21.1666 3.66671 21.1666H20.3334C20.7936 21.1666 21.1667 20.7935 21.1667 20.3333V3.66659C21.1667 3.20635 20.7936 2.83325 20.3334 2.83325H3.66671ZM4.50004 19.4999V4.49992H19.5V19.4999H13.894V16.498H10.1061V19.4999H4.50004ZM8.21217 5.93931H5.93944V8.21204H8.21217V5.93931ZM15.788 5.93931H18.0606V8.21204H15.788V5.93931ZM13.1364 5.93931H10.8637V8.21204H13.1364V5.93931ZM5.93944 9.72719H8.21217V11.9999H5.93944V9.72719ZM18.0606 9.72719H15.788V11.9999H18.0606V9.72719ZM10.8637 9.72719H13.1364V11.9999H10.8637V9.72719ZM8.21217 13.5151H5.93944V15.7878H8.21217V13.5151ZM15.788 13.5151H18.0606V15.7878H15.788V13.5151Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the calendar icon from the CKW Elements Figma icon set. */
export function IconCalendar({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.00004 6.16659H17V2.83325H18.6667V6.16659H20.3334C20.7936 6.16659 21.1667 6.53969 21.1667 6.99992V20.3333C21.1667 20.7935 20.7936 21.1666 20.3334 21.1666H3.66671C3.20647 21.1666 2.83337 20.7935 2.83337 20.3333V6.99992C2.83337 6.53969 3.20647 6.16659 3.66671 6.16659H5.33337V2.83325H7.00004V6.16659ZM4.50004 19.4999H19.5V7.83325H4.50004V19.4999ZM9.50004 17.8333H6.16671V14.4999H9.50004V17.8333ZM9.50004 12.8333H6.16671V9.49992H9.50004V12.8333ZM14.5 9.49992V12.8333H11.1667V9.49992H14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the calendar blank icon from the CKW Elements Figma icon set. */
export function IconCalendarBlank({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.00004 6.16659H17V2.83325H18.6667V6.16659H20.3334C20.7936 6.16659 21.1667 6.53969 21.1667 6.99992V20.3333C21.1667 20.7935 20.7936 21.1666 20.3334 21.1666H3.66671C3.20647 21.1666 2.83337 20.7935 2.83337 20.3333V6.99992C2.83337 6.53969 3.20647 6.16659 3.66671 6.16659H5.33337V2.83325H7.00004V6.16659ZM4.50004 11.9999V19.4999H19.5V11.9999H4.50004ZM4.50004 10.3333H19.5V7.83325H4.50004V10.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the calendar restricted icon from the CKW Elements Figma icon set. */
export function IconCalendarRestricted({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M17 12C19.7614 12 22 14.2386 22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12ZM14.1281 15.3065C13.8348 15.8028 13.6667 16.3818 13.6667 17C13.6667 18.8409 15.1591 20.3333 17 20.3333C17.6181 20.3333 18.1965 20.1643 18.6927 19.8711L14.1281 15.3065ZM7 4.5H15.3333V2H17V4.5H19.5C19.9603 4.5 20.3333 4.8731 20.3333 5.33333V11.1667H18.6667V10.3333H3.66667V17.8333H10.3333V19.5H2.83333C2.3731 19.5 2 19.1269 2 18.6667V5.33333C2 4.8731 2.3731 4.5 2.83333 4.5H5.33333V2H7V4.5ZM17 13.6667C16.3818 13.6667 15.8028 13.8348 15.3065 14.1281L19.8711 18.6927C20.1643 18.1965 20.3333 17.6181 20.3333 17C20.3333 15.1591 18.8409 13.6667 17 13.6667ZM3.66667 8.66667H18.6667V6.16667H3.66667V8.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the check icon from the CKW Elements Figma icon set. */
export function IconCheck({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.756 6.7559L10.0893 18.4226C9.76388 18.748 9.23624 18.748 8.91081 18.4226L2.24414 11.7559L3.42265 10.5774L9.50007 16.6548L20.5775 5.57739L21.756 6.7559Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the check box icon from the CKW Elements Figma icon set. */
export function IconCheckBox({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3335 2.8335C20.7936 2.8335 21.1663 3.20642 21.1665 3.6665V20.3335C21.1665 20.7937 20.7937 21.1665 20.3335 21.1665H3.6665C3.20642 21.1663 2.8335 20.7936 2.8335 20.3335V3.6665C2.83367 3.20653 3.20653 2.83367 3.6665 2.8335H20.3335ZM10.3335 13.5659L7.05029 10.2827L5.28271 12.0503L9.44971 16.2173C9.93787 16.7054 10.7291 16.7054 11.2173 16.2173L18.7173 8.71729L16.9497 6.94971L10.3335 13.5659Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the check circle filled icon from the CKW Elements Figma icon set. */
export function IconCheckCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.0506 16.2172L18.7173 9.55055L16.9494 7.78278L11.1667 13.5656L8.30055 10.6994L6.53278 12.4672L10.2828 16.2172C10.7709 16.7053 11.5624 16.7053 12.0506 16.2172Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the chevron down icon from the CKW Elements Figma icon set. */
export function IconChevronDown({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.57739 9.55057L11.4108 15.3839C11.7362 15.7093 12.2638 15.7093 12.5893 15.3839L18.4226 9.55057L17.2441 8.37207L12 13.6162L6.7559 8.37207L5.57739 9.55057Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the chevron left icon from the CKW Elements Figma icon set. */
export function IconChevronLeft({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4495 5.57739L8.61615 11.4108C8.29071 11.7362 8.29071 12.2638 8.61615 12.5893L14.4495 18.4226L15.628 17.2441L10.3839 12L15.628 6.7559L14.4495 5.57739Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the chevron right icon from the CKW Elements Figma icon set. */
export function IconChevronRight({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.37207 6.7559L13.6162 12L8.37207 17.2441L9.55057 18.4226L15.3839 12.5893C15.7093 12.2638 15.7093 11.7362 15.3839 11.4108L9.55057 5.57739L8.37207 6.7559Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the chevron up icon from the CKW Elements Figma icon set. */
export function IconChevronUp({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5893 8.61615C12.2638 8.29071 11.7362 8.29071 11.4108 8.61615L5.57739 14.4495L6.7559 15.628L12 10.3839L17.2441 15.628L18.4226 14.4495L12.5893 8.61615Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the chevron up down icon from the CKW Elements Figma icon set. */
export function IconChevronUpDown({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5894 2.24408C12.264 1.91864 11.7363 1.91864 11.4109 2.24408L5.57751 8.07741L6.75602 9.25593L12.0001 4.01184L17.2442 9.25593L18.4227 8.07741L12.5894 2.24408ZM5.57751 15.9226L11.4109 21.7559C11.7363 22.0813 12.264 22.0813 12.5894 21.7559L18.4227 15.9226L17.2442 14.7441L12.0001 19.9882L6.75602 14.7441L5.57751 15.9226Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the circle icon from the CKW Elements Figma icon set. */
export function IconCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the clock icon from the CKW Elements Figma icon set. */
export function IconClock({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.1667 6.16667V12C11.1667 12.1892 11.2311 12.3728 11.3492 12.5206L14.6826 16.6873L15.9841 15.6461L12.8333 11.7077V6.16667H11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the clock quarter icon from the CKW Elements Figma icon set. */
export function IconClockQuarter({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8333 22H11.1667V17.8333H12.8333V22ZM8.46403 16.7143L5.51807 19.6603L4.33968 18.4819L7.28564 15.5352L8.46403 16.7143ZM19.6603 18.4819L18.4819 19.6603L15.536 16.7143L16.7143 15.5352L19.6603 18.4819ZM12 2C12.4602 2 12.8333 2.3731 12.8333 2.83333V12C12.8333 12.4602 12.4602 12.8333 12 12.8333H2.83333C2.3731 12.8333 2 12.4602 2 12C2 6.45643 6.45643 2 12 2ZM22 12.8333H17.8333V11.1667H22V12.8333ZM11.1667 3.70736C7.21303 4.09491 4.09576 7.21304 3.70817 11.1667H11.1667V3.70736ZM19.6603 5.51807L16.7143 8.46484L15.536 7.28564L18.4819 4.33968L19.6603 5.51807Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the close icon from the CKW Elements Figma icon set. */
export function IconClose({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M20.9225 4.25578L13.1785 11.9999L20.9225 19.7441L19.7442 20.9224L12 13.1783L4.2559 20.9224L3.07751 19.7441L10.8216 11.9999L3.07751 4.25578L4.2559 3.07739L12 10.8215L19.7442 3.07739L20.9225 4.25578Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the close circle filled icon from the CKW Elements Figma icon set. */
export function IconCloseCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 13.7677L8.71722 17.0506L6.94945 15.2828L10.2322 12L6.94945 8.71722L8.71722 6.94945L12 10.2322L15.2828 6.94945L17.0506 8.71722L13.7677 12L17.0506 15.2828L15.2828 17.0506L12 13.7677Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the cloudy icon from the CKW Elements Figma icon set. */
export function IconCloudy({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M14.8923 10.0575C15.9622 9.81812 17.0781 9.88541 18.1117 10.2511C19.1452 10.617 20.0557 11.2663 20.737 12.1253C21.4182 12.9845 21.8437 14.0188 21.9642 15.1088C22.0847 16.1985 21.8951 17.3002 21.4182 18.2874C20.9411 19.2747 20.1952 20.1077 19.2664 20.6906C18.3378 21.2733 17.2638 21.583 16.1675 21.5833H9.5C8.85313 21.5832 8.21491 21.4325 7.63639 21.1431C7.05775 20.8535 6.55383 20.4329 6.16585 19.915C5.77788 19.3971 5.51616 18.7956 5.40088 18.1588C5.28562 17.5222 5.32007 16.8674 5.50179 16.2464C5.68359 15.6253 6.00781 15.0547 6.44824 14.5806C6.88861 14.1066 7.43338 13.7414 8.03923 13.5145C8.64513 13.2876 9.29606 13.2047 9.93945 13.2727C10.2331 13.3039 10.5218 13.3676 10.8004 13.4592C11.0956 12.7681 11.5233 12.1377 12.0618 11.6045C12.8411 10.8331 13.8223 10.2969 14.8923 10.0575ZM17.5558 11.8217C16.8176 11.5606 16.0202 11.5133 15.256 11.6842C14.4919 11.8552 13.7911 12.2378 13.2345 12.7886C12.6781 13.3394 12.2878 14.0364 12.1091 14.7987C12.0363 15.1102 11.9997 15.4293 12 15.7492V16.5833H10.3333V15.75C10.3331 15.5236 10.3462 15.2975 10.3724 15.0729C10.1773 15.0002 9.97293 14.9527 9.76448 14.9305C9.37856 14.8897 8.98781 14.9393 8.62435 15.0753C8.26078 15.2115 7.9332 15.4306 7.66894 15.715C7.40474 15.9994 7.2108 16.3418 7.10173 16.7143C6.99267 17.0869 6.97157 17.4798 7.04069 17.8618C7.10986 18.2438 7.26691 18.6049 7.49967 18.9157C7.73242 19.2263 8.03473 19.4784 8.38183 19.6522C8.72889 19.8258 9.11193 19.9165 9.5 19.9167H16.1667C16.9498 19.9164 17.7177 19.6957 18.381 19.2795C19.0443 18.8631 19.5767 18.2675 19.9175 17.5623C20.2581 16.8572 20.3934 16.0702 20.3073 15.2918C20.2212 14.5134 19.9173 13.775 19.4308 13.1613C18.9443 12.5477 18.2941 12.0831 17.5558 11.8217ZM9.01009 6.62321C9.57624 6.55531 10.1507 6.60434 10.6971 6.76725C11.2434 6.93017 11.7507 7.20373 12.1872 7.57048C12.6237 7.93737 12.9808 8.39079 13.2353 8.90104L11.7437 9.64486C11.591 9.33879 11.3772 9.06663 11.1154 8.84652C10.8536 8.62647 10.5488 8.46252 10.221 8.36475C9.89318 8.267 9.54833 8.23774 9.20866 8.27848C8.86906 8.31924 8.54131 8.42911 8.24593 8.60157C7.95046 8.77414 7.69314 9.00602 7.49073 9.2819C7.28845 9.55767 7.14511 9.87211 7.06917 10.2056C6.99327 10.5391 6.98661 10.885 7.04964 11.2212C7.11273 11.5574 7.24377 11.8777 7.43538 12.1612L6.05517 13.0946C5.73582 12.6223 5.51662 12.0892 5.41146 11.5288C5.30637 10.9684 5.31752 10.3921 5.44401 9.8361C5.57057 9.28004 5.80979 8.75537 6.14713 8.29558C6.48448 7.83582 6.91287 7.45036 7.40527 7.16276C7.89769 6.87518 8.44391 6.69116 9.01009 6.62321ZM3.66667 11.5833H2V9.91667H3.66667V11.5833ZM5.96403 6.03564L4.78564 7.21403L3.60726 6.03564L4.78564 4.85726L5.96403 6.03564ZM15.3927 6.03564L14.2143 7.21403L13.036 6.03564L14.2143 4.85726L15.3927 6.03564ZM10.3333 4.91667H8.66667V3.25H10.3333V4.91667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the coins icon from the CKW Elements Figma icon set. */
export function IconCoins({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M16.5833 9.5C17.9399 9.5 19.2083 9.74858 20.1689 10.1852C21.0543 10.5877 22 11.3137 22 12.4167V19.0833C22 20.1863 21.0543 20.9123 20.1689 21.3148C19.2083 21.7514 17.9399 22 16.5833 22C15.2267 22 13.9583 21.7514 12.9978 21.3148C12.1123 20.9123 11.1667 20.1863 11.1667 19.0833V12.4167C11.1667 11.3137 12.1123 10.5877 12.9978 10.1852C13.9583 9.74858 15.2267 9.5 16.5833 9.5ZM20.1689 17.9814C19.2083 18.4181 17.9399 18.6667 16.5833 18.6667C15.2267 18.6667 13.9583 18.4181 12.9978 17.9814C12.9431 17.9566 12.8882 17.9307 12.8333 17.9033V19.0833C12.8333 19.1309 12.9138 19.4463 13.687 19.7978C14.3853 20.1152 15.4087 20.3333 16.5833 20.3333C17.758 20.3333 18.7814 20.1152 19.4797 19.7978C20.2529 19.4463 20.3333 19.1309 20.3333 19.0833V17.9033C20.2785 17.9307 20.2236 17.9566 20.1689 17.9814ZM7.41667 2C8.77327 2 10.0417 2.24858 11.0022 2.68522C11.8877 3.08767 12.8333 3.81364 12.8333 4.91667V8.66667H11.1667V7.06998C11.1118 7.0973 11.0569 7.12328 11.0022 7.14811C10.0417 7.58475 8.77327 7.83333 7.41667 7.83333C6.06006 7.83333 4.79166 7.58475 3.83106 7.14811C3.77643 7.12328 3.72152 7.0973 3.66667 7.06998V8.25C3.66667 8.29756 3.74707 8.61298 4.52034 8.96452C5.21858 9.2819 6.24197 9.5 7.41667 9.5C8.19447 9.5 8.90533 9.40202 9.5 9.24528V10.9559C8.85398 11.0911 8.1485 11.1667 7.41667 11.1667C6.06006 11.1667 4.79166 10.9181 3.83106 10.4814C3.77643 10.4566 3.72152 10.4307 3.66667 10.4033V11.5833C3.66667 11.6309 3.74707 11.9463 4.52034 12.2978C5.21858 12.6152 6.24197 12.8333 7.41667 12.8333C8.19447 12.8333 8.90533 12.7353 9.5 12.5786V14.2893C8.85398 14.4244 8.1485 14.5 7.41667 14.5C6.06006 14.5 4.79166 14.2514 3.83106 13.8147C3.77643 13.7899 3.72152 13.764 3.66667 13.7367V14.9167C3.66667 14.9643 3.74707 15.2797 4.52034 15.6312C5.21858 15.9486 6.24197 16.1667 7.41667 16.1667C8.19447 16.1667 8.90533 16.0687 9.5 15.9119V17.6226C8.85398 17.7578 8.1485 17.8333 7.41667 17.8333C6.06006 17.8333 4.79166 17.5848 3.83106 17.1481C2.94568 16.7457 2 16.0197 2 14.9167V4.91667C2 3.81364 2.94568 3.08767 3.83106 2.68522C4.79166 2.24858 6.06006 2 7.41667 2ZM20.1689 14.6481C19.2083 15.0848 17.9399 15.3333 16.5833 15.3333C15.2267 15.3333 13.9583 15.0848 12.9978 14.6481C12.9431 14.6233 12.8882 14.5973 12.8333 14.57V15.75C12.8333 15.7976 12.9138 16.113 13.687 16.4645C14.3853 16.7819 15.4087 17 16.5833 17C17.758 17 18.7814 16.7819 19.4797 16.4645C20.2529 16.113 20.3333 15.7976 20.3333 15.75V14.57C20.2785 14.5973 20.2236 14.6233 20.1689 14.6481ZM16.5833 11.1667C15.4087 11.1667 14.3853 11.3848 13.687 11.7022C12.9138 12.0537 12.8333 12.3691 12.8333 12.4167C12.8333 12.4643 12.9138 12.7797 13.687 13.1312C14.3853 13.4486 15.4087 13.6667 16.5833 13.6667C17.758 13.6667 18.7814 13.4486 19.4797 13.1312C20.2529 12.7797 20.3333 12.4643 20.3333 12.4167C20.3333 12.3691 20.2529 12.0537 19.4797 11.7022C18.7814 11.3848 17.758 11.1667 16.5833 11.1667ZM7.41667 3.66667C6.24197 3.66667 5.21858 3.88477 4.52034 4.20215C3.74707 4.55368 3.66667 4.86911 3.66667 4.91667C3.66667 4.96423 3.74707 5.27965 4.52034 5.63118C5.21858 5.94857 6.24197 6.16667 7.41667 6.16667C8.59137 6.16667 9.61475 5.94857 10.313 5.63118C11.0863 5.27965 11.1667 4.96423 11.1667 4.91667C11.1667 4.86911 11.0863 4.55368 10.313 4.20215C9.61475 3.88477 8.59137 3.66667 7.41667 3.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the download icon from the CKW Elements Figma icon set. */
export function IconDownload({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8333 2V12.4882L15.5774 9.74407L16.7559 10.9226L12.5892 15.0892C12.2638 15.4147 11.7361 15.4147 11.4107 15.0892L7.24403 10.9226L8.42255 9.74407L11.1666 12.4882V2H12.8333ZM3.66663 17.8333V21.1667C3.66663 21.6269 4.03973 22 4.49996 22H19.5C19.9602 22 20.3333 21.6269 20.3333 21.1667V17.8333H18.6666V20.3333H5.33329V17.8333H3.66663Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the envelopes icon from the CKW Elements Figma icon set. */
export function IconEnvelopes({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.1667 8.66667C21.6269 8.66667 22 9.03976 22 9.5V21.1667C22 21.6269 21.6269 22 21.1667 22H2.83333C2.3731 22 2 21.6269 2 21.1667V9.5C2 9.03976 2.3731 8.66667 2.83333 8.66667H21.1667ZM3.66667 20.3333H20.3333V10.3333H3.66667V20.3333ZM12 18.6667H5.33333V17H12V18.6667ZM9.5 15.3333H5.33333V13.6667H9.5V15.3333ZM18.6667 15.3333H15.3333V12H18.6667V15.3333ZM19.5 7H4.5V5.33333H19.5V7ZM16.1667 3.66667H7.83333V2H16.1667V3.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the external link icon from the CKW Elements Figma icon set. */
export function IconExternalLink({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6667 2H21.1667C21.6269 2 22 2.3731 22 2.83333V10.3333H20.3333V4.84518L8.42259 16.7559L7.24407 15.5774L19.1548 3.66667H13.6667V2ZM2.83333 6.16667C2.3731 6.16667 2 6.53977 2 7V21.1667C2 21.6269 2.3731 22 2.83333 22H17C17.4602 22 17.8333 21.6269 17.8333 21.1667V13.6667H16.1667V20.3333H3.66667V7.83333H10.3333V6.16667H2.83333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the faq icon from the CKW Elements Figma icon set. */
export function IconFaq({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8333 3.6665C17.8112 3.66651 22 7.31667 22 11.9998C22 16.683 17.8112 20.3332 12.8333 20.3332H2.83331C2.4963 20.3332 2.19246 20.1302 2.06345 19.8188C1.93447 19.5074 2.00579 19.149 2.24412 18.9107L4.92803 16.2259C4.11351 14.973 3.67212 13.508 3.66664 12.0031V11.9998C3.66664 7.31666 7.85535 3.6665 12.8333 3.6665ZM12.8333 5.33317C8.60627 5.33317 5.33331 8.398 5.33331 11.9998C5.33896 13.3796 5.80991 14.7169 6.66958 15.7963C6.93362 16.1278 6.90644 16.6048 6.60691 16.9046L4.84503 18.6665H12.8333C17.0603 18.6665 20.3333 15.6017 20.3333 11.9998C20.3333 8.39801 17.0603 5.33318 12.8333 5.33317ZM12.8333 14.4998C13.5236 14.4998 14.0833 15.0595 14.0833 15.7498C14.0833 16.4402 13.5236 16.9998 12.8333 16.9998C12.143 16.9998 11.5833 16.4402 11.5833 15.7498C11.5833 15.0595 12.143 14.4998 12.8333 14.4998ZM11.5581 7.25375C12.1671 7.00155 12.8371 6.93554 13.4836 7.06413C14.1301 7.19275 14.7239 7.51023 15.1901 7.9764C15.6562 8.44257 15.9737 9.03635 16.1024 9.68295C16.231 10.3294 16.1649 10.9994 15.9127 11.6084C15.6605 12.2174 15.2336 12.7388 14.6856 13.105C14.3726 13.3141 14.0272 13.4651 13.6666 13.5583V13.6665H12V12.8332C12 12.3729 12.3731 11.9998 12.8333 11.9998C13.163 11.9998 13.4853 11.9022 13.7594 11.7191C14.0334 11.536 14.2469 11.2756 14.3731 10.9712C14.4991 10.6667 14.5326 10.3309 14.4682 10.0077C14.4039 9.68447 14.2447 9.3878 14.0117 9.15479C13.7787 8.92178 13.482 8.7626 13.1588 8.69825C12.8356 8.63394 12.4998 8.66732 12.1953 8.79345C11.8909 8.9196 11.6305 9.13308 11.4474 9.40706C11.2643 9.68115 11.1666 10.0035 11.1666 10.3332H9.49998C9.49998 9.6739 9.69523 9.02912 10.0615 8.48095C10.4277 7.93285 10.9491 7.50602 11.5581 7.25375Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the file icon from the CKW Elements Figma icon set. */
export function IconFile({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M14.845 3.6665H7.00004C6.55802 3.6665 6.13409 3.8421 5.82153 4.15466C5.50897 4.46722 5.33337 4.89115 5.33337 5.33317V18.6665C5.33337 19.1085 5.50897 19.5324 5.82153 19.845C6.13409 20.1576 6.55802 20.3332 7.00004 20.3332H17C17.442 20.3332 17.866 20.1576 18.1785 19.845C18.4911 19.5324 18.6667 19.1085 18.6667 18.6665V7.48817L14.845 3.6665ZM17 18.6665H7.00004V5.33317H13.6667V8.6665H17V18.6665Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the file download icon from the CKW Elements Figma icon set. */
export function IconFileDownload({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M15.6784 2.8335L19.5 6.65511V19.5002C19.5 19.9422 19.3242 20.366 19.0117 20.6786C18.6992 20.9911 18.2753 21.1668 17.8333 21.1668H6.16667C5.72464 21.1668 5.30084 20.9911 4.98828 20.6786C4.67572 20.366 4.5 19.9422 4.5 19.5002V4.50016C4.5 4.05814 4.67572 3.63434 4.98828 3.32178C5.30084 3.00921 5.72464 2.8335 6.16667 2.8335H15.6784ZM6.16667 4.50016V19.5002H17.8333V7.8335H14.5V4.50016H6.16667ZM12.8333 9.50016V13.6668H15.3333L12 17.0002L8.66667 13.6668H11.1667V9.50016H12.8333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the file upload icon from the CKW Elements Figma icon set. */
export function IconFileUpload({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M15.6784 2.8335L19.5 6.65511V19.5002C19.5 19.9422 19.3242 20.366 19.0117 20.6786C18.6992 20.9911 18.2753 21.1668 17.8333 21.1668H6.16667C5.72464 21.1668 5.30084 20.9911 4.98828 20.6786C4.67572 20.366 4.5 19.9422 4.5 19.5002V4.50016C4.5 4.05814 4.67572 3.63434 4.98828 3.32178C5.30084 3.00921 5.72464 2.8335 6.16667 2.8335H15.6784ZM6.16667 4.50016V19.5002H17.8333V7.8335H14.5V4.50016H6.16667ZM15.3333 12.8335H12.8333V17.0002H11.1667V12.8335H8.66667L12 9.50016L15.3333 12.8335Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the graph ascend icon from the CKW Elements Figma icon set. */
export function IconGraphAscend({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.1667 5.3335C21.6269 5.3335 22 5.7066 22 6.16683V11.1668H20.3333V8.17855L14.2558 14.256C13.9587 14.5532 13.4865 14.5824 13.1547 14.3244L9.98502 11.8594L3.42252 18.4227L2.24414 17.2443L9.32748 10.161L9.38525 10.1081C9.68317 9.86111 10.1176 9.8508 10.4286 10.0926L13.5975 12.5568L19.1549 7.00016H16.1667V5.3335H21.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the heart icon from the CKW Elements Figma icon set. */
export function IconHeart({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.4055 21.0612C12.1527 21.2019 11.8449 21.2017 11.5925 21.0603L12.0002 20.3328L12.4055 21.0612ZM12.8848 4.02827C13.947 3.0685 15.3423 2.71031 16.6951 2.8686C19.3319 3.17723 21.8485 5.43149 21.9937 9.13895L22.0002 9.5019C21.9962 11.156 21.3339 12.7094 20.4207 14.0731C19.5053 15.4398 18.3017 16.6697 17.1247 17.6937C15.9446 18.7203 14.7687 19.5592 13.8899 20.1407C13.4497 20.4321 13.0821 20.6602 12.823 20.8162C12.6934 20.8942 12.5913 20.955 12.5202 20.9961C12.4848 21.0165 12.4572 21.0323 12.4381 21.0432C12.4286 21.0487 12.4206 21.0525 12.4153 21.0555C12.4127 21.057 12.4103 21.0587 12.4087 21.0595L12.4072 21.0603L12.0002 20.3328L11.5917 21.0595L11.5892 21.0579C11.5877 21.057 11.5853 21.0561 11.5827 21.0547C11.5775 21.0517 11.5702 21.047 11.5608 21.0417C11.5417 21.0307 11.5139 21.0149 11.4786 20.9944C11.408 20.9533 11.3062 20.8933 11.1775 20.8154C10.9197 20.6593 10.5536 20.4312 10.1155 20.1399C9.24092 19.5583 8.07021 18.7194 6.89364 17.6928C5.72023 16.669 4.51906 15.4396 3.60181 14.0738C2.68682 12.7114 2.01946 11.1602 2.00024 9.50923L2.00106 9.50841C1.95503 5.58435 4.53006 3.18855 7.25415 2.86941C8.6068 2.71106 10.0035 3.06937 11.0725 4.02583C11.424 4.34032 11.7298 4.71195 11.9848 5.13667C12.2352 4.71322 12.5371 4.34253 12.8848 4.02827ZM16.5014 4.52469C15.5627 4.41485 14.6637 4.66756 14.0022 5.26525C13.3479 5.85665 12.8382 6.8664 12.8336 8.4399C12.8322 8.89744 12.4618 9.26841 12.0043 9.27079C11.5467 9.27311 11.1729 8.90561 11.1669 8.44803L12.0002 8.43745L11.9742 8.43664L11.1669 8.44803C11.1462 6.87489 10.6259 5.86203 9.96167 5.26769C9.29043 4.66713 8.3855 4.41489 7.44783 4.52469C5.64923 4.7354 3.75281 6.29518 3.66935 9.20405L3.66691 9.4897C3.68113 10.703 4.17544 11.9396 4.98527 13.1453C5.79298 14.3478 6.87998 15.4688 7.98983 16.4372C9.09643 17.4026 10.2046 18.198 11.0383 18.7524C11.432 19.0142 11.7632 19.2205 12.0011 19.3652C12.2403 19.2204 12.5738 19.014 12.9703 18.7516C13.8081 18.1972 14.9213 17.4017 16.031 16.4363C17.144 15.4681 18.2317 14.3477 19.0364 13.1461C19.8432 11.9414 20.3306 10.7082 20.3336 9.49784C20.3417 6.40205 18.3622 4.74255 16.5014 4.52469Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the heater icon from the CKW Elements Figma icon set. */
export function IconHeater({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.15434 2.11523C6.90344 2.35432 6.70371 2.64186 6.56723 2.96043C6.43076 3.27899 6.36039 3.62195 6.36039 3.96852C6.36039 4.31508 6.43076 4.65804 6.56723 4.97661C6.70371 5.29518 6.90344 5.58272 7.15434 5.8218C7.24189 5.90523 7.31159 6.00557 7.35922 6.11673C7.40683 6.2279 7.43139 6.34758 7.43139 6.46852C7.43139 6.58945 7.40683 6.70913 7.35922 6.8203C7.31159 6.93147 7.24189 7.0318 7.15434 7.11523L8.30412 8.3218C8.55501 8.08272 8.75474 7.79518 8.89122 7.47661C9.02769 7.15804 9.09806 6.81508 9.09806 6.46852C9.09806 6.12195 9.02769 5.77899 8.89122 5.46043C8.75474 5.14186 8.55501 4.85432 8.30412 4.61523C8.21657 4.5318 8.14687 4.43147 8.09924 4.3203C8.05162 4.20913 8.02706 4.08945 8.02706 3.96852C8.02706 3.84758 8.05162 3.7279 8.09924 3.61673C8.14687 3.50557 8.21657 3.40523 8.30412 3.3218L7.15434 2.11523ZM2.83337 10.2185C2.83337 9.75828 3.20647 9.38518 3.66671 9.38518H20.3334C20.7936 9.38518 21.1667 9.75828 21.1667 10.2185V19.3852C21.1667 19.8455 20.7936 20.2185 20.3334 20.2185H18.6667V21.8852H17V20.2185H7.00004V21.8852H5.33337V20.2185H3.66671C3.20647 20.2185 2.83337 19.8455 2.83337 19.3852V10.2185ZM4.50004 11.0519V18.5519H6.16671V11.0519H4.50004ZM9.50004 18.5519H7.83337V11.0519H9.50004V18.5519ZM11.1667 11.0519V18.5519H12.8334V11.0519H11.1667ZM14.5 18.5519V11.0519H19.5V18.5519H14.5ZM11.0314 2.96043C11.1678 2.64186 11.3675 2.35432 11.6185 2.11523L12.7682 3.3218C12.6807 3.40523 12.611 3.50557 12.5634 3.61673C12.5157 3.7279 12.4912 3.84758 12.4912 3.96852C12.4912 4.08946 12.5157 4.20913 12.5634 4.3203C12.611 4.43147 12.6807 4.5318 12.7682 4.61523C13.0191 4.85432 13.2189 5.14186 13.3553 5.46043C13.4918 5.77899 13.5622 6.12195 13.5622 6.46852C13.5622 6.81508 13.4918 7.15804 13.3553 7.47661C13.2189 7.79518 13.0191 8.08272 12.7682 8.3218L11.6185 7.11523C11.706 7.0318 11.7757 6.93147 11.8233 6.8203C11.871 6.70913 11.8955 6.58945 11.8955 6.46852C11.8955 6.34758 11.871 6.2279 11.8233 6.11673C11.7757 6.00557 11.706 5.90523 11.6185 5.8218C11.3675 5.58272 11.1678 5.29518 11.0314 4.97661C10.8949 4.65804 10.8245 4.31508 10.8245 3.96852C10.8245 3.62195 10.8949 3.27899 11.0314 2.96043ZM15.9044 2.11523C15.6535 2.35432 15.4537 2.64186 15.3172 2.96043C15.1808 3.27899 15.1104 3.62195 15.1104 3.96852C15.1104 4.31508 15.1808 4.65804 15.3172 4.97661C15.4537 5.29518 15.6535 5.58272 15.9044 5.8218C15.9919 5.90523 16.0616 6.00557 16.1092 6.11673C16.1569 6.2279 16.1814 6.34758 16.1814 6.46852C16.1814 6.58945 16.1569 6.70913 16.1092 6.8203C16.0616 6.93147 15.9919 7.0318 15.9044 7.11523L17.0541 8.3218C17.305 8.08272 17.5047 7.79518 17.6412 7.47661C17.7777 7.15804 17.848 6.81508 17.848 6.46852C17.848 6.12195 17.7777 5.77899 17.6412 5.46043C17.5047 5.14186 17.305 4.85432 17.0541 4.61523C16.9665 4.5318 16.8969 4.43147 16.8492 4.3203C16.8016 4.20913 16.777 4.08945 16.777 3.96852C16.777 3.84758 16.8016 3.7279 16.8492 3.61673C16.8969 3.50557 16.9665 3.40523 17.0541 3.3218L15.9044 2.11523ZM17 14.3852C17.4603 14.3852 17.8334 14.0121 17.8334 13.5519C17.8334 13.0916 17.4603 12.7185 17 12.7185C16.5398 12.7185 16.1667 13.0916 16.1667 13.5519C16.1667 14.0121 16.5398 14.3852 17 14.3852ZM17.8334 16.0519C17.8334 16.5121 17.4603 16.8852 17 16.8852C16.5398 16.8852 16.1667 16.5121 16.1667 16.0519C16.1667 15.5916 16.5398 15.2185 17 15.2185C17.4603 15.2185 17.8334 15.5916 17.8334 16.0519Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the high voltage pole icon from the CKW Elements Figma icon set. */
export function IconHighVoltagePole({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M16.167 2C16.4199 2.00009 16.6458 2.11342 16.7985 2.29134L21.7994 8.12467C22.011 8.37172 22.0597 8.71938 21.9239 9.01498C21.7879 9.31045 21.4923 9.49989 21.167 9.5H17.9785L21.7994 13.958C22.011 14.2051 22.0597 14.5527 21.9239 14.8483C21.7879 15.1438 21.4923 15.3333 21.167 15.3333H17.3974L20.0643 22H17.2029L12.0004 18.3981L6.79768 22H3.93554L6.60238 15.3333H2.83366C2.50832 15.3333 2.21287 15.1438 2.07682 14.8483C1.94083 14.5527 1.98954 14.2051 2.20133 13.958L6.02213 9.5H2.83366C2.50832 9.5 2.21287 9.31047 2.07682 9.01498C1.94083 8.71931 1.98954 8.37177 2.20133 8.12467L7.18343 2.31169C7.33617 2.12163 7.57086 2 7.83366 2H16.167ZM6.44368 20.2178L10.5363 17.3849L8.21858 15.7801L6.44368 20.2178ZM13.4644 17.3849L17.5562 20.2178L15.7813 15.7801L13.4644 17.3849ZM10.5013 15.3333L12.0004 16.3709L13.4994 15.3333H10.5013ZM4.64518 13.6667H7.00033V10.9184L4.64518 13.6667ZM9.66797 13.6667H14.331L11.9995 10.1689L9.66797 13.6667ZM17.0004 13.6667H19.3554L17.0004 10.9184V13.6667ZM13.0005 8.66585L15.3337 12.1652V5.16732L13.0005 8.66585ZM8.66699 12.1628L10.9977 8.66585L8.66699 5.16976V12.1628ZM4.64518 7.83333H7.00033V5.08512L4.64518 7.83333ZM17.0004 7.83333H19.3554L17.0004 5.08512V7.83333ZM11.9995 7.16358L14.331 3.66667H9.66797L11.9995 7.16358Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the hourglass icon from the CKW Elements Figma icon set. */
export function IconHourglass({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M19.5 2C19.9602 2 20.3333 2.3731 20.3333 2.83333V8.25C20.3333 8.56564 20.155 8.85428 19.8727 8.99544L13.8635 12L19.8727 15.0046C20.155 15.1458 20.3333 15.4343 20.3333 15.75V21.1667C20.3333 21.6269 19.9602 22 19.5 22H4.49996C4.03973 22 3.66663 21.6269 3.66663 21.1667V15.75L3.67477 15.6328C3.71284 15.3643 3.8803 15.128 4.12723 15.0046L10.1364 12L4.12723 8.99544C3.84492 8.85428 3.66663 8.56564 3.66663 8.25V2.83333C3.66663 2.3731 4.03973 2 4.49996 2H19.5ZM5.33329 16.2652V20.3333H18.6666V16.2652L12 12.9318L5.33329 16.2652ZM5.33329 7.73487L6.39774 8.26709L12 6.16667L17.6014 8.26709L18.6666 7.73487V3.66667H5.33329V7.73487Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the house icon from the CKW Elements Figma icon set. */
export function IconHouse({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M11.5011 2.16602C11.8175 1.92907 12.2627 1.94564 12.5607 2.21647L21.7274 10.5498L20.6059 11.7835L20.3333 11.5353V21.1667C20.3331 21.6268 19.9601 22 19.5 22H4.49996C4.03982 22 3.66678 21.6268 3.66663 21.1667V11.5353L3.394 11.7835L2.27258 10.5498L11.4392 2.21647L11.5011 2.16602ZM5.33329 10.02V20.3333H8.66663V17C8.66663 16.1159 9.01807 15.2683 9.64319 14.6433C10.2683 14.0181 11.1159 13.6667 12 13.6667C12.884 13.6667 13.7316 14.0181 14.3567 14.6433C14.9819 15.2683 15.3333 16.1159 15.3333 17V20.3333H18.6666V10.02L12 3.95964L5.33329 10.02ZM12 15.3333C11.558 15.3333 11.1341 15.5091 10.8215 15.8216C10.509 16.1342 10.3333 16.558 10.3333 17V20.3333H13.6666V17C13.6666 16.558 13.4909 16.1342 13.1784 15.8216C12.8658 15.5091 12.442 15.3333 12 15.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the house filled icon from the CKW Elements Figma icon set. */
export function IconHouseFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3885 2.23642C11.7353 1.92119 12.2648 1.92119 12.6116 2.23642L21.7025 10.5009L20.4794 11.8462L20.3471 11.726V21.0909C20.3471 21.593 19.9401 22 19.4381 22H4.56201C4.05994 22 3.65292 21.593 3.65292 21.0909V11.726L3.52065 11.8462L2.29761 10.5009L11.3885 2.23642ZM10.4298 20.1818H13.5703V16.9587C13.5703 16.5423 13.4049 16.1429 13.1104 15.8484C12.8159 15.5539 12.4165 15.3885 12.0001 15.3885C11.5836 15.3885 11.1842 15.5539 10.8897 15.8484C10.5953 16.1429 10.4298 16.5423 10.4298 16.9587V20.1818Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the hyperlink icon from the CKW Elements Figma icon set. */
export function IconHyperlink({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M9.91667 7.00016H3.66667V17.0002H9.91667V18.6668H2.83333C2.3731 18.6668 2 18.2937 2 17.8335V6.16683C2 5.7066 2.3731 5.3335 2.83333 5.3335H9.91667V7.00016ZM21.1667 5.3335C21.6269 5.3335 22 5.7066 22 6.16683V17.8335C22 18.2937 21.6269 18.6668 21.1667 18.6668H14.0833V17.0002H20.3333V7.00016H14.0833V5.3335H21.1667ZM17 12.8335H7V11.1668H17V12.8335Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the hyperlink break icon from the CKW Elements Figma icon set. */
export function IconHyperlinkBreak({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.34505 6.16667H10.3333V7.83333H9.01172L12.3451 11.1667H17.8333V12.8333H14.0118L17.3451 16.1667H20.3333V7.83333H13.6667V6.16667H21.1667C21.6269 6.16667 22 6.53976 22 7V17C22 17.4602 21.6269 17.8333 21.1667 17.8333H19.0117L22 20.8216L20.8216 22L2 3.17838L3.17838 2L7.34505 6.16667ZM4.29167 7.83333H3.66667V16.1667H10.3333V17.8333H2.83333C2.3731 17.8333 2 17.4602 2 17V7C2 6.60413 2.27606 6.27278 2.64616 6.18783L4.29167 7.83333ZM9.29167 12.8333H6.16667V11.1667H7.625L9.29167 12.8333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the inbox icon from the CKW Elements Figma icon set. */
export function IconInbox({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7 14.5C7.27863 14.5 7.53881 14.6392 7.69336 14.8711L9.11263 17H14.8873L16.3067 14.8711L16.3693 14.7889C16.5265 14.6068 16.7561 14.5 17 14.5H21.1667C21.6269 14.5 22 14.8731 22 15.3333V21.1667C22 21.6269 21.6269 22 21.1667 22H2.83333C2.3731 22 2 21.6269 2 21.1667V15.3333C2 14.8731 2.3731 14.5 2.83333 14.5H7ZM3.66667 20.3333H20.3333V16.1667H17.446L16.0267 18.2956C15.8722 18.5274 15.612 18.6667 15.3333 18.6667H8.66667C8.38804 18.6667 8.12786 18.5274 7.97331 18.2956L6.55403 16.1667H3.66667V20.3333ZM18.6667 2C19.1269 2 19.5 2.3731 19.5 2.83333V12.8333H17.8333V3.66667H6.16667V12.8333H4.5V2.83333C4.5 2.3731 4.8731 2 5.33333 2H18.6667ZM15.3333 11.1667H8.66667V9.5H15.3333V11.1667ZM15.3333 7.83333H8.66667V6.16667H15.3333V7.83333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the information icon from the CKW Elements Figma icon set. */
export function IconInformation({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.8333 6.16667V7.83333H11.1667V6.16667H12.8333ZM11.1667 11.1667H9.5V9.5H12.8333V15.3333H14.5V17H9.5V15.3333H11.1667V11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the keys icon from the CKW Elements Figma icon set. */
export function IconKeys({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M9.49996 2C12.7216 2 15.3333 4.61168 15.3333 7.83333C15.3333 10.772 13.16 13.2012 10.3333 13.6057V22H8.66663V20.3333H6.16663V18.6667H8.66663V17H6.16663V15.3333H8.66663V13.6057C5.83985 13.2012 3.66663 10.772 3.66663 7.83333C3.66663 4.61168 6.2783 2 9.49996 2ZM14.8833 3.2321C16.4856 3.64682 17.9022 4.73675 18.678 6.34408C19.9553 8.99059 19.0542 12.1233 16.6842 13.7163L20.3333 21.2757L18.8326 22L18.1075 20.4985L15.8565 21.5858L15.1315 20.0851L17.3833 18.9979L16.6581 17.4964L14.4072 18.5837L13.6829 17.083L15.9339 15.9958L15.1835 14.4414C14.087 14.7893 12.9432 14.7945 11.8844 14.5041C12.842 14.1617 13.7035 13.6186 14.4202 12.9261C14.6962 12.8579 14.9702 12.7608 15.2365 12.6323C17.3085 11.6319 18.1775 9.14058 17.1774 7.06836C16.954 6.60568 16.6556 6.20331 16.305 5.868C16.0215 4.88455 15.5311 3.98937 14.8833 3.2321ZM9.49996 3.66667C7.19878 3.66667 5.33329 5.53215 5.33329 7.83333C5.33329 10.1345 7.19878 12 9.49996 12C11.8011 12 13.6666 10.1345 13.6666 7.83333C13.6666 5.53215 11.8011 3.66667 9.49996 3.66667ZM9.49996 4.5C9.96019 4.5 10.3333 4.8731 10.3333 5.33333C10.3333 5.79357 9.96019 6.16667 9.49996 6.16667C9.03973 6.16667 8.66663 5.79357 8.66663 5.33333C8.66663 4.8731 9.03973 4.5 9.49996 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the leaf icon from the CKW Elements Figma icon set. */
export function IconLeaf({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.1788 2C21.3943 2.00315 21.6017 2.09008 21.7558 2.24414C21.9319 2.42029 22.02 2.666 21.9959 2.9139V2.91634C21.9958 2.91782 21.9954 2.92018 21.9951 2.92285C21.9946 2.92838 21.9937 2.93685 21.9927 2.94727C21.9906 2.96811 21.9878 2.99896 21.9837 3.03841C21.9754 3.11767 21.963 3.23351 21.9463 3.38102C21.9129 3.67644 21.8621 4.10043 21.7933 4.61637C21.6559 5.64745 21.4452 7.05221 21.1512 8.54216C20.8579 10.0288 20.4781 11.6189 19.9997 13.014C19.5319 14.3781 18.9307 15.6763 18.1369 16.4703C16.7304 17.8767 14.8224 18.6666 12.8333 18.6667C11.1239 18.6667 9.47514 18.082 8.15234 17.0253L3.42252 21.7558L2.24414 20.5775L6.97396 15.8468C5.91748 14.5242 5.33333 12.8758 5.33333 11.1667C5.33333 9.17754 6.12328 7.26967 7.52978 5.86312C8.32372 5.06924 9.62192 4.46812 10.986 4.00032C12.381 3.52195 13.9712 3.1421 15.4578 2.84879C16.9479 2.5548 18.3533 2.34412 19.3844 2.20671C19.9001 2.13799 20.3237 2.0871 20.619 2.05371C20.7667 2.03702 20.8832 2.02457 20.9624 2.01628C21.0018 2.01215 21.0327 2.00942 21.0536 2.00732C21.0637 2.0063 21.0718 2.00542 21.0772 2.00488C21.0798 2.00461 21.0822 2.00421 21.0837 2.00407H21.0861L21.1788 2ZM19.6042 3.85872C18.5957 3.99312 17.227 4.19923 15.7809 4.48454C14.3312 4.77058 12.8217 5.13247 11.5263 5.57666C10.2005 6.03137 9.21683 6.53392 8.70898 7.0415C7.61499 8.1355 7 9.61953 7 11.1667C7 12.4329 7.41273 13.6562 8.16211 14.6587L14.7442 8.07748L15.9225 9.25586L9.33968 15.8379C10.3422 16.5877 11.5666 17 12.8333 17C14.3803 16.9999 15.8646 16.3857 16.9585 15.2918C17.4662 14.7841 17.9685 13.7998 18.4233 12.4737C18.8675 11.1783 19.2303 9.66955 19.5163 8.21989C19.8017 6.77361 20.0068 5.40433 20.1413 4.39583C20.171 4.17249 20.1942 3.96663 20.217 3.78223C20.0328 3.805 19.8271 3.82902 19.6042 3.85872Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the letter icon from the CKW Elements Figma icon set. */
export function IconLetter({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M21.1667 4.5C21.6269 4.5 22 4.8731 22 5.33333V18.6667C22 19.1269 21.6269 19.5 21.1667 19.5H2.83333C2.3731 19.5 2 19.1269 2 18.6667V5.33333C2 4.8731 2.3731 4.5 2.83333 4.5H21.1667ZM12.4476 13.5365C12.1746 13.7102 11.8254 13.7102 11.5524 13.5365L3.66667 8.51774V17.8333H20.3333V8.51774L12.4476 13.5365ZM3.66667 6.54183L12 11.8454L20.3333 6.54183V6.16667H3.66667V6.54183Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the lightbulb icon from the CKW Elements Figma icon set. */
export function IconLightbulb({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M11.8348 6.99512C12.8434 6.96561 13.8421 7.20723 14.7254 7.69498C15.6088 8.18284 16.3453 8.89911 16.8576 9.76856C17.3696 10.6377 17.6384 11.6285 17.6372 12.6372C17.6364 13.703 17.3341 14.7478 16.764 15.6482C16.2907 16.3958 15.6483 17.0183 14.8931 17.4696V19.5C14.893 19.96 14.5197 20.333 14.0597 20.3333H13.6667V21.1667C13.6667 21.6269 13.2936 22 12.8333 22H11.1667C10.7064 22 10.3333 21.6269 10.3333 21.1667V20.3333H9.94108C9.48092 20.3333 9.10784 19.9602 9.10775 19.5V17.4679C8.40046 17.0451 7.79161 16.4716 7.32796 15.785C6.76328 14.9487 6.43398 13.9757 6.37337 12.9684C6.31285 11.9612 6.52339 10.9562 6.98373 10.0583C7.44415 9.16035 8.13732 8.40218 8.99056 7.86344C9.84377 7.32482 10.8263 7.02474 11.8348 6.99512ZM11.8837 8.66097C11.1733 8.68185 10.481 8.89362 9.88004 9.27295C9.27924 9.65238 8.79072 10.1861 8.46648 10.8183C8.14222 11.4508 7.99418 12.1589 8.03678 12.8683C8.07948 13.5779 8.31197 14.2633 8.7098 14.8524C9.10763 15.4414 9.65613 15.9132 10.2983 16.2179C10.5889 16.3559 10.7743 16.649 10.7744 16.9707V18.6667H13.2264V16.9723C13.2265 16.6505 13.4117 16.3575 13.7025 16.2196C14.3806 15.8982 14.9538 15.3903 15.3553 14.7563C15.7568 14.1222 15.9708 13.3868 15.9713 12.6364L15.9624 12.3702C15.9218 11.7522 15.7369 11.1508 15.4213 10.6149C15.0604 10.0025 14.5419 9.49778 13.9198 9.15413C13.2976 8.81058 12.594 8.6402 11.8837 8.66097ZM22 12.8333H19.5V11.1667H22V12.8333ZM4.5 12H2V10.3333H4.5V12ZM6.75586 5.57748L5.57748 6.75586L3.91081 5.08919L5.08919 3.91081L6.75586 5.57748ZM20.0892 5.08919L18.4225 6.75586L17.2442 5.57748L18.9108 3.91081L20.0892 5.08919ZM12.8333 4.5H11.1667V2H12.8333V4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the lightning icon from the CKW Elements Figma icon set. */
export function IconLightning({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3313 2.04153C13.6735 2.15375 13.905 2.47319 13.905 2.83339V8.66673H19.5C19.8141 8.66673 20.1016 8.84341 20.2435 9.12371C20.3854 9.40401 20.3575 9.74028 20.1715 9.99346L11.5999 21.6602C11.3866 21.9504 11.011 22.0708 10.6687 21.9586C10.3264 21.8463 10.095 21.5269 10.095 21.1667V15.3334H4.49996C4.1858 15.3334 3.89833 15.1567 3.75645 14.8764C3.61457 14.5961 3.64239 14.2598 3.8284 14.0067L12.4 2.33998C12.6134 2.0497 12.989 1.92931 13.3313 2.04153ZM6.1463 13.6667H10.9283C11.3885 13.6667 11.7616 14.0398 11.7616 14.5001V18.6251L17.8536 10.3334H13.0716C12.6114 10.3334 12.2383 9.96029 12.2383 9.50006V5.37507L6.1463 13.6667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the lightning filled icon from the CKW Elements Figma icon set. */
export function IconLightningFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3313 2.04153C13.6735 2.15375 13.905 2.47319 13.905 2.83339V8.66673H19.5C19.8141 8.66673 20.1016 8.84341 20.2435 9.12371C20.3854 9.40401 20.3575 9.74028 20.1715 9.99346L11.5999 21.6602C11.3866 21.9504 11.011 22.0708 10.6687 21.9586C10.3264 21.8463 10.095 21.5269 10.095 21.1667V15.3334H4.49996C4.1858 15.3334 3.89833 15.1567 3.75645 14.8764C3.61457 14.5961 3.64239 14.2598 3.8284 14.0067L12.4 2.33998C12.6134 2.0497 12.989 1.92931 13.3313 2.04153Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the list icon from the CKW Elements Figma icon set. */
export function IconList({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M5.33332 16.1668C5.99636 16.1668 6.63205 16.4304 7.1009 16.8992C7.56974 17.3681 7.83332 18.0038 7.83332 18.6668C7.83332 19.1612 7.68647 19.6448 7.41177 20.056C7.13714 20.4669 6.74693 20.7872 6.29035 20.9764C5.83361 21.1656 5.33073 21.2152 4.84585 21.1188C4.3609 21.0223 3.91537 20.7841 3.56575 20.4344C3.21611 20.0847 2.9778 19.6392 2.88134 19.1543C2.78494 18.6694 2.83456 18.1665 3.02375 17.7098C3.21295 17.2532 3.53326 16.863 3.94416 16.5884C4.35528 16.3137 4.83887 16.1668 5.33332 16.1668ZM5.17056 17.8497C5.009 17.882 4.86061 17.9612 4.74413 18.0777C4.62764 18.1942 4.54845 18.3425 4.51626 18.5041C4.48411 18.6657 4.50039 18.8336 4.56346 18.9858C4.62651 19.138 4.73336 19.2678 4.87027 19.3594C5.0073 19.4509 5.1685 19.5002 5.33332 19.5002C5.55434 19.5002 5.76624 19.4123 5.92251 19.256C6.0788 19.0997 6.16665 18.8878 6.16665 18.6668C6.16665 18.502 6.11744 18.3408 6.02586 18.2037C5.93433 18.0668 5.80448 17.96 5.65233 17.897C5.50006 17.8339 5.33221 17.8176 5.17056 17.8497ZM21.1667 17.8327V19.4993H9.49999V17.8327H21.1667ZM5.33332 9.50016C5.99636 9.50016 6.63205 9.76375 7.1009 10.2326C7.56974 10.7014 7.83332 11.3372 7.83332 12.0002C7.83332 12.4946 7.68647 12.9782 7.41177 13.3893C7.13714 13.8002 6.74693 14.1205 6.29035 14.3097C5.83361 14.4989 5.33073 14.5486 4.84585 14.4522C4.3609 14.3557 3.91537 14.1174 3.56575 13.7677C3.21611 13.4181 2.9778 12.9726 2.88134 12.4877C2.78494 12.0027 2.83456 11.4998 3.02375 11.0432C3.21295 10.5866 3.53326 10.1963 3.94416 9.92171C4.35528 9.64701 4.83887 9.50016 5.33332 9.50016ZM5.17056 11.1831C5.009 11.2153 4.86061 11.2945 4.74413 11.411C4.62764 11.5275 4.54845 11.6758 4.51626 11.8374C4.48411 11.9991 4.50039 12.1669 4.56346 12.3192C4.62651 12.4713 4.73336 12.6012 4.87027 12.6927C5.0073 12.7842 5.1685 12.8335 5.33332 12.8335C5.55434 12.8335 5.76624 12.7457 5.92251 12.5893C6.0788 12.4331 6.16665 12.2212 6.16665 12.0002C6.16665 11.8353 6.11744 11.6742 6.02586 11.5371C5.93433 11.4002 5.80448 11.2933 5.65233 11.2303C5.50006 11.1672 5.33221 11.1509 5.17056 11.1831ZM21.1667 12.8327H9.49999V11.166H21.1667V12.8327ZM5.33332 2.8335C5.99636 2.8335 6.63205 3.09708 7.1009 3.56592C7.56974 4.03476 7.83332 4.67045 7.83332 5.3335C7.83332 5.82795 7.68647 6.31153 7.41177 6.72265C7.13714 7.13355 6.74693 7.45387 6.29035 7.64306C5.83361 7.83225 5.33073 7.88188 4.84585 7.78548C4.3609 7.68902 3.91537 7.4507 3.56575 7.10107C3.21611 6.75145 2.9778 6.30591 2.88134 5.82096C2.78494 5.33609 2.83456 4.8332 3.02375 4.37646C3.21295 3.91989 3.53326 3.52968 3.94416 3.25505C4.35528 2.98035 4.83887 2.8335 5.33332 2.8335ZM5.17056 4.51644C5.009 4.54862 4.86061 4.62781 4.74413 4.7443C4.62764 4.8608 4.54845 5.00917 4.51626 5.17074C4.48411 5.33239 4.50039 5.50024 4.56346 5.6525C4.62651 5.80465 4.73336 5.9345 4.87027 6.02604C5.0073 6.11761 5.1685 6.16683 5.33332 6.16683C5.55434 6.16683 5.76624 6.07897 5.92251 5.92269C6.0788 5.7664 6.16665 5.55451 6.16665 5.3335C6.16665 5.16868 6.11744 5.00749 6.02586 4.87045C5.93433 4.73354 5.80448 4.62669 5.65233 4.56364C5.50006 4.50056 5.33221 4.48429 5.17056 4.51644ZM21.1667 6.16601H9.49999V4.49935H21.1667V6.16601Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the lock icon from the CKW Elements Figma icon set. */
export function IconLock({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.2889 2.00732C13.7308 2.07877 15.0995 2.6825 16.1251 3.70817C17.2191 4.80213 17.8333 6.28624 17.8333 7.83333V10.3333H19.5C19.9602 10.3333 20.3333 10.7064 20.3333 11.1667V21.1667C20.3333 21.6269 19.9602 22 19.5 22H4.49996C4.03973 22 3.66663 21.6269 3.66663 21.1667V11.1667C3.66663 10.7064 4.03973 10.3333 4.49996 10.3333H6.16663V7.83333C6.16663 6.28623 6.78083 4.80213 7.87479 3.70817C8.96876 2.61421 10.4529 2 12 2L12.2889 2.00732ZM5.33329 20.3333H18.6666V12H5.33329V20.3333ZM12 14.5C12.9205 14.5 13.6666 15.2462 13.6666 16.1667C13.6666 17.0872 12.9205 17.8333 12 17.8333C11.0795 17.8333 10.3333 17.0872 10.3333 16.1667C10.3333 15.2462 11.0795 14.5 12 14.5ZM12 3.66667C10.8949 3.66667 9.8354 4.10597 9.05399 4.88737C8.27259 5.66878 7.83329 6.72827 7.83329 7.83333V10.3333H16.1666V7.83333C16.1666 6.72827 15.7273 5.66878 14.946 4.88737C14.2134 4.15483 13.2365 3.72266 12.2066 3.67155L12 3.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the log out icon from the CKW Elements Figma icon set. */
export function IconLogOut({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M14.5 2C14.9602 2 15.3333 2.3731 15.3333 2.83333V5.92252H13.6667V3.66667H3.66667V20.3333H13.6667V18.4225H15.3333V21.1667C15.3333 21.6269 14.9602 22 14.5 22H2.83333C2.3731 22 2 21.6269 2 21.1667V2.83333C2 2.3731 2.3731 2 2.83333 2H14.5ZM21.7558 11.4108C22.0813 11.7362 22.0813 12.2638 21.7558 12.5892L16.7558 17.5892L15.5775 16.4108L19.1549 12.8333H7.83333V11.1667H19.1549L15.5775 7.58919L16.7558 6.41081L21.7558 11.4108Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the log out door icon from the CKW Elements Figma icon set. */
export function IconLogOutDoor({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8547 2.18331C11.0519 2.34147 11.1667 2.58057 11.1667 2.83334V21.1667C11.1667 21.4194 11.0519 21.6586 10.8547 21.8167C10.6576 21.9748 10.3993 22.035 10.1526 21.9802L2.65256 20.3135C2.27128 20.2288 2 19.8906 2 19.5V4.50001C2 4.10943 2.27128 3.77125 2.65256 3.68652L10.1526 2.01985C10.3993 1.96502 10.6576 2.02514 10.8547 2.18331ZM3.66667 5.16848V18.8315L9.5 20.1278V3.87218L3.66667 5.16848ZM17 5.33334H12.8333V3.66667H17.8333C18.2936 3.66667 18.6667 4.03977 18.6667 4.50001V12.8333H17V5.33334ZM19.1548 18.6667H12.2775V17H19.1548L17.2441 15.0892L18.4226 13.9108L21.7559 17.2441C22.0813 17.5695 22.0813 18.0972 21.7559 18.4226L18.4226 21.7559L17.2441 20.5774L19.1548 18.6667ZM8.25 12C8.25 12.5753 7.78363 13.0417 7.20833 13.0417C6.63303 13.0417 6.16667 12.5753 6.16667 12C6.16667 11.4248 6.63303 10.9583 7.20833 10.9583C7.78363 10.9583 8.25 11.4248 8.25 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the megaphone icon from the CKW Elements Figma icon set. */
export function IconMegaphone({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M18.346 2.89766C18.6033 2.7905 18.8971 2.81879 19.129 2.97335C19.3608 3.1279 19.5 3.38808 19.5 3.6667V7.44763C20.0241 7.91506 20.4433 8.48807 20.7305 9.12895C21.0177 9.7699 21.1667 10.4644 21.1667 11.1667C21.1667 11.869 21.0177 12.5635 20.7305 13.2045C20.4433 13.8454 20.0241 14.4184 19.5 14.8858V18.6667C19.5 18.9454 19.3608 19.2055 19.129 19.36C18.8971 19.5146 18.6033 19.5429 18.346 19.4358L9.50004 15.7492V21.1667H7.83337V15.3334H7.00004C5.89497 15.3334 4.83548 14.894 4.05407 14.1127C3.32153 13.3801 2.88937 12.4032 2.83826 11.3734L2.83337 11.1667C2.83337 10.0616 3.27267 9.00214 4.05407 8.22074C4.83548 7.43934 5.89497 7.00004 7.00004 7.00004H8.50069L18.346 2.89766ZM9.50004 8.38839V13.9442L17.8334 17.4167V4.91589L9.50004 8.38839ZM7.00004 8.6667C6.337 8.6667 5.70131 8.93029 5.23247 9.39913C4.76362 9.86796 4.50004 10.5037 4.50004 11.1667L4.51225 11.4141C4.56913 11.9863 4.8223 12.5241 5.23247 12.9343C5.70131 13.4031 6.337 13.6667 7.00004 13.6667H7.83337V8.6667H7.00004Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the message icon from the CKW Elements Figma icon set. */
export function IconMessage({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8333 3.6665C17.8112 3.66651 22 7.31667 22 11.9998C22 16.683 17.8112 20.3332 12.8333 20.3332H2.83331C2.4963 20.3332 2.19246 20.1302 2.06345 19.8188C1.93447 19.5074 2.00579 19.149 2.24412 18.9107L4.92803 16.2259C4.11351 14.973 3.67212 13.508 3.66664 12.0031V11.9998C3.66664 7.31666 7.85535 3.6665 12.8333 3.6665ZM12.8333 5.33317C8.60627 5.33317 5.33331 8.398 5.33331 11.9998C5.33896 13.3796 5.80991 14.7169 6.66958 15.7963C6.93362 16.1278 6.90644 16.6048 6.60691 16.9046L4.84503 18.6665H12.8333C17.0603 18.6665 20.3333 15.6017 20.3333 11.9998C20.3333 8.39801 17.0603 5.33318 12.8333 5.33317ZM17 14.4998H8.66664V12.8332H17V14.4998ZM14.5 10.3332H8.66664V8.6665H14.5V10.3332Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the meter icon from the CKW Elements Figma icon set. */
export function IconMeter({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M17 3.6665C17.442 3.6665 17.8659 3.84222 18.1785 4.15479C18.491 4.46735 18.6667 4.89115 18.6667 5.33317V18.6665C18.6667 19.1085 18.491 19.5323 18.1785 19.8449C17.8659 20.1574 17.442 20.3332 17 20.3332H7.00004C6.55802 20.3332 6.13422 20.1574 5.82166 19.8449C5.50909 19.5323 5.33337 19.1085 5.33337 18.6665V5.33317C5.33337 4.89115 5.50909 4.46735 5.82166 4.15479C6.13422 3.84222 6.55802 3.6665 7.00004 3.6665H17ZM7.00004 18.6665H17V5.33317H7.00004V18.6665ZM9.37634 13.0236C9.83308 12.8344 10.336 12.7848 10.8209 12.8812C11.3058 12.9777 11.7513 13.2159 12.101 13.5656C12.4506 13.9153 12.6889 14.3608 12.7854 14.8457C12.8818 15.3306 12.8321 15.8335 12.643 16.2902C12.4537 16.7468 12.1335 17.137 11.7225 17.4116C11.3114 17.6863 10.8278 17.8332 10.3334 17.8332C9.67033 17.8332 9.03464 17.5696 8.5658 17.1008C8.09696 16.6319 7.83337 15.9962 7.83337 15.3332C7.83337 14.8388 7.98022 14.3552 8.25492 13.944C8.52956 13.5331 8.91977 13.2128 9.37634 13.0236ZM14.5 16.1665C14.9603 16.1665 15.3334 16.5396 15.3334 16.9998C15.3334 17.4601 14.9603 17.8332 14.5 17.8332C14.0398 17.8332 13.6667 17.4601 13.6667 16.9998C13.6667 16.5396 14.0398 16.1665 14.5 16.1665ZM10.3334 14.4998C10.1124 14.4998 9.90046 14.5877 9.74418 14.744C9.5879 14.9003 9.50004 15.1122 9.50004 15.3332C9.50004 15.498 9.54926 15.6592 9.64083 15.7963C9.73237 15.9332 9.86222 16.04 10.0144 16.103C10.1666 16.1661 10.3345 16.1824 10.4961 16.1503C10.6577 16.118 10.806 16.0388 10.9225 15.9223C11.039 15.8058 11.1182 15.6575 11.1505 15.4959C11.1826 15.3343 11.1663 15.1664 11.1032 15.0142C11.0402 14.862 10.9334 14.7322 10.7965 14.6406C10.6594 14.5491 10.4982 14.4998 10.3334 14.4998ZM14.5 13.6665C14.9603 13.6665 15.3334 14.0396 15.3334 14.4998C15.3334 14.9601 14.9603 15.3332 14.5 15.3332C14.0398 15.3332 13.6667 14.9601 13.6667 14.4998C13.6667 14.0396 14.0398 13.6665 14.5 13.6665ZM15.3334 6.1665C15.5544 6.1665 15.7663 6.25436 15.9225 6.41065C16.0789 6.56692 16.1667 6.77882 16.1667 6.99984V11.1665C16.1667 11.3875 16.0789 11.5994 15.9225 11.7557C15.7663 11.912 15.5544 11.9998 15.3334 11.9998H8.66671C8.44569 11.9998 8.23379 11.912 8.07752 11.7557C7.92123 11.5994 7.83337 11.3875 7.83337 11.1665V6.99984C7.83337 6.77882 7.92123 6.56692 8.07752 6.41065C8.23379 6.25436 8.44569 6.1665 8.66671 6.1665H15.3334ZM9.50004 10.3332H10.8436L10.3733 8.93018L11.9569 8.40202L12.6006 10.3332H14.5V7.83317H9.50004V10.3332Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the minus circle icon from the CKW Elements Figma icon set. */
export function IconMinusCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 12C3.66667 7.39762 7.39762 3.66667 12 3.66667C16.6023 3.66667 20.3333 7.39762 20.3333 12C20.3333 16.6023 16.6023 20.3333 12 20.3333C7.39762 20.3333 3.66667 16.6023 3.66667 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12.8333H17V11.1667H7V12.8333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the no fire icon from the CKW Elements Figma icon set. */
export function IconNoFire({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M20.9225 5.08919L16.1789 9.83203C16.8059 10.3567 17.3378 10.9899 17.7471 11.7038C18.2938 12.6573 18.6061 13.7265 18.6594 14.8223L18.6667 15.042V15.0558C18.6665 18.955 15.2441 21.9951 11.1749 21.9992L11.1756 22C11.1739 22 11.1718 21.9992 11.17 21.9992C11.1689 21.9992 11.1678 22 11.1667 22C10.07 22.0103 8.98361 21.787 7.97986 21.3449C7.24226 21.02 6.56236 20.5813 5.96244 20.0485L4.2559 21.7558L3.07751 20.5775L19.7442 3.91081L20.9225 5.08919ZM14.6669 11.3449V13.5275C14.6668 13.8265 14.5065 14.1026 14.247 14.251C14.0195 14.3808 13.7461 14.3953 13.5088 14.2949L13.4104 14.2445L13.1882 14.1069C12.9315 13.9401 12.6874 13.7548 12.459 13.5519L7.14408 18.8668C7.59608 19.2557 8.10298 19.5783 8.65125 19.8198C9.4405 20.1674 10.2954 20.3431 11.1578 20.3342L11.1667 20.3333C14.453 20.3333 16.9914 17.9122 17 15.0705L16.9838 14.7368C16.9215 13.9623 16.6888 13.2094 16.301 12.533C15.9651 11.9473 15.5207 11.4332 14.994 11.0169L14.6669 11.3449ZM10.6035 2.21892C10.8819 1.96383 11.297 1.92788 11.6151 2.13102C11.9334 2.33436 12.0755 2.72659 11.961 3.08643C11.3157 5.11268 11.2473 7.27855 11.764 9.34131L10.1478 9.74658C9.78261 8.28891 9.67239 6.78637 9.81498 5.30404C7.79119 7.39346 6.69717 9.02263 6.09672 10.3903C5.33923 12.1157 5.33337 13.4888 5.33337 15.0558C5.33306 15.3633 5.36247 15.6711 5.42126 15.973L3.78552 16.292C3.70615 15.8845 3.66629 15.4702 3.66671 15.055C3.66671 13.4733 3.66118 11.7909 4.57002 9.72054C5.46912 7.67263 7.22914 5.31199 10.6035 2.21892Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the oven icon from the CKW Elements Figma icon set. */
export function IconOven({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M22 3.66667H21.1667V17C21.6269 17 22 17.3731 22 17.8333V21.1667C22 21.6269 21.6269 22 21.1667 22H2.83333C2.3731 22 2 21.6269 2 21.1667V17.8333C2 17.3731 2.3731 17 2.83333 17V3.66667H2V2H22V3.66667ZM3.66667 20.3333H20.3333V18.6667H3.66667V20.3333ZM4.5 17H19.5V3.66667H4.5V17ZM17 8.66667C17.4602 8.66667 17.8333 9.03976 17.8333 9.5V14.5C17.8333 14.9602 17.4602 15.3333 17 15.3333H7C6.53977 15.3333 6.16667 14.9602 6.16667 14.5V9.5C6.16667 9.03976 6.53977 8.66667 7 8.66667H17ZM7.83333 13.6667H16.1667V10.3333H7.83333V13.6667ZM7 5.33333C7.46023 5.33333 7.83333 5.70643 7.83333 6.16667C7.83333 6.6269 7.46023 7 7 7C6.53977 7 6.16667 6.6269 6.16667 6.16667C6.16667 5.70643 6.53977 5.33333 7 5.33333ZM10.3333 5.33333C10.7936 5.33333 11.1667 5.70643 11.1667 6.16667C11.1667 6.6269 10.7936 7 10.3333 7C9.87309 7 9.5 6.6269 9.5 6.16667C9.5 5.70643 9.87309 5.33333 10.3333 5.33333ZM17.8333 7H12.8333V5.33333H17.8333V7Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the paper icon from the CKW Elements Figma icon set. */
export function IconPaper({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M19.5 2C19.9602 2 20.3333 2.3731 20.3333 2.83333V21.1667C20.3333 21.6269 19.9602 22 19.5 22H4.49996C4.03973 22 3.66663 21.6269 3.66663 21.1667V2.83333C3.66663 2.3731 4.03973 2 4.49996 2H19.5ZM5.33329 20.3333H18.6666V3.66667H5.33329V20.3333ZM14.5 17H6.99996V15.3333H14.5V17ZM17 12.8333H6.99996V11.1667H17V12.8333ZM17 8.66667H6.99996V7H17V8.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the paper filled icon from the CKW Elements Figma icon set. */
export function IconPaperFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66663 2.83333C3.66663 2.3731 4.03973 2 4.49996 2H19.5C19.9602 2 20.3333 2.3731 20.3333 2.83333V21.1667C20.3333 21.6269 19.9602 22 19.5 22H4.49996C4.03973 22 3.66663 21.6269 3.66663 21.1667V2.83333ZM6.99996 8.66667H17V7H6.99996V8.66667ZM17 12.8333H6.99996V11.1667H17V12.8333ZM6.99996 17H14.5V15.3333H6.99996V17Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the paperclip icon from the CKW Elements Figma icon set. */
export function IconPaperclip({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33337 8.66667C5.33337 4.98477 8.31814 2 12 2C15.682 2 18.6667 4.98477 18.6667 8.66667V17.8333H17V8.66667C17 5.90524 14.7615 3.66667 12 3.66667C9.23862 3.66667 7.00004 5.90524 7.00004 8.66667V17.2083C7.00004 18.9342 8.39915 20.3333 10.125 20.3333C11.851 20.3333 13.25 18.9342 13.25 17.2083V8.25C13.25 7.55964 12.6904 7 12 7C11.3097 7 10.75 7.55964 10.75 8.25V17.8333H9.08337V8.25C9.08337 6.63917 10.3892 5.33333 12 5.33333C13.6109 5.33333 14.9167 6.63917 14.9167 8.25V17.2083C14.9167 19.8547 12.7714 22 10.125 22C7.47867 22 5.33337 19.8547 5.33337 17.2083V8.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the pencil icon from the CKW Elements Figma icon set. */
export function IconPencil({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5033 2.24408C16.8287 1.91864 17.3563 1.91864 17.6818 2.24408L21.7559 6.31824C22.0814 6.64368 22.0814 7.17132 21.7559 7.49676L8.95178 20.3009C8.84744 20.4053 8.71728 20.48 8.57459 20.5176L3.04543 21.9726C2.7588 22.048 2.45367 21.9655 2.2441 21.7559C2.03452 21.5463 1.95203 21.2413 2.02745 20.9546L3.48246 15.4254C3.52 15.2828 3.59477 15.1526 3.6991 15.0483L16.5033 2.24408ZM4.96738 16.3317L4.00279 19.9972L7.6683 19.0327L4.96738 16.3317ZM6.04852 15.0558L8.94417 17.9515L17.0782 9.81749L14.1825 6.92184L6.04852 15.0558ZM19.9882 6.9075L18.2567 8.63898L15.361 5.74332L17.0925 4.01184L19.9882 6.9075Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the people icon from the CKW Elements Figma icon set. */
export function IconPeople({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.83333 14.5005C9.37989 14.5023 10.8625 15.1175 11.9561 16.2111C13.0496 17.3047 13.6649 18.7873 13.6667 20.3338V22.0005H2V20.3338C2.00176 18.7873 2.61711 17.3047 3.71061 16.2111C4.80419 15.1175 6.28678 14.5023 7.83333 14.5005ZM16.1667 14.5005C17.7133 14.5023 19.1958 15.1175 20.2894 16.2111C21.3829 17.3047 21.9982 18.7873 22 20.3338V22.0005H15.3333V20.3338H20.3333C20.3324 19.6677 20.172 19.0112 19.8654 18.4198C19.5587 17.8284 19.1147 17.3184 18.5707 16.9338C18.0266 16.5491 17.3978 16.3007 16.7379 16.2087C16.0781 16.1168 15.4059 16.1844 14.7775 16.4056L14.2225 14.8333C14.8469 14.6126 15.5044 14.5003 16.1667 14.5005ZM7.83333 16.1672C6.7284 16.1672 5.66874 16.6058 4.88737 17.3871C4.10597 18.1685 3.66667 19.2288 3.66667 20.3338H12C12 19.2288 11.5607 18.1685 10.7793 17.3871C9.99792 16.6058 8.93827 16.1672 7.83333 16.1672ZM6.55811 7.25362C7.16703 7.0015 7.83717 6.93545 8.48356 7.064C9.13003 7.19259 9.72397 7.51025 10.1901 7.97627C10.6562 8.44244 10.9738 9.03702 11.1024 9.68362C11.2309 10.3301 11.165 11.0001 10.9128 11.6091C10.6605 12.218 10.2335 12.7386 9.68555 13.1049C9.13738 13.4711 8.49261 13.6672 7.83333 13.6672C6.94934 13.6672 6.10168 13.3157 5.47657 12.6906C4.8515 12.0656 4.50007 11.2178 4.5 10.3338C4.5 9.67461 4.69528 9.02979 5.06153 8.48164C5.42779 7.93348 5.94902 7.50591 6.55811 7.25362ZM15.5164 7.064C16.1628 6.93545 16.833 7.0015 17.4419 7.25362C18.051 7.50591 18.5722 7.93348 18.9385 8.48164C19.3047 9.02979 19.5 9.67461 19.5 10.3338C19.4999 11.2178 19.1485 12.0656 18.5234 12.6906C17.8983 13.3157 17.0507 13.6672 16.1667 13.6672C15.5074 13.6672 14.8626 13.4711 14.3144 13.1049C13.7665 12.7386 13.3395 12.218 13.0872 11.6091C12.835 11.0001 12.7691 10.3301 12.8976 9.68362C13.0262 9.03702 13.3438 8.44244 13.8099 7.97627C14.276 7.51025 14.87 7.19259 15.5164 7.064ZM16.4922 8.69893C16.1689 8.63462 15.8332 8.66799 15.5287 8.79414C15.2242 8.9203 14.9638 9.13376 14.7808 9.40775C14.5977 9.6818 14.5 10.0043 14.5 10.3338C14.5001 10.7758 14.6757 11.1998 14.9882 11.5123C15.3008 11.8247 15.7247 12.0005 16.1667 12.0005C16.4963 12.0005 16.8187 11.9028 17.0927 11.7198C17.3668 11.5366 17.5803 11.2756 17.7064 10.9711C17.8324 10.6666 17.8659 10.3315 17.8016 10.0083C17.7373 9.68512 17.5781 9.38853 17.3451 9.15547C17.1121 8.92247 16.8153 8.76328 16.4922 8.69893ZM7.83333 8.66719C7.39131 8.66719 6.96751 8.84291 6.65495 9.15547C6.34247 9.46802 6.16667 9.89188 6.16667 10.3338C6.16672 10.6633 6.26448 10.9852 6.44742 11.2592C6.63054 11.5332 6.89083 11.7474 7.19532 11.8736C7.49986 11.9997 7.83555 12.0323 8.15885 11.9679C8.48194 11.9036 8.77875 11.7452 9.01172 11.5123C9.24481 11.2792 9.40395 10.9819 9.46826 10.6586C9.53251 10.3354 9.49916 10.0003 9.37305 9.69583C9.24693 9.39135 9.03344 9.13107 8.75944 8.94795C8.48536 8.76482 8.16297 8.66719 7.83333 8.66719Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the phone icon from the CKW Elements Figma icon set. */
export function IconPhone({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M2.48242 8.57389V5.72802C2.4825 4.73933 2.87542 3.79125 3.57455 3.09213C4.27367 2.393 5.22175 2.00008 6.21045 2H10.0703C10.5304 2.00021 10.9036 2.37323 10.9036 2.83333V9.58789C10.9034 10.0478 10.5303 10.421 10.0703 10.4213H8.97331V10.5522C8.97331 11.8668 9.49557 13.1277 10.4251 14.0573C11.1563 14.7884 12.0925 15.2654 13.0984 15.4367L13.1009 14.4146L13.1049 14.3299C13.1484 13.9103 13.5034 13.5837 13.9343 13.5837H20.6839C21.1442 13.5837 21.5173 13.9567 21.5173 14.417V18.272C21.5172 19.2607 21.1243 20.2087 20.4251 20.9079C19.7259 21.607 18.7779 22 17.7892 22H15.9085C12.3479 21.9998 8.93248 20.5855 6.41471 18.0677C3.89694 15.5499 2.48266 12.1346 2.48242 8.57389ZM4.14909 8.57389C4.1493 11.6926 5.38867 14.6833 7.59391 16.8885C9.79915 19.0938 12.7899 20.3332 15.9085 20.3333H17.7892C18.3359 20.3333 18.8602 20.1161 19.2468 19.7295C19.6333 19.3429 19.8505 18.8187 19.8506 18.272V15.2503H14.7659L14.7635 16.3441C14.7625 16.8035 14.3896 17.1757 13.9302 17.1757C12.1735 17.1757 10.4889 16.4778 9.24675 15.2357C8.00463 13.9936 7.30664 12.3088 7.30664 10.5522V9.58789C7.30664 9.12765 7.67974 8.75456 8.13997 8.75456H9.23698V3.66667H6.21045C5.66377 3.66675 5.1395 3.88394 4.75293 4.27051C4.36636 4.65707 4.14917 5.18135 4.14909 5.72802V8.57389Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the placeholder icon from the CKW Elements Figma icon set. */
export function IconPlaceholder({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004ZM8.27349 5.84828C8.54446 5.70327 8.87324 5.71916 9.12896 5.88963L10.5605 6.84401L11.4108 5.99375C11.7362 5.66832 12.2639 5.66832 12.5893 5.99375L13.4395 6.84401L14.8711 5.88963C15.1269 5.71916 15.4556 5.70327 15.7266 5.84828C15.9975 5.99329 16.1667 6.27567 16.1667 6.58301V9.08301C16.1667 10.1881 15.7277 11.2479 14.9463 12.0293C14.3644 12.6113 13.6279 13.0033 12.8334 13.1655V16.0604C13.0003 15.8158 13.2029 15.5704 13.4371 15.3362C14.4456 14.3277 15.659 13.9058 16.147 14.394C16.6352 14.8822 16.2134 16.0954 15.2049 17.104C14.476 17.8328 13.8418 18.2558 13.25 18.2497L12.8334 18.2494L11.1667 18.2497H10.75C10.1583 18.2558 9.52412 17.8328 8.79522 17.104C7.78669 16.0954 7.36484 14.8822 7.853 14.394C8.34116 13.9058 9.55446 14.3277 10.563 15.3362C10.7972 15.5704 10.9998 15.8158 11.1667 16.0604V13.1655C10.3722 13.0033 9.63575 12.6113 9.05377 12.0293C8.27236 11.2479 7.83337 10.1881 7.83337 9.08301V6.58301C7.83337 6.27567 8.00252 5.99329 8.27349 5.84828ZM9.50004 8.14011V9.08301C9.50004 9.74605 9.76343 10.3819 10.2323 10.8508C10.7011 11.3196 11.337 11.583 12 11.583C12.663 11.583 13.299 11.3196 13.7678 10.8508C14.2366 10.3819 14.5 9.74605 14.5 9.08301V8.14011L13.7956 8.60972C13.4651 8.83007 13.025 8.78648 12.7441 8.5056L12 7.76152L11.256 8.5056C10.975 8.78648 10.535 8.83007 10.2045 8.60972L9.50004 8.14011Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the plug icon from the CKW Elements Figma icon set. */
export function IconPlug({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66671 2V7H6.16671C5.70647 7 5.33337 7.3731 5.33337 7.83333V12C5.33337 13.7681 6.03575 15.4638 7.286 16.7141C8.33818 17.7663 9.70587 18.4304 11.1667 18.6144V22H12.8334V18.6144C14.2942 18.4304 15.6619 17.7663 16.7141 16.7141C17.9643 15.4638 18.6667 13.7681 18.6667 12V7.83333C18.6667 7.3731 18.2936 7 17.8334 7H15.3334V2H13.6667V7H10.3334V2H8.66671ZM7.00004 8.66667V12C7.00004 13.3261 7.52682 14.5978 8.46451 15.5355C9.40219 16.4732 10.674 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4733 14.5978 17 13.3261 17 12V8.66667H7.00004Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the plug filled icon from the CKW Elements Figma icon set. */
export function IconPlugFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66671 7V2H10.3334V7H13.6667V2H15.3334V7H17.8334C18.2936 7 18.6667 7.3731 18.6667 7.83333V12C18.6667 15.4277 16.1433 18.2122 12.8334 18.6162V22H11.1667V18.6162C7.85677 18.2122 5.33337 15.4277 5.33337 12V7.83333C5.33337 7.3731 5.70647 7 6.16671 7H8.66671Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the plus icon from the CKW Elements Figma icon set. */
export function IconPlus({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12.8334 11.1663H21.1667V12.833H12.8334V21.1663H11.1667V12.833H2.83337V11.1663H11.1667V2.83301H12.8334V11.1663Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the power button icon from the CKW Elements Figma icon set. */
export function IconPowerButton({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1667 2V10.3333H12.8334V2H11.1667ZM5.33641 9.38921C6.12712 7.8583 7.42085 6.64634 9.00006 5.95712L8.33339 4.4296C6.40325 5.27198 4.82202 6.75326 3.8556 8.62437C2.88916 10.4955 2.59648 12.6423 3.02675 14.7038C3.45701 16.7653 4.58399 18.6158 6.21818 19.9442C7.85237 21.2725 9.8941 21.9977 12 21.9977C14.106 21.9977 16.1477 21.2725 17.782 19.9442C19.4161 18.6158 20.5431 16.7653 20.9734 14.7038C21.4036 12.6423 21.111 10.4955 20.1445 8.62437C19.178 6.75326 17.5969 5.27198 15.6667 4.4296L15 5.95712C16.5793 6.64634 17.873 7.8583 18.6637 9.38921C19.4544 10.9201 19.6939 12.6766 19.3419 14.3633C18.9898 16.05 18.0677 17.5641 16.7307 18.6509C15.3936 19.7377 13.7231 20.331 12 20.331C10.277 20.331 8.6065 19.7377 7.26943 18.6509C5.93236 17.5641 5.01029 16.05 4.65826 14.3633C4.30622 12.6766 4.54569 10.9201 5.33641 9.38921Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the price tag icon from the CKW Elements Figma icon set. */
export function IconPriceTag({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.86666 2.0332C2.40642 2.0332 2.03333 2.4063 2.03333 2.86654V11.1157C2.03333 11.3368 2.12112 11.5487 2.2774 11.7049L12.2949 21.7224C12.6204 22.0479 13.148 22.0479 13.4734 21.7224L21.7225 13.4733C22.048 13.1478 22.048 12.6203 21.7225 12.2948L11.705 2.27728C11.5488 2.121 11.3369 2.0332 11.1158 2.0332H2.86666ZM3.69999 10.7705V3.69987H10.7706L19.9548 12.884L12.8841 19.9547L3.69999 10.7705ZM7.03333 7.86654C7.03333 7.4063 7.40642 7.0332 7.86666 7.0332C8.32689 7.0332 8.69999 7.4063 8.69999 7.86654C8.69999 8.32677 8.32689 8.69987 7.86666 8.69987C7.40642 8.69987 7.03333 8.32677 7.03333 7.86654ZM7.86666 5.36654C6.48594 5.36654 5.36666 6.48582 5.36666 7.86654C5.36666 9.24725 6.48594 10.3665 7.86666 10.3665C9.24737 10.3665 10.3666 9.24725 10.3666 7.86654C10.3666 6.48582 9.24737 5.36654 7.86666 5.36654Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the qr code icon from the CKW Elements Figma icon set. */
export function IconQrCode({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.83337 15.333C8.29361 15.333 8.66671 15.7061 8.66671 16.1663V20.333C8.66671 20.7933 8.29361 21.1663 7.83337 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V16.1663C2.83337 15.7061 3.20647 15.333 3.66671 15.333H7.83337ZM12 19.4997H13.6667V21.1663H11.1667C10.7065 21.1663 10.3334 20.7933 10.3334 20.333V15.333H12V19.4997ZM20.3334 15.333C20.7936 15.333 21.1667 15.7061 21.1667 16.1663V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H16.1667C15.7065 21.1663 15.3334 20.7933 15.3334 20.333V16.1663C15.3334 15.7061 15.7065 15.333 16.1667 15.333H20.3334ZM4.50004 19.4997H7.00004V16.9997H4.50004V19.4997ZM17 19.4997H19.5V16.9997H17V19.4997ZM4.50004 11.9997H7.00004V10.333H8.66671V12.833C8.66671 13.2933 8.29361 13.6663 7.83337 13.6663H3.66671C3.20647 13.6663 2.83337 13.2933 2.83337 12.833V10.333H4.50004V11.9997ZM14.5 13.6663H10.3334V11.9997H14.5V13.6663ZM21.1667 12.833C21.1667 13.2933 20.7936 13.6663 20.3334 13.6663H16.1667V11.9997H19.5V10.333H21.1667V12.833ZM21.1667 4.49967H14.5V10.333H12.8334V6.99967H10.3334V5.33301H12.8334V3.66634C12.8334 3.20611 13.2065 2.83301 13.6667 2.83301H21.1667V4.49967ZM21.1667 7.83301H17.8334V10.333H16.1667V6.99967C16.1667 6.53944 16.5398 6.16634 17 6.16634H21.1667V7.83301ZM7.83337 2.83301C8.29361 2.83301 8.66671 3.20611 8.66671 3.66634V7.83301C8.66671 8.29324 8.29361 8.66634 7.83337 8.66634H3.66671C3.20647 8.66634 2.83337 8.29324 2.83337 7.83301V3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H7.83337ZM4.50004 6.99967H7.00004V4.49967H4.50004V6.99967Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the question icon from the CKW Elements Figma icon set. */
export function IconQuestion({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.66667C7.39762 3.66667 3.66667 7.39762 3.66667 12C3.66667 16.6023 7.39762 20.3333 12 20.3333C16.6023 20.3333 20.3333 16.6023 20.3333 12C20.3333 7.39762 16.6023 3.66667 12 3.66667ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12.0463 7.41797C11.6581 7.40971 11.2748 7.50517 10.9357 7.6945C10.5967 7.88382 10.3143 8.16018 10.1177 8.49504C9.92116 8.82989 9.81747 9.21114 9.81738 9.59946L8.15072 9.59907C8.15088 8.91425 8.33372 8.24186 8.68044 7.65126C9.02715 7.06068 9.52515 6.57329 10.1231 6.23938C10.721 5.90546 11.3972 5.73711 12.0818 5.75168C12.7665 5.76627 13.4349 5.96325 14.018 6.32232C14.6012 6.68139 15.078 7.18953 15.3993 7.79434C15.7205 8.39915 15.8746 9.07872 15.8456 9.76293C15.8166 10.4472 15.6056 11.1112 15.2343 11.6868C14.8631 12.2622 14.345 12.7282 13.7335 13.0366C13.4629 13.1735 13.2355 13.3827 13.0766 13.641C12.9175 13.8994 12.8333 14.1969 12.8332 14.5003L11.1665 14.4998C11.1667 13.8882 11.3365 13.2885 11.6571 12.7675C11.9777 12.2466 12.4364 11.8247 12.9823 11.5488C13.3291 11.3739 13.6233 11.1095 13.8338 10.7832C14.0443 10.4569 14.164 10.0803 14.1804 9.69238C14.1968 9.30442 14.1095 8.9191 13.9273 8.57618C13.7452 8.23324 13.4748 7.94513 13.1442 7.74153C12.8135 7.53793 12.4346 7.42624 12.0463 7.41797ZM13.0417 17.2083C13.0417 17.7837 12.5753 18.25 12 18.25C11.4247 18.25 10.9583 17.7837 10.9583 17.2083C10.9583 16.633 11.4247 16.1667 12 16.1667C12.5753 16.1667 13.0417 16.633 13.0417 17.2083Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the question filled icon from the CKW Elements Figma icon set. */
export function IconQuestionFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7.41667C10.7936 7.41667 9.83325 8.37693 9.83325 9.58334H8.16658C8.16658 7.45641 9.87313 5.75 12 5.75C14.1269 5.75 15.8334 7.45641 15.8334 9.58334C15.8334 11.0827 14.9729 12.3619 13.7061 12.9953C13.1609 13.2679 12.8333 13.8091 12.8333 14.4167H11.1667C11.1667 13.1909 11.8392 12.0653 12.9607 11.5047C13.6939 11.138 14.1667 10.4173 14.1667 9.58334C14.1667 8.37693 13.2064 7.41667 12 7.41667ZM13.0002 17.2501C13.0002 17.8023 12.5525 18.2501 12.0002 18.2501C11.4479 18.2501 11.0002 17.8023 11.0002 17.2501C11.0002 16.6978 11.4479 16.2501 12.0002 16.2501C12.5525 16.2501 13.0002 16.6978 13.0002 17.2501Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the reactive energy icon from the CKW Elements Figma icon set. */
export function IconReactiveEnergy({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.167 3C20.627 3.00018 20.9998 3.37302 21 3.83301V13H22V14.6699H21V20.167C20.9998 20.627 20.627 20.9998 20.167 21H16.833C16.373 20.9998 16.0002 20.627 16 20.167V14.6699H14.5V20.167C14.4998 20.6269 14.1269 20.9998 13.667 21H10.333C9.87307 20.9998 9.50025 20.6269 9.5 20.167V14.6699H8V20.167C7.99979 20.627 7.62695 20.9998 7.16699 21H3.83301C3.37305 20.9998 3.00021 20.627 3 20.167V14.6699H2V13H3V7.83301C3.00018 7.37302 3.37303 7.00018 3.83301 7H7.16699C7.62697 7.00018 7.99982 7.37302 8 7.83301V13H9.5V11.833C9.50011 11.373 9.87298 11.0002 10.333 11H13.667C14.127 11.0002 14.4999 11.373 14.5 11.833V13H16V3.83301C16.0002 3.37302 16.373 3.00018 16.833 3H20.167ZM4.66699 19.333H6.33301V14.6699H4.66699V19.333ZM11.167 19.333H12.833V14.6699H11.167V19.333ZM17.667 19.333H19.333V14.6699H17.667V19.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the redo arrow icon from the CKW Elements Figma icon set. */
export function IconRedoArrow({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M10.6288 3.39941C14.4758 3.39947 17.7325 5.92558 18.8319 9.40934L20.501 6.2762L21.9715 7.05989L19.1314 12.3927C18.9149 12.7984 18.4103 12.9523 18.0043 12.7362L12.6722 9.89599L13.4551 8.42464L17.4045 10.5283C16.7292 7.40602 13.9531 5.06615 10.6288 5.06608C6.7991 5.06608 3.69437 8.1708 3.69437 12.0004C3.69446 15.8301 6.79915 18.9349 10.6288 18.9349V20.6015C5.87867 20.6015 2.02779 16.7506 2.02771 12.0004C2.02771 7.25032 5.87862 3.39941 10.6288 3.39941Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the ruler icon from the CKW Elements Figma icon set. */
export function IconRuler({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.994 2.24408C16.3194 1.91864 16.8471 1.91864 17.1725 2.24408L21.7558 6.82731C22.0812 7.15275 22.0812 7.68038 21.7558 8.00582L8.00546 21.7561C7.68002 22.0815 7.15238 22.0815 6.82694 21.7561L2.24371 17.1729C1.91827 16.8475 1.91827 16.3198 2.24371 15.9944L15.994 2.24408ZM16.5833 4.01185L14.8971 5.69797L16.7468 7.54763L15.5683 8.72614L13.7186 6.87649L12.2233 8.37171L13.4843 9.63261L12.3058 10.8111L11.0448 9.55023L9.55004 11.045L10.8109 12.306L9.63242 13.4845L8.37152 12.2235L6.87598 13.7191L8.72584 15.5684L7.54752 16.747L5.69747 14.8976L4.01148 16.5836L7.4162 19.9884L19.9879 7.41656L16.5833 4.01185Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the search icon from the CKW Elements Figma icon set. */
export function IconSearch({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M10.3334 2.83301C14.4755 2.83301 17.8334 6.19087 17.8334 10.333C17.8334 12.1038 17.2183 13.7302 16.192 15.0132L21.1667 19.9879L19.9883 21.1663L15.0135 16.1916C13.7305 17.2179 12.1042 17.833 10.3334 17.833C6.19124 17.833 2.83337 14.4752 2.83337 10.333C2.83337 6.19087 6.19124 2.83301 10.3334 2.83301ZM10.3334 4.49967C7.11172 4.49967 4.50004 7.11135 4.50004 10.333C4.50004 13.5547 7.11172 16.1663 10.3334 16.1663C13.555 16.1663 16.1667 13.5547 16.1667 10.333C16.1667 7.11135 13.555 4.49967 10.3334 4.49967Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the security icon from the CKW Elements Figma icon set. */
export function IconSecurity({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33329 5.04509V15.7207L12 20.1651L18.6666 15.7207V5.04509C16.5558 4.16006 14.292 3.69134 12 3.66667C9.70793 3.69134 7.44412 4.16006 5.33329 5.04509ZM4.1548 3.74147C6.61703 2.62099 9.28635 2.02781 11.9914 2H12.0085C14.7135 2.02781 17.3829 2.62099 19.8451 3.74147C20.1425 3.87677 20.3333 4.1733 20.3333 4.49996V16.1666C20.3333 16.4452 20.194 16.7054 19.9622 16.86L12.4622 21.86C12.1823 22.0466 11.8176 22.0466 11.5377 21.86L4.03771 16.86C3.80588 16.7054 3.66663 16.4452 3.66663 16.1666V4.49996C3.66663 4.1733 3.85748 3.87677 4.1548 3.74147ZM8.66663 10.3333C8.20639 10.3333 7.83329 10.7064 7.83329 11.1666V14.4999C7.83329 14.9602 8.20639 15.3333 8.66663 15.3333H15.3333C15.7935 15.3333 16.1666 14.9602 16.1666 14.4999V11.1666C16.1666 10.7064 15.7935 10.3333 15.3333 10.3333V9.49996C15.3333 8.6159 14.9821 7.76806 14.357 7.14293C13.7319 6.51781 12.884 6.16663 12 6.16663C11.1159 6.16663 10.2681 6.51781 9.64293 7.14293C9.01782 7.76806 8.66663 8.6159 8.66663 9.49996V10.3333ZM10.3333 10.3333H13.6666V9.49996C13.6666 9.05793 13.491 8.63401 13.1785 8.32144C12.8659 8.00888 12.442 7.83329 12 7.83329C11.558 7.83329 11.134 8.00888 10.8215 8.32144C10.5089 8.63401 10.3333 9.05793 10.3333 9.49996V10.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the settings icon from the CKW Elements Figma icon set. */
export function IconSettings({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5418 2C10.1594 2 9.82602 2.26028 9.7333 2.63128L9.12147 5.0793C8.59346 5.29763 8.09212 5.57559 7.62722 5.90777L5.2258 5.1419C4.8616 5.02575 4.46508 5.17228 4.26394 5.49736L2.72895 7.97819C2.52773 8.3034 2.57368 8.72382 2.84041 8.99788L4.59811 10.8038C4.46743 11.5959 4.46743 12.4041 4.59811 13.1962L2.84041 15.0021C2.57365 15.2762 2.52772 15.6967 2.72901 16.0219L4.26401 18.5019C4.46513 18.8268 4.86148 18.9733 5.22558 18.8573L7.62676 18.0923C8.09173 18.4249 8.59323 18.7033 9.12147 18.9221L9.73333 21.3688C9.82608 21.7397 10.1594 22 10.5418 22H13.4584C13.8408 22 14.1742 21.7397 14.2669 21.3687L14.8787 18.9207C15.4067 18.7024 15.9079 18.4245 16.3728 18.0924L18.774 18.8597C19.1383 18.9761 19.5352 18.8294 19.7364 18.5041L21.2714 16.0216C21.4724 15.6964 21.4264 15.2761 21.1597 15.0021L19.4014 13.1954C19.4659 12.8012 19.499 12.4023 19.5001 12.0023V11.9977C19.499 11.5977 19.4659 11.1988 19.4014 10.8046L21.1597 8.99788C21.4265 8.72382 21.4725 8.3034 21.2712 7.97819L19.7362 5.49736C19.5351 5.17228 19.1386 5.02575 18.7744 5.1419L16.3733 5.90766C15.9083 5.57501 15.4069 5.29661 14.8787 5.07789L14.2668 2.63117C14.1741 2.26022 13.8408 2 13.4584 2H10.5418ZM10.6327 5.90622L11.1924 3.66667H12.8078L13.3675 5.90467C13.4359 6.1784 13.6383 6.39889 13.9051 6.49059C14.5528 6.7132 15.1563 7.04814 15.6879 7.48007C15.9061 7.65732 16.1988 7.71268 16.4667 7.62727L18.6612 6.92738L19.5116 8.30177L17.9029 9.95462C17.7059 10.157 17.6248 10.4455 17.6876 10.7209C17.7832 11.1406 17.8321 11.5696 17.8334 12C17.8321 12.4304 17.7832 12.8594 17.6876 13.2791C17.6248 13.5545 17.7059 13.843 17.9029 14.0454L19.5117 15.6983L18.6612 17.0739L16.4671 16.3728C16.1993 16.2873 15.9066 16.3425 15.6883 16.5196C15.1567 16.951 14.5532 17.2854 13.9056 17.5076C13.6384 17.5992 13.4359 17.8198 13.3675 18.0938L12.8077 20.3333H11.1923L10.6327 18.0953C10.5642 17.8216 10.3619 17.6011 10.0951 17.5094C9.44734 17.2868 8.84385 16.9518 8.31228 16.5199C8.0942 16.3427 7.80151 16.2873 7.53378 16.3727L5.33903 17.072L4.48871 15.6982L6.09728 14.0454C6.29486 13.8424 6.37578 13.5529 6.31211 13.2769C6.11833 12.4367 6.11833 11.5633 6.31211 10.7231C6.37578 10.4471 6.29486 10.1576 6.09728 9.95462L4.48864 8.30177L5.33903 6.92738L7.53356 7.62727C7.80115 7.71261 8.09373 7.65741 8.31183 7.48043C8.84352 7.04902 9.447 6.71458 10.0947 6.49242C10.3618 6.4008 10.5642 6.18017 10.6327 5.90622ZM9.50002 12C9.50002 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.50002 13.3807 9.50002 12ZM12 7.83333C9.69882 7.83333 7.83335 9.69882 7.83335 12C7.83335 14.3012 9.69882 16.1667 12 16.1667C14.3012 16.1667 16.1667 14.3012 16.1667 12C16.1667 9.69882 14.3012 7.83333 12 7.83333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the shopping cart icon from the CKW Elements Figma icon set. */
export function IconShoppingCart({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M17 17.833C16.0795 17.833 15.3334 18.5792 15.3334 19.4997C15.3334 20.4202 16.0795 21.1663 17 21.1663C17.9205 21.1663 18.6667 20.4202 18.6667 19.4997C18.6667 18.5792 17.9205 17.833 17 17.833ZM10.3334 17.833C9.4129 17.833 8.66671 18.5792 8.66671 19.4997C8.66671 20.4202 9.4129 21.1663 10.3334 21.1663C11.2539 21.1663 12 20.4202 12 19.4997C12 18.5792 11.2539 17.833 10.3334 17.833ZM2.83337 4.49967H5.50508L8.27202 16.3559C8.36012 16.7329 8.69618 16.9997 9.08337 16.9997H18.25C18.6244 16.9997 18.953 16.75 19.0533 16.3893L21.1366 8.88932C21.2062 8.63845 21.1542 8.36907 20.9966 8.16178C20.839 7.95462 20.5937 7.83301 20.3334 7.83301H7.99451L7.12862 4.12126C6.95262 3.36694 6.27966 2.83301 5.50508 2.83301H2.83337V4.49967ZM17.6161 15.333H9.74418L8.38351 9.49967H19.2364L17.6161 15.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the snowflake icon from the CKW Elements Figma icon set. */
export function IconSnowflake({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M15.9225 3.42252L12.8334 6.51172V10.5612L16.362 8.53564L17.442 4.29411L19.0574 4.70589L18.0914 8.49821L21.8064 9.53011L21.3604 11.1366L17.1954 9.97933L13.674 11.9992L17.1954 14.0198L21.3604 12.8634L21.8064 14.4699L18.0914 15.501L19.0574 19.2941L17.442 19.7059L16.362 15.4628L12.8334 13.438V17.4882L15.9225 20.5775L14.7442 21.7558L12 19.0117L9.2559 21.7558L8.07752 20.5775L11.1667 17.4882V13.4388L7.63725 15.4635L6.55733 19.7059L4.94275 19.2941L5.90711 15.501L2.19373 14.4699L2.63969 12.8634L6.80392 14.0198L10.3252 11.9992L6.80472 9.97933L2.63969 11.1366L2.19373 9.53011L5.90711 8.49821L4.94275 4.70589L6.55733 4.29411L7.63725 8.53564L11.1667 10.5604V6.51172L8.07752 3.42252L9.2559 2.24414L12 4.98828L14.7442 2.24414L15.9225 3.42252Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the solar panel icon from the CKW Elements Figma icon set. */
export function IconSolarPanel({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M20.8099 11.2899C20.7299 10.7999 20.63 10.2499 20.52 9.56992C20.43 9.07992 20.3599 8.58992 20.2999 8.06992C20.09 6.57992 19.8899 5.32992 19.74 4.40992C19.6999 4.13992 19.62 3.68992 19.26 3.34992C19 3.09992 18.62 2.94992 18.19 2.91992H5.84995C5.54995 2.93992 5.10995 3.02992 4.77995 3.33992C4.37995 3.70992 4.29995 4.20992 4.24995 4.50992C4.07995 5.61992 3.89995 6.81992 3.71995 8.06992C3.69995 8.22992 3.66995 8.41992 3.63995 8.64992C3.59995 8.91992 3.54995 9.22992 3.49995 9.56992C3.38995 10.2299 3.28995 10.7799 3.20995 11.2599C3.05995 12.1199 2.95995 12.6999 2.94995 13.1399V13.3099C2.98995 13.7499 3.20995 14.1599 3.55995 14.4599C3.70995 14.5499 3.88995 14.6299 4.09995 14.7099C4.41995 14.8199 4.68995 14.8399 4.86995 14.8499H11.17V19.3999H4.82995V21.0699H19.25V19.3999H12.84V14.8399H19.29C19.73 14.7799 20.09 14.6599 20.36 14.4899C20.39 14.4899 20.4 14.4699 20.41 14.4599L20.44 14.4399C20.83 14.1099 21.0599 13.6399 21.0599 13.1299V12.8999C21.0299 12.4899 20.9399 11.9799 20.8099 11.2799V11.2899ZM10.8 4.60992H13.22L13.51 8.00992H10.5L10.8 4.60992ZM8.36995 13.1899H4.63995L5.16995 9.67992H8.68995L8.36995 13.1899ZM8.82995 8.00992H5.40995L5.91995 4.60992H9.12995L8.82995 8.00992ZM10.04 13.1899L10.36 9.67992H13.66L13.97 13.1899H10.04ZM14.89 4.60992H18.09L18.6 8.00992H15.19L14.89 4.60992ZM15.65 13.1899L15.34 9.67992H18.85L19.3799 13.1899H15.65Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the standard badge icon from the CKW Elements Figma icon set. */
export function IconStandardBadge({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5892 2.24408C12.2638 1.91864 11.7362 1.91864 11.4108 2.24408L8.96982 4.685H5.51833C5.0581 4.685 4.685 5.0581 4.685 5.51833V8.96982L2.24408 11.4108C1.91864 11.7362 1.91864 12.2638 2.24408 12.5892L4.685 15.0302V18.4817C4.685 18.9419 5.0581 19.315 5.51833 19.315H8.96982L11.4108 21.7559C11.7362 22.0813 12.2638 22.0813 12.5892 21.7559L15.0302 19.315H18.4817C18.9419 19.315 19.315 18.9419 19.315 18.4817V15.0302L21.7559 12.5892C22.0813 12.2638 22.0813 11.7362 21.7559 11.4108L19.315 8.96982V5.51833C19.315 5.0581 18.9419 4.685 18.4817 4.685H15.0302L12.5892 2.24408ZM9.90426 6.10759L12 4.01184L14.0957 6.10759C14.252 6.26387 14.464 6.35167 14.685 6.35167H17.6483V9.315C17.6483 9.53602 17.7362 9.74797 17.8924 9.90426L19.9882 12L17.8924 14.0957C17.7362 14.252 17.6483 14.464 17.6483 14.685V17.6483H14.685C14.464 17.6483 14.252 17.7362 14.0957 17.8924L12 19.9882L9.90426 17.8924C9.74797 17.7362 9.53602 17.6483 9.315 17.6483H6.35167V14.685C6.35167 14.464 6.26387 14.252 6.10759 14.0957L4.01184 12L6.10759 9.90426C6.26387 9.74797 6.35167 9.53602 6.35167 9.315V6.35167H9.315C9.53602 6.35167 9.74797 6.26387 9.90426 6.10759ZM11.7559 14.2559L15.9226 10.0893L14.7441 8.91074L11.1667 12.4882L9.25593 10.5774L8.07741 11.7559L10.5774 14.2559C10.9028 14.5813 11.4305 14.5813 11.7559 14.2559Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the swap icon from the CKW Elements Figma icon set. */
export function IconSwap({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.57741 3.91113L2.24408 7.24447C1.91864 7.5699 1.91864 8.09754 2.24408 8.42297L5.57741 11.7563L6.75593 10.5778L4.84518 8.66706H18.6667V7.00039H4.84518L6.75593 5.08964L5.57741 3.91113ZM21.7559 15.5778L18.4226 12.2445L17.2441 13.423L19.1548 15.3337H5.33333V17.0004H19.1548L17.2441 18.9112L18.4226 20.0897L21.7559 16.7563C22.0813 16.4309 22.0813 15.9032 21.7559 15.5778Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the table icon from the CKW Elements Figma icon set. */
export function IconTable({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M20.3334 2.83301C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334ZM4.50004 19.4997H7.83337V9.49967H4.50004V19.4997ZM9.50004 15.333V19.4997H19.5V15.333H9.50004ZM9.50004 13.6663H19.5V9.49967H9.50004V13.6663ZM4.50004 7.83301H19.5V4.49967H4.50004V7.83301Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the television icon from the CKW Elements Figma icon set. */
export function IconTelevision({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.717 6.16634H20.3334C20.7936 6.16634 21.1667 6.53944 21.1667 6.99967V18.6663C21.1667 19.1266 20.7936 19.4997 20.3334 19.4997H18.6667V21.1663H17V19.4997H7.00004V21.1663H5.33337V19.4997H3.66671C3.20647 19.4997 2.83337 19.1266 2.83337 18.6663V6.99967C2.83337 6.53944 3.20647 6.16634 3.66671 6.16634H13.8049L12.1486 3.95801L13.482 2.95801L15.261 5.32999L17.0399 2.95801L18.3732 3.95801L16.717 6.16634ZM4.50004 7.83301V17.833H19.5V7.83301H4.50004ZM7.00004 10.3891C7.00004 9.8975 9.29846 9.49967 12.0001 9.49967C14.7017 9.49967 17 9.8975 17 10.3891V15.2769C17 15.7661 14.7017 16.1663 12.0001 16.1663C9.29846 16.1663 7.00004 15.7685 7.00004 15.2769V10.3891Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the terminated contract icon from the CKW Elements Figma icon set. */
export function IconTerminatedContract({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M13.6667 2C13.8877 2 14.0996 2.08786 14.2558 2.24414L18.4225 6.41081C18.5788 6.56708 18.6667 6.77898 18.6667 7V8.66667H17V7.83333H12.8333V3.66667H3.66667V20.3333H9.5V22H2.83333C2.3731 22 2 21.6269 2 21.1667V2.83333C2 2.3731 2.3731 2 2.83333 2H13.6667ZM16.1667 10.3333C19.3883 10.3333 22 12.945 22 16.1667C22 19.3883 19.3883 22 16.1667 22C12.945 22 10.3333 19.3883 10.3333 16.1667C10.3333 12.945 12.945 10.3333 16.1667 10.3333ZM16.1667 12C13.8655 12 12 13.8655 12 16.1667C12 18.4678 13.8655 20.3333 16.1667 20.3333C18.4678 20.3333 20.3333 18.4678 20.3333 16.1667C20.3333 13.8655 18.4678 12 16.1667 12ZM17 15.3333H18.6667V17H16.1667C15.7064 17 15.3333 16.6269 15.3333 16.1667V12.8333H17V15.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the transaction icon from the CKW Elements Figma icon set. */
export function IconTransaction({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M12 2C14.7617 2 17.2625 3.12002 19.0713 4.92871L21.167 2.83301V7.83301H16.167L17.8926 6.10742C16.3837 4.59844 14.301 3.66699 12 3.66699C7.39767 3.66699 3.66699 7.39762 3.66699 12C3.66699 16.6023 7.39767 20.333 12 20.333C16.6024 20.333 20.333 16.6023 20.333 12H22C22 17.5228 17.5229 22 12 22C6.47717 22 2 17.5228 2 12C2 6.47715 6.47717 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M12.833 7.83398H15.333V9.5H10.333V11.167H14.5C14.9601 11.167 15.3328 11.5399 15.333 12V15.334C15.3328 15.7941 14.9601 16.167 14.5 16.167H12.833V17.834H11.167V16.167H8.66699V14.5H13.667V12.834H9.5C9.03976 12.834 8.66699 12.4602 8.66699 12V8.66699C8.66699 8.20676 9.03976 7.83398 9.5 7.83398H11.167V6.16699H12.833V7.83398Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the uncheck box icon from the CKW Elements Figma icon set. */
export function IconUncheckBox({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83337 3.66634C2.83337 3.20611 3.20647 2.83301 3.66671 2.83301H20.3334C20.7936 2.83301 21.1667 3.20611 21.1667 3.66634V20.333C21.1667 20.7933 20.7936 21.1663 20.3334 21.1663H3.66671C3.20647 21.1663 2.83337 20.7933 2.83337 20.333V3.66634ZM4.50004 4.49967V19.4997H19.5V4.49967H4.50004Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the upload icon from the CKW Elements Figma icon set. */
export function IconUpload({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4107 2.24408C11.7361 1.91864 12.2638 1.91864 12.5892 2.24408L16.7559 6.41074L15.5774 7.58926L12.8333 4.84518V15.3333H11.1666V4.84518L8.42255 7.58926L7.24403 6.41074L11.4107 2.24408ZM3.66663 17.8333V21.1667C3.66663 21.6269 4.03973 22 4.49996 22H19.5C19.9602 22 20.3333 21.6269 20.3333 21.1667V17.8333H18.6666V20.3333H5.33329V17.8333H3.66663Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the view off icon from the CKW Elements Figma icon set. */
export function IconViewOff({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4732 14.6517L20.8215 22L22 20.8215L18.4826 17.3041C18.8188 16.9668 19.1284 16.6226 19.411 16.2835C20.2313 15.2992 20.8571 14.319 21.2774 13.5868C21.4882 13.2197 21.6487 12.9125 21.7574 12.6949C21.8118 12.5861 21.8534 12.4995 21.8819 12.4389C21.8962 12.4086 21.9072 12.3848 21.9149 12.3679L21.924 12.3478L21.9268 12.3418L21.9276 12.3398C21.9278 12.3395 21.9282 12.3384 21.1667 12L21.9282 12.3384C22.0239 12.123 22.0239 11.877 21.9282 11.6616L21.1667 12C21.9282 11.6616 21.9283 11.6618 21.9282 11.6616L21.9276 11.6603L21.9268 11.6583L21.924 11.6522L21.9149 11.6321C21.9072 11.6153 21.8962 11.5914 21.8819 11.5611C21.8534 11.5005 21.8118 11.4139 21.7574 11.3051C21.6487 11.0875 21.4882 10.7803 21.2774 10.4133C20.8571 9.681 20.2313 8.70087 19.411 7.71653C17.7938 5.77586 15.2898 3.66668 12 3.66668C9.93948 3.66668 8.18715 4.49417 6.76794 5.58943L3.17851 2L2 3.17851L9.34836 10.5268L13.4732 14.6517ZM15.1752 13.9967L17.3043 16.1258C17.5963 15.8327 17.8718 15.5271 18.1307 15.2165C18.8728 14.3258 19.4451 13.431 19.832 12.757C20.0087 12.4492 20.1456 12.1895 20.2413 12C20.1456 11.8105 20.0087 11.5508 19.832 11.243C19.4451 10.569 18.8728 9.67415 18.1307 8.7835C16.6229 6.97416 14.5436 5.33335 12 5.33335C10.4788 5.33335 9.12367 5.92021 7.95754 6.77902L10.0033 8.8248C11.4521 7.91189 13.3897 8.0864 14.6517 9.34835C15.9136 10.6103 16.0881 12.5478 15.1752 13.9967ZM15.9138 19.2823L14.6761 18.0445C13.8541 18.4329 12.9601 18.6667 12 18.6667C9.45641 18.6667 7.37715 17.0258 5.86938 15.2165C5.12717 14.3258 4.55497 13.431 4.16805 12.757C3.99135 12.4492 3.85445 12.1895 3.75868 12C3.85445 11.8105 3.99135 11.5508 4.16805 11.243C4.51873 10.6322 5.02159 9.83987 5.66528 9.03373L4.48011 7.84855C3.71315 8.78805 3.1242 9.71375 2.72263 10.4133C2.5119 10.7803 2.3514 11.0875 2.24262 11.3051C2.18821 11.4139 2.14665 11.5005 2.11814 11.5611C2.10388 11.5914 2.09288 11.6153 2.08516 11.6321L2.07604 11.6522L2.07333 11.6583L2.07243 11.6603C2.0723 11.6605 2.07185 11.6616 2.83336 12L2.07185 11.6616C1.97608 11.877 1.97608 12.123 2.07185 12.3384L2.83336 12C2.07185 12.3384 2.07172 12.3382 2.07185 12.3384L2.07243 12.3398L2.07333 12.3418L2.07604 12.3478L2.08516 12.3679C2.09288 12.3848 2.10388 12.4086 2.11814 12.4389C2.14665 12.4995 2.18821 12.5861 2.24262 12.6949C2.3514 12.9125 2.5119 13.2197 2.72263 13.5868C3.143 14.319 3.76871 15.2992 4.589 16.2835C6.20623 18.2242 8.7103 20.3333 12 20.3333C13.463 20.3333 14.7706 19.9163 15.9138 19.2823Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the view on icon from the CKW Elements Figma icon set. */
export function IconViewOn({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.16803 12.7573C3.99133 12.4495 3.85442 12.1898 3.75866 12.0003C3.85442 11.8108 3.99133 11.5512 4.16803 11.2433C4.55495 10.5693 5.12714 9.67446 5.86935 8.78381C7.37713 6.97448 9.45639 5.33366 12 5.33366C14.5436 5.33366 16.6228 6.97448 18.1307 8.78381C18.8728 9.67446 19.4451 10.5693 19.832 11.2433C20.0087 11.5512 20.1456 11.8108 20.2413 12.0003C20.1456 12.1898 20.0087 12.4495 19.832 12.7573C19.4451 13.4313 18.8728 14.3262 18.1307 15.2168C16.6228 17.0262 14.5436 18.667 12 18.667C9.45639 18.667 7.37713 17.0262 5.86935 15.2168C5.12714 14.3262 4.55495 13.4313 4.16803 12.7573ZM21.9279 11.6613C21.9281 11.6616 21.9282 11.6619 21.1667 12.0003C21.9282 12.3387 21.9281 12.3391 21.9279 12.3393L21.9267 12.3421L21.924 12.3482L21.9148 12.3682C21.9072 12.3851 21.8962 12.4089 21.8819 12.4392C21.8534 12.4998 21.8118 12.5864 21.7574 12.6952C21.6487 12.9128 21.4881 13.22 21.2774 13.5871C20.857 14.3193 20.2313 15.2995 19.411 16.2838C17.7938 18.2245 15.2898 20.3337 12 20.3337C8.71027 20.3337 6.2062 18.2245 4.58898 16.2838C3.76869 15.2995 3.14297 14.3193 2.7226 13.5871C2.51188 13.22 2.35137 12.9128 2.2426 12.6952C2.18818 12.5864 2.14662 12.4998 2.11811 12.4392C2.10386 12.4089 2.09285 12.3851 2.08513 12.3682L2.07601 12.3482L2.0733 12.3421L2.07241 12.3401C2.07227 12.3398 2.07182 12.3387 2.83333 12.0003C2.07182 11.6619 2.07194 11.6616 2.07208 11.6613L2.0733 11.6586L2.07601 11.6525L2.08513 11.6324C2.09285 11.6156 2.10386 11.5917 2.11811 11.5614C2.14662 11.5008 2.18818 11.4142 2.2426 11.3054C2.35137 11.0878 2.51188 10.7807 2.7226 10.4136C3.14297 9.68131 3.76869 8.70119 4.58898 7.71684C6.2062 5.77618 8.71027 3.66699 12 3.66699C15.2898 3.66699 17.7938 5.77618 19.411 7.71684C20.2313 8.70119 20.857 9.68131 21.2774 10.4136C21.4881 10.7807 21.6487 11.0878 21.7574 11.3054C21.8118 11.4142 21.8534 11.5008 21.8819 11.5614C21.8962 11.5917 21.9072 11.6156 21.9148 11.6324L21.924 11.6525L21.9267 11.6586L21.9279 11.6613ZM21.1667 12.0003L21.9279 11.6613C22.0237 11.8767 22.0237 12.1239 21.9279 12.3393L21.1667 12.0003ZM2.07208 11.6613L2.83333 12.0003L2.07182 12.3387C1.97606 12.1233 1.97631 11.8767 2.07208 11.6613ZM9.91667 12.0003C9.91667 10.8497 10.8494 9.91699 12 9.91699C13.1506 9.91699 14.0833 10.8497 14.0833 12.0003C14.0833 13.1509 13.1506 14.0837 12 14.0837C10.8494 14.0837 9.91667 13.1509 9.91667 12.0003ZM12 8.25033C9.92893 8.25033 8.25 9.92926 8.25 12.0003C8.25 14.0714 9.92893 15.7503 12 15.7503C14.0711 15.7503 15.75 14.0714 15.75 12.0003C15.75 9.92926 14.0711 8.25033 12 8.25033Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the warning icon from the CKW Elements Figma icon set. */
export function IconWarning({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C12.3157 2 12.6042 2.17834 12.7453 2.46066L21.912 20.794C22.0412 21.0523 22.0274 21.3591 21.8756 21.6047C21.7237 21.8504 21.4555 22 21.1667 22H2.83333C2.54452 22 2.2763 21.8504 2.12446 21.6047C1.97262 21.3591 1.95882 21.0523 2.08798 20.794L11.2547 2.46066C11.3958 2.17834 11.6843 2 12 2ZM19.8183 20.3333L12 4.69672L4.1817 20.3333H19.8183ZM12.8333 9.5H11.1667V15.3333H12.8333V9.5ZM11.1667 18.6667V17H12.8333V18.6667H11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the warning circle icon from the CKW Elements Figma icon set. */
export function IconWarningCircle({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.66667C7.39762 3.66667 3.66667 7.39762 3.66667 12C3.66667 16.6023 7.39762 20.3333 12 20.3333C16.6023 20.3333 20.3333 16.6023 20.3333 12C20.3333 7.39762 16.6023 3.66667 12 3.66667ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.1667 6.16667V13.6667H12.8333V6.16667H11.1667ZM11.1667 17V15.3333H12.8333V17H11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the warning circle filled icon from the CKW Elements Figma icon set. */
export function IconWarningCircleFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.75 6.16667V13.6667H13.25V6.16667H10.75ZM10.75 17.8333V15.3333H13.25V17.8333H10.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the warning filled icon from the CKW Elements Figma icon set. */
export function IconWarningFilled({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7453 2.46066C12.6042 2.17834 12.3157 2 12 2C11.6843 2 11.3958 2.17834 11.2547 2.46066L2.08798 20.794C1.95882 21.0523 1.97262 21.3591 2.12446 21.6047C2.2763 21.8504 2.54452 22 2.83333 22H21.1667C21.4555 22 21.7237 21.8504 21.8756 21.6047C22.0274 21.3591 22.0412 21.0523 21.912 20.794L12.7453 2.46066ZM12.8333 9.5H11.1667V15.3333H12.8333V9.5ZM11.1667 17H12.8333V18.6667H11.1667V17Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Renders the washing machine icon from the CKW Elements Figma icon set. */
export function IconWashingMachine({ title, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...getAccessibilityProps(title)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M18.6667 2C20.0475 2 21.1667 3.11929 21.1667 4.5V19.5C21.1667 20.8808 20.0475 22 18.6667 22H5.33337C3.95267 22 2.83337 20.8808 2.83337 19.5V4.5C2.83337 3.11929 3.95267 2 5.33337 2H18.6667ZM4.50004 19.5C4.50004 19.9603 4.87314 20.3333 5.33337 20.3333H18.6667C19.127 20.3333 19.5 19.9603 19.5 19.5V8.66667H4.50004V19.5ZM12 9.5C14.7615 9.5 17 11.7386 17 14.5C17 17.2614 14.7615 19.5 12 19.5C9.23862 19.5 7.00004 17.2614 7.00004 14.5C7.00004 11.7386 9.23862 9.5 12 9.5ZM9.91752 17.1018C10.4881 17.5591 11.2119 17.8333 12 17.8333C12.788 17.8333 13.5112 17.5588 14.0817 17.1018L12 15.5408L9.91752 17.1018ZM11.1667 11.2717C9.72902 11.6417 8.66671 12.9468 8.66671 14.5C8.66671 14.9496 8.75602 15.3782 8.91736 15.7695L11.1667 14.0833V11.2717ZM12.8334 14.0833L15.0819 15.7695C15.2433 15.3781 15.3334 14.9497 15.3334 14.5C15.3334 12.9468 14.271 11.6417 12.8334 11.2717V14.0833ZM5.33337 3.66667C4.87314 3.66667 4.50004 4.03977 4.50004 4.5V7H19.5V4.5C19.5 4.03977 19.127 3.66667 18.6667 3.66667H5.33337ZM12 6.16667H7.00004V4.5H12V6.16667ZM15.3334 6.16667H13.6667V4.5H15.3334V6.16667ZM17.8334 6.16667H16.1667V4.5H17.8334V6.16667Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const iconComponents = {
  'account-tie': IconAccountTie,
  add: IconAdd,
  'add-circle': IconAddCircle,
  'arrow-down': IconArrowDown,
  'arrow-down-circle': IconArrowDownCircle,
  'arrow-down-circle-filled': IconArrowDownCircleFilled,
  'arrow-left': IconArrowLeft,
  'arrow-left-circle': IconArrowLeftCircle,
  'arrow-left-circle-filled': IconArrowLeftCircleFilled,
  'arrow-right': IconArrowRight,
  'arrow-right-circle': IconArrowRightCircle,
  'arrow-right-circle-filled': IconArrowRightCircleFilled,
  'arrow-up': IconArrowUp,
  'arrow-up-circle': IconArrowUpCircle,
  'arrow-up-circle-filled': IconArrowUpCircleFilled,
  'arrow-up-right': IconArrowUpRight,
  bank: IconBank,
  'bar-graph': IconBarGraph,
  'bar-graph-rising': IconBarGraphRising,
  battery: IconBattery,
  bin: IconBin,
  box: IconBox,
  'box-filled': IconBoxFilled,
  building: IconBuilding,
  calendar: IconCalendar,
  'calendar-blank': IconCalendarBlank,
  'calendar-restricted': IconCalendarRestricted,
  check: IconCheck,
  'check-box': IconCheckBox,
  'check-circle-filled': IconCheckCircleFilled,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-up': IconChevronUp,
  'chevron-up-down': IconChevronUpDown,
  circle: IconCircle,
  clock: IconClock,
  'clock-quarter': IconClockQuarter,
  close: IconClose,
  'close-circle-filled': IconCloseCircleFilled,
  cloudy: IconCloudy,
  coins: IconCoins,
  download: IconDownload,
  envelopes: IconEnvelopes,
  'external-link': IconExternalLink,
  faq: IconFaq,
  file: IconFile,
  'file-download': IconFileDownload,
  'file-upload': IconFileUpload,
  'graph-ascend': IconGraphAscend,
  heart: IconHeart,
  heater: IconHeater,
  'high-voltage-pole': IconHighVoltagePole,
  hourglass: IconHourglass,
  house: IconHouse,
  'house-filled': IconHouseFilled,
  hyperlink: IconHyperlink,
  'hyperlink-break': IconHyperlinkBreak,
  inbox: IconInbox,
  information: IconInformation,
  keys: IconKeys,
  leaf: IconLeaf,
  letter: IconLetter,
  lightbulb: IconLightbulb,
  lightning: IconLightning,
  'lightning-filled': IconLightningFilled,
  list: IconList,
  lock: IconLock,
  'log-out': IconLogOut,
  'log-out-door': IconLogOutDoor,
  megaphone: IconMegaphone,
  message: IconMessage,
  meter: IconMeter,
  'minus-circle': IconMinusCircle,
  'no-fire': IconNoFire,
  oven: IconOven,
  paper: IconPaper,
  'paper-filled': IconPaperFilled,
  paperclip: IconPaperclip,
  pencil: IconPencil,
  people: IconPeople,
  phone: IconPhone,
  placeholder: IconPlaceholder,
  plug: IconPlug,
  'plug-filled': IconPlugFilled,
  plus: IconPlus,
  'power-button': IconPowerButton,
  'price-tag': IconPriceTag,
  'qr-code': IconQrCode,
  question: IconQuestion,
  'question-filled': IconQuestionFilled,
  'reactive-energy': IconReactiveEnergy,
  'redo-arrow': IconRedoArrow,
  ruler: IconRuler,
  search: IconSearch,
  security: IconSecurity,
  settings: IconSettings,
  'shopping-cart': IconShoppingCart,
  snowflake: IconSnowflake,
  'solar-panel': IconSolarPanel,
  'standard-badge': IconStandardBadge,
  swap: IconSwap,
  table: IconTable,
  television: IconTelevision,
  'terminated-contract': IconTerminatedContract,
  transaction: IconTransaction,
  'uncheck-box': IconUncheckBox,
  upload: IconUpload,
  'view-off': IconViewOff,
  'view-on': IconViewOn,
  warning: IconWarning,
  'warning-circle': IconWarningCircle,
  'warning-circle-filled': IconWarningCircleFilled,
  'warning-filled': IconWarningFilled,
  'washing-machine': IconWashingMachine,
} satisfies Record<IconName, IconComponent>;

/** Renders a CKW Elements icon by name. */
export function Icon({ name, ...props }: IconByNameProps) {
  const IconComponent = iconComponents[name];

  return <IconComponent {...props} />;
}
