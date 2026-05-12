import React from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { ckwTheme } from './theme';

export type CkwButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type CkwButtonSize = 'Large' | 'Medium' | 'Small';

interface ButtonProps {
  children: React.ReactNode;
  variant?: CkwButtonVariant;
  size?: CkwButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'button' | 'submit' | 'reset';
  href?: string;
  sx?: MuiButtonProps['sx'];
}

const variantMap: Record<CkwButtonVariant, MuiButtonProps['variant']> = {
  Primary: 'contained',
  Secondary: 'outlined',
  Tertiary: 'text',
};

const sizeMap: Record<CkwButtonSize, MuiButtonProps['size']> = {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
};

/** CKW-themed MUI Button with semantic token styling. */
export function Button({
  children,
  variant = 'Primary',
  size = 'Large',
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  htmlType = 'button',
  href,
  sx,
}: ButtonProps) {
  return (
    <ThemeProvider theme={ckwTheme}>
      <MuiButton
        variant={variantMap[variant]}
        size={sizeMap[size]}
        disabled={disabled}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        type={htmlType}
        href={href}
        sx={sx}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  );
}
