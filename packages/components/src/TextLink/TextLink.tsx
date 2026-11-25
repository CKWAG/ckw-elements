import React from 'react';
import { IconExternalLink } from '@ckwag/elements-icons';
import './TextLink.css';

export type TextLinkVariant = 'standalone' | 'inline';
export type TextLinkSize = 'large' | 'medium' | 'small';

export interface TextLinkProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
  /** The visible link text. With `asChild`, the single child element that renders the link. */
  children: React.ReactNode;
  /**
   * `standalone` for back links, arrow links and link lists (underlined on hover).
   * `inline` for links in running text (always underlined, takes the paragraph font).
   */
  variant?: TextLinkVariant;
  /** Size of a standalone link (label-l / label-m / label-s). Inline links ignore it. */
  size?: TextLinkSize;
  /** Icon rendered before the label, e.g. an arrow-left for a back link. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label, e.g. an arrow-right for an arrow link. */
  trailingIcon?: React.ReactNode;
  /**
   * Opens the link in a new tab: sets `target="_blank"`, `rel="noopener noreferrer"`,
   * shows the external-link icon and adds a hidden hint for screen readers.
   */
  external?: boolean;
  /** Screen reader hint for external links. */
  externalLabel?: string;
  /**
   * Renders the single child element instead of an `<a>` and passes the link styling and props
   * to it, e.g. a router link: `<TextLink asChild><Link to="/rechnungen">Rechnungen</Link></TextLink>`.
   */
  asChild?: boolean;
}

interface ChildProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Text link for navigation: back links, arrow links, link lists and links in running text.
 *
 * Renders a real `<a href>` (or the child element with `asChild`), so browser link behaviour
 * stays intact. Use Button for prominent actions, also when they navigate.
 */
export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink(
  {
    children,
    variant = 'standalone',
    size = 'large',
    leadingIcon,
    trailingIcon,
    external = false,
    externalLabel = '(öffnet in neuem Tab)',
    asChild = false,
    className,
    target,
    rel,
    ...props
  },
  ref,
) {
  const linkTarget = external ? (target ?? '_blank') : target;
  const linkRel = linkTarget === '_blank' ? (rel ?? 'noopener noreferrer') : rel;
  const classes = (extra?: string) =>
    [
      'ckw-text-link',
      `ckw-text-link--${variant}`,
      variant === 'standalone' ? `ckw-text-link--${size}` : '',
      className ?? '',
      extra ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  const content = (label: React.ReactNode) => (
    <>
      {leadingIcon && (
        <span className="ckw-text-link__icon ckw-text-link__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="ckw-text-link__label">{label}</span>
      {trailingIcon && (
        <span className="ckw-text-link__icon ckw-text-link__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {external && (
        <>
          <span className="ckw-text-link__icon ckw-text-link__icon--trailing" aria-hidden="true">
            <IconExternalLink />
          </span>
          <span className="ckw-text-link__sr-only"> {externalLabel}</span>
        </>
      )}
    </>
  );

  if (asChild) {
    const child = React.Children.only(children);
    if (!React.isValidElement<ChildProps>(child)) return null;
    return React.cloneElement(
      child as React.ReactElement<ChildProps & Record<string, unknown>>,
      {
        ...props,
        target: linkTarget,
        rel: linkRel,
        className: classes(child.props.className),
        ref,
      },
      content(child.props.children),
    );
  }

  return (
    <a {...props} ref={ref} className={classes()} target={linkTarget} rel={linkRel}>
      {content(children)}
    </a>
  );
});
