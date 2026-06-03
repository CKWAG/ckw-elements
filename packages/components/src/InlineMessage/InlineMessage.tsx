import React from 'react';
import {
  IconCheckCircleFilled,
  IconInformation,
  IconWarningCircleFilled,
} from '@ckw-elements/icons';
import './InlineMessage.css';

export type InlineMessageStatus = 'Info' | 'Success' | 'Error';
export type InlineMessageBreakpoint = 'Auto' | 'Desktop' | 'Mobile';

export interface InlineMessageProps {
  /** Optional headline shown above the body text. */
  title?: React.ReactNode;
  /** Message body text or content. */
  children: React.ReactNode;
  /** Semantic status variant. */
  status?: InlineMessageStatus;
  /** Optional custom icon. If omitted, a status icon is rendered. */
  icon?: React.ReactNode;
  /** Whether the icon area is shown. */
  showIcon?: boolean;
  /** Responsive behavior. Auto follows viewport width; Desktop/Mobile force a documented variant. */
  breakpoint?: InlineMessageBreakpoint;
  /** ARIA landmark role for the inline message. */
  role?: React.AriaRole;
  /** Additional CSS class names on the root element. */
  className?: string;
}

interface InlineMessageDefaultIconProps {
  status: InlineMessageStatus;
}

function InlineMessageDefaultIcon({ status }: InlineMessageDefaultIconProps) {
  if (status === 'Success') {
    return <IconCheckCircleFilled />;
  }

  if (status === 'Error') {
    return <IconWarningCircleFilled />;
  }

  return <IconInformation />;
}

/**
 * Inline Message provides contextual feedback directly within page content.
 *
 * Use it for non-time-critical status updates, confirmations, limitations,
 * or errors that should remain visible near the related content.
 */
export function InlineMessage({
  title,
  children,
  status = 'Info',
  icon,
  showIcon = true,
  breakpoint = 'Auto',
  role = 'note',
  className,
}: InlineMessageProps) {
  const rootClasses = [
    'ckw-inline-message',
    `ckw-inline-message--${status.toLowerCase()}`,
    title ? 'ckw-inline-message--has-title' : '',
    showIcon ? 'ckw-inline-message--has-icon' : '',
    breakpoint !== 'Auto' ? `ckw-inline-message--breakpoint-${breakpoint.toLowerCase()}` : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderedIcon = icon ?? <InlineMessageDefaultIcon status={status} />;

  return (
    <div className={rootClasses} role={role}>
      <div className="ckw-inline-message__status" aria-hidden="true" />
      <div className="ckw-inline-message__content">
        {showIcon && (
          <span className="ckw-inline-message__icon" aria-hidden="true">
            {renderedIcon}
          </span>
        )}
        <div className="ckw-inline-message__text">
          {title && <div className="ckw-inline-message__title">{title}</div>}
          <div className="ckw-inline-message__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
