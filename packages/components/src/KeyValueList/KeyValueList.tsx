import React from 'react';
import './KeyValueList.css';

export type KeyValueListLayout = 'inline' | 'stacked';

export interface KeyValueListProps extends React.ComponentPropsWithoutRef<'dl'> {
  /** KeyValueItem elements. */
  children: React.ReactNode;
  /**
   * Inline puts label and value on one row with the value right-aligned.
   * Stacked puts the label above the value, for narrow containers.
   */
  layout?: KeyValueListLayout;
}

/**
 * Key-Value List shows label/value pairs, for example invoice details or a cost breakdown.
 *
 * Renders a semantic description list (`dl`). Values use tabular figures; number and
 * date formatting is the job of the app.
 */
export const KeyValueList = React.forwardRef<HTMLDListElement, KeyValueListProps>(
  function KeyValueList({ children, layout = 'inline', className, ...props }, ref) {
    const classes = ['ckw-key-value-list', `ckw-key-value-list--${layout}`, className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <dl {...props} ref={ref} className={classes}>
        {children}
      </dl>
    );
  },
);

export interface KeyValueItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Term shown as label (`dt`). */
  label: React.ReactNode;
  /** Value (`dd`). Any content, for example text, an amount or a Badge. */
  children: React.ReactNode;
  /** Emphasized total row with a separator above, for example the invoice amount. */
  total?: boolean;
}

/**
 * One label/value pair of a KeyValueList (`dt` + `dd`, grouped in a `div`).
 */
export const KeyValueItem = React.forwardRef<HTMLDivElement, KeyValueItemProps>(
  function KeyValueItem({ label, children, total = false, className, ...props }, ref) {
    const classes = [
      'ckw-key-value-item',
      total ? 'ckw-key-value-item--total' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...props} ref={ref} className={classes}>
        <dt className="ckw-key-value-item__label">{label}</dt>
        <dd className="ckw-key-value-item__value">{children}</dd>
      </div>
    );
  },
);
