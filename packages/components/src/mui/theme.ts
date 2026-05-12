import { createTheme } from '@mui/material/styles';
import {
  colorGreen500,
  colorGreen600,
  colorGreen700,
  colorGreen75,
  colorGreen100,
  colorNeutralsWhite,
  colorOrange600,
  colorOrange50,
  colorYellow400,
  colorYellow50,
  colorYellow800,
  colorBlue400,
  colorBlue50,
  colorBlue800,
  colorGreen50,
  borderRadiusFull,
  borderWeightS,
  borderWeightM,
  spacingL,
  spacingM,
  shadowS,
  gradientBrand,
  fontFamilyBrand,
  desktopHeadingXlSize,
  desktopHeadingXlHeight,
  desktopHeadingXlWeight,
  desktopHeadingLSize,
  desktopHeadingLHeight,
  desktopHeadingLWeight,
  desktopHeadingMSize,
  desktopHeadingMHeight,
  desktopHeadingMWeight,
  desktopHeadingSSize,
  desktopHeadingSHeight,
  desktopHeadingSWeight,
  desktopBodyLSize,
  desktopBodyLHeight,
  desktopBodyLWeight,
  desktopBodyLEmphasizedSize,
  desktopBodyLEmphasizedHeight,
  desktopBodyLEmphasizedWeight,
  desktopBodyMSize,
  desktopBodyMHeight,
  desktopBodyMWeight,
  desktopBodySSize,
  desktopBodySHeight,
  desktopBodySWeight,
  desktopLabelLSize,
  desktopLabelLHeight,
  desktopLabelLWeight,
  desktopLabelMSize,
  desktopLabelMHeight,
  desktopLabelMWeight,
  desktopCaptionSize,
  desktopCaptionHeight,
  desktopCaptionWeight,
  desktopCaptionEmphasizedSize,
  desktopCaptionEmphasizedHeight,
  desktopCaptionEmphasizedWeight,
} from '@ckw-elements/tokens';

const fontFamily = `"${fontFamilyBrand}", sans-serif`;

export const ckwTheme = createTheme({
  palette: {
    primary: {
      main: colorGreen600,
      dark: colorGreen700,
      light: colorGreen500,
      contrastText: colorNeutralsWhite,
    },
    secondary: {
      main: colorNeutralsWhite,
      dark: colorGreen75,
      light: colorGreen100,
      contrastText: colorGreen600,
    },
    error: {
      main: colorOrange600,
      light: colorOrange50,
      contrastText: colorOrange600,
    },
    warning: {
      main: colorYellow400,
      light: colorYellow50,
      contrastText: colorYellow800,
    },
    info: {
      main: colorBlue400,
      light: colorBlue50,
      contrastText: colorBlue800,
    },
    success: {
      main: colorGreen500,
      light: colorGreen50,
      contrastText: colorGreen700,
    },
  },
  typography: {
    fontFamily,
    fontWeightLight: 325,
    fontWeightRegular: 325,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily,
      fontSize: desktopHeadingXlSize,
      lineHeight: desktopHeadingXlHeight,
      fontWeight: desktopHeadingXlWeight,
    },
    h2: {
      fontFamily,
      fontSize: desktopHeadingLSize,
      lineHeight: desktopHeadingLHeight,
      fontWeight: desktopHeadingLWeight,
    },
    h3: {
      fontFamily,
      fontSize: desktopHeadingMSize,
      lineHeight: desktopHeadingMHeight,
      fontWeight: desktopHeadingMWeight,
    },
    h4: {
      fontFamily,
      fontSize: desktopHeadingSSize,
      lineHeight: desktopHeadingSHeight,
      fontWeight: desktopHeadingSWeight,
    },
    h5: {
      fontFamily,
      fontSize: desktopBodyLSize,
      lineHeight: desktopBodyLHeight,
      fontWeight: desktopBodyLWeight,
    },
    h6: {
      fontFamily,
      fontSize: desktopBodyLEmphasizedSize,
      lineHeight: desktopBodyLEmphasizedHeight,
      fontWeight: desktopBodyLEmphasizedWeight,
    },
    body1: {
      fontFamily,
      fontSize: desktopBodyMSize,
      lineHeight: desktopBodyMHeight,
      fontWeight: desktopBodyMWeight,
    },
    body2: {
      fontFamily,
      fontSize: desktopBodySSize,
      lineHeight: desktopBodySHeight,
      fontWeight: desktopBodySWeight,
    },
    button: {
      fontFamily,
      fontSize: desktopLabelMSize,
      lineHeight: desktopLabelMHeight,
      fontWeight: desktopLabelMWeight,
      textTransform: 'none',
    },
    caption: {
      fontFamily,
      fontSize: desktopCaptionSize,
      lineHeight: desktopCaptionHeight,
      fontWeight: desktopCaptionWeight,
    },
    overline: {
      fontFamily,
      fontSize: desktopCaptionEmphasizedSize,
      lineHeight: desktopCaptionEmphasizedHeight,
      fontWeight: desktopCaptionEmphasizedWeight,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: borderRadiusFull,
          fontFamily,
          fontWeight: desktopLabelMWeight,
          fontSize: desktopLabelMSize,
          lineHeight: desktopLabelMHeight,
          textTransform: 'none',
          transition:
            'background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
        },
        sizeLarge: {
          height: 48,
          minWidth: 160,
          paddingLeft: spacingL,
          paddingRight: spacingL,
          fontSize: desktopLabelLSize,
          lineHeight: desktopLabelLHeight,
          fontWeight: desktopLabelLWeight,
        },
        sizeMedium: {
          height: 48,
          minWidth: 144,
          paddingLeft: spacingL,
          paddingRight: spacingL,
        },
        sizeSmall: {
          height: 40,
          minWidth: 120,
          paddingLeft: spacingM,
          paddingRight: spacingM,
        },
        contained: {
          position: 'relative',
          backgroundColor: colorGreen700,
          color: colorNeutralsWhite,
          boxShadow: shadowS,
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            backgroundImage: gradientBrand,
            opacity: 1,
            transition: 'opacity 150ms ease',
            zIndex: -1,
          },
          '&:hover:not(.Mui-disabled)::before': {
            opacity: 0,
          },
          '&:active:not(.Mui-disabled)': {
            backgroundColor: colorGreen500,
          },
          '&:active:not(.Mui-disabled)::before': {
            opacity: 0,
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            backgroundColor: colorGreen700,
            color: colorNeutralsWhite,
            boxShadow: 'none',
          },
          '&.Mui-disabled::before': {
            opacity: 1,
          },
        },
        outlined: {
          backgroundColor: colorNeutralsWhite,
          color: colorGreen600,
          borderColor: colorGreen600,
          borderWidth: borderWeightS,
          '&:hover': {
            backgroundColor: colorGreen75,
            borderColor: colorGreen600,
            borderWidth: borderWeightS,
          },
          '&:active': {
            backgroundColor: colorGreen100,
            borderWidth: borderWeightM,
            borderColor: colorGreen500,
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            borderColor: colorGreen600,
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: colorGreen600,
          '&:hover': {
            backgroundColor: colorGreen75,
          },
          '&:active': {
            backgroundColor: colorGreen100,
          },
          '&.Mui-disabled': {
            opacity: 0.4,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '44px',
          borderRadius: 'var(--border-radius-s)',
          backgroundColor: 'var(--background-input)',
          fontFamily,
          fontSize: 'var(--body-m-emphasized-size)',
          lineHeight: 'var(--body-m-emphasized-height)',
          fontWeight: 'var(--body-m-emphasized-weight)',
          color: 'var(--text-primary)',
          outline: `${borderWeightM} solid transparent`,
          outlineOffset: '0px',
          transition:
            'outline-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)': {
            outlineColor: 'var(--border-hover)',
          },
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline':
            {
              borderColor: 'var(--border-strong)',
              borderWidth: borderWeightS,
            },
          '&.Mui-focused:not(.Mui-error)': {
            outlineColor: 'var(--border-hover)',
            backgroundColor: 'var(--background-active)',
            boxShadow: 'inset 0 0 0 1px var(--border-active)',
          },
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--border-active)',
            borderWidth: borderWeightM,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--status-error-border)',
            borderWidth: borderWeightS,
            boxShadow: 'inset 0 0 0 1px var(--status-error-border)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--background-canvas)',
            color: 'var(--text-tertiary)',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--border-soft)',
          },
        },
        input: {
          padding: `0 ${spacingM}`,
          height: '44px',
          boxSizing: 'border-box',
          '&::placeholder': {
            color: 'var(--text-tertiary)',
            opacity: 1,
          },
          '&.Mui-disabled': {
            WebkitTextFillColor: 'var(--text-tertiary)',
          },
          '&.MuiOutlinedInput-inputAdornedEnd': {
            paddingRight: 0,
          },
        },
        notchedOutline: {
          borderColor: 'var(--border-strong)',
          borderWidth: borderWeightS,
          transition: 'border-color 150ms ease',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
          marginTop: 'var(--spacing-xs)',
          padding: 0,
          fontFamily,
          fontSize: 'var(--caption-size)',
          lineHeight: 'var(--caption-height)',
          fontWeight: 'var(--caption-weight)',
        },
      },
    },
  },
});
