import React from 'react';
import {
  IconCheckCircleFilled,
  IconInformation,
  IconWarningCircleFilled,
  IconWarningFilled,
} from '@ckwag/elements-icons';
import './Badge.css';

export type BadgeStatus = 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand';
export type BadgeSize = 'medium' | 'small';

export interface BadgeProps extends Omit<React.ComponentProps<'span'>, 'children'> {
  /** Short label, one or two words. The meaning must always be in the text. */
  children: React.ReactNode;
  /** Semantic status. Brand is the only filled variant and is meant for highlights. */
  status?: BadgeStatus;
  /** Badge size. */
  size?: BadgeSize;
  /** Shows the leading icon. Info, Success, Warning and Error have a default status icon. */
  showIcon?: boolean;
  /** Optional custom icon. Required for Neutral and Brand when showIcon is true. */
  icon?: React.ReactNode;
}

interface BadgeDefaultIconProps {
  status: BadgeStatus;
}

function BadgeDefaultIcon({ status }: BadgeDefaultIconProps) {
  if (status === 'success') {
    return <IconCheckCircleFilled />;
  }

  if (status === 'warning') {
    return <IconWarningFilled />;
  }

  if (status === 'error') {
    return <IconWarningCircleFilled />;
  }

  if (status === 'info') {
    return <IconInformation />;
  }

  return null;
}

/**
 * Badge shows a short, non-interactive status or attribute label,
 * for example the status of an invoice or a "Neu" marker.
 *
 * The icon is decorative and hidden from assistive technology,
 * because the label always carries the meaning.
 */
export function Badge({
  children,
  status = 'neutral',
  size = 'medium',
  showIcon = false,
  icon,
  className,
  ...props
}: BadgeProps) {
  const renderedIcon = showIcon ? (icon ?? <BadgeDefaultIcon status={status} />) : null;
  const hasIcon = renderedIcon !== null;

  const rootClasses = [
    'ckw-badge',
    `ckw-badge--${status.toLowerCase()}`,
    `ckw-badge--${size.toLowerCase()}`,
    hasIcon ? 'ckw-badge--has-icon' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClasses} {...props}>
      {hasIcon && (
        <span className="ckw-badge__icon" aria-hidden="true">
          {renderedIcon}
        </span>
      )}
      <span className="ckw-badge__label">{children}</span>
    </span>
  );
}
