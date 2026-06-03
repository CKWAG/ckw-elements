import React from 'react';
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
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12S6.753 21.5 12 21.5s9.5-4.253 9.5-9.5S17.247 2.5 12 2.5Zm4.53 7.03a.75.75 0 0 0-1.06-1.06l-4.72 4.72-2.22-2.22a.75.75 0 1 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.25-5.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (status === 'Error') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12S6.753 21.5 12 21.5s9.5-4.253 9.5-9.5S17.247 2.5 12 2.5Zm-.75 5.25a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0v-5ZM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12S6.753 21.5 12 21.5s9.5-4.253 9.5-9.5S17.247 2.5 12 2.5Zm.75 5.25h-1.5v1.5h1.5v-1.5Zm-2 4h1.5v4.5h1.25v1.5h-4v-1.5h1.25v-4.5Z"
        fill="currentColor"
      />
    </svg>
  );
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
