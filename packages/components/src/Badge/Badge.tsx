import React from 'react';
import {
  IconCheckCircleFilled,
  IconInformation,
  IconWarningCircleFilled,
  IconWarningFilled,
} from '@ckwag/elements-icons';
import './Badge.css';

export type BadgeStatus = 'Neutral' | 'Info' | 'Success' | 'Warning' | 'Error' | 'Brand';
export type BadgeSize = 'Medium' | 'Small';

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
  if (status === 'Success') {
    return <IconCheckCircleFilled />;
  }

  if (status === 'Warning') {
    return <IconWarningFilled />;
  }

  if (status === 'Error') {
    return <IconWarningCircleFilled />;
  }

  if (status === 'Info') {
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
  status = 'Neutral',
  size = 'Medium',
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
