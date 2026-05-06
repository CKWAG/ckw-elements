import { createTheme } from '@mui/material/styles';

/**
 * CKW Elements MUI Theme
 *
 * Maps CKW semantic design tokens to Material UI's theme system.
 * Uses concrete hex values for MUI's internal color math (augmentColor,
 * contrast calculation), then overrides component styles with CSS custom
 * property references so runtime token changes propagate correctly.
 */
export const ckwTheme = createTheme({
  palette: {
    primary: {
      main: '#365f10',
      dark: '#21420b',
      light: '#53821f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#e4f3d3',
      light: '#c8e6a4',
      contrastText: '#365f10',
    },
    error: {
      main: '#d73d19',
      light: '#fff5f0',
      contrastText: '#d73d19',
    },
    warning: {
      main: '#fdc300',
      light: '#fffbe6',
      contrastText: '#785c01',
    },
    info: {
      main: '#00acf5',
      light: '#f0f9fc',
      contrastText: '#014f70',
    },
    success: {
      main: '#86bc46',
      light: '#f1f9e8',
      contrastText: '#21420b',
    },
    text: {
      primary: '#232623',
      secondary: '#4f544f',
      disabled: '#8d968d',
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    divider: '#eff0ef',
    action: {
      hover: '#eff0ef',
      selected: '#f1f9e8',
      disabled: '#8d968d',
      disabledBackground: '#f4f5f4',
    },
  },
  typography: {
    fontFamily: '"Gotham", sans-serif',
    fontWeightLight: 325,
    fontWeightRegular: 325,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '48px',
      lineHeight: '52px',
      fontWeight: 325,
    },
    h2: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '22px',
      lineHeight: '30px',
      fontWeight: 325,
    },
    h6: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '18px',
      lineHeight: '28px',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 325,
    },
    body2: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 325,
    },
    button: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 325,
    },
    overline: {
      fontFamily: '"Gotham", sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
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
          borderRadius: 'var(--border-radius-full)',
          fontFamily: 'var(--font-family-brand), sans-serif',
          fontWeight: 'var(--label-m-weight)',
          fontSize: 'var(--label-m-size)',
          lineHeight: 'var(--label-m-height)',
          textTransform: 'none',
          transition:
            'background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
        },
        sizeLarge: {
          height: 48,
          minWidth: 160,
          paddingLeft: 'var(--spacing-l)',
          paddingRight: 'var(--spacing-l)',
          fontSize: 'var(--label-l-size)',
          lineHeight: 'var(--label-l-height)',
          fontWeight: 'var(--label-l-weight)',
        },
        sizeMedium: {
          height: 48,
          minWidth: 144,
          paddingLeft: 'var(--spacing-l)',
          paddingRight: 'var(--spacing-l)',
        },
        sizeSmall: {
          height: 40,
          minWidth: 120,
          paddingLeft: 'var(--spacing-m)',
          paddingRight: 'var(--spacing-m)',
        },
        contained: {
          position: 'relative',
          backgroundColor: 'var(--interactive-primary-hover)',
          color: 'var(--text-on-interactive-primary)',
          boxShadow: 'var(--shadow-s)',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            backgroundImage: 'var(--gradient-brand)',
            opacity: 1,
            transition: 'opacity 150ms ease',
            zIndex: -1,
          },
          '&:hover:not(.Mui-disabled)::before': {
            opacity: 0,
          },
          '&:active:not(.Mui-disabled)': {
            backgroundColor: 'var(--interactive-primary-active)',
          },
          '&:active:not(.Mui-disabled)::before': {
            opacity: 0,
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            backgroundColor: 'var(--interactive-primary-hover)',
            color: 'var(--text-on-interactive-primary)',
            boxShadow: 'none',
          },
          '&.Mui-disabled::before': {
            opacity: 1,
          },
        },
        outlined: {
          backgroundColor: 'var(--interactive-secondary)',
          color: 'var(--text-on-interactive-secondary)',
          borderColor: 'var(--interactive-primary)',
          borderWidth: 'var(--border-weight-s)',
          '&:hover': {
            backgroundColor: 'var(--interactive-secondary-hover)',
            borderColor: 'var(--interactive-primary)',
            borderWidth: 'var(--border-weight-s)',
          },
          '&:active': {
            backgroundColor: 'var(--interactive-secondary-active)',
            borderWidth: 'var(--border-weight-m)',
            borderColor: 'var(--border-active)',
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            borderColor: 'var(--interactive-primary)',
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: 'var(--text-on-interactive-secondary)',
          '&:hover': {
            backgroundColor: 'var(--interactive-secondary-hover)',
          },
          '&:active': {
            backgroundColor: 'var(--interactive-secondary-active)',
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
  },
});
