import React from 'react';
import { IconChevronRight } from '@ckwag/elements-icons';
import './Card.css';

export type CardPadding = 'medium' | 'large';
export type CardTitleElement = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';

export interface CardProps extends Omit<React.ComponentProps<'div'>, 'ref'> {
  /** Card content, usually CardHeader, CardContent and CardFooter. */
  children: React.ReactNode;
  /** Inner padding: medium (16px) for compact cards, large (24px) for content-heavy cards. */
  padding?: CardPadding;
  /**
   * Makes the whole card one link (`<a href>`). Interactive cards lift on hover,
   * get the focus ring and show a chevron in the header.
   */
  href?: string;
  /** Link target, only used together with `href`. */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /** Link rel, only used with `href`. Defaults to "noopener noreferrer" for target="_blank". */
  rel?: string;
  /**
   * Shows the chevron in the header of an interactive card. Turn it off only when the
   * content already shows that the card is a link.
   */
  showChevron?: boolean;
}

interface CardContextValue {
  interactive: boolean;
  showChevron: boolean;
}

const CardContext = React.createContext<CardContextValue>({
  interactive: false,
  showChevron: true,
});

/**
 * Card is a white surface on the portal background that groups related content.
 *
 * Without `href` it is a static container. With `href` the whole card is one link.
 * Compose it with CardHeader, CardTitle, CardDescription, CardContent and CardFooter;
 * the heading level is chosen with `CardTitle as`.
 */
export const Card = React.forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(function Card(
  { children, padding = 'medium', href, target, rel, showChevron = true, className, ...props },
  ref,
) {
  const interactive = href !== undefined;
  const classes = [
    'ckw-card',
    `ckw-card--padding-${padding}`,
    interactive ? 'ckw-card--interactive' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  const context = React.useMemo(() => ({ interactive, showChevron }), [interactive, showChevron]);

  if (interactive) {
    const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <CardContext.Provider value={context}>
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          target={target}
          rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        >
          {children}
        </a>
      </CardContext.Provider>
    );
  }

  return (
    <CardContext.Provider value={context}>
      <div {...props} ref={ref as React.Ref<HTMLDivElement>} className={classes}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

export interface CardHeaderProps extends React.ComponentProps<'div'> {
  /** Usually CardTitle and an optional CardDescription. */
  children: React.ReactNode;
}

/**
 * Header row of a Card. In an interactive card it shows the chevron on the right.
 */
export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  const { interactive, showChevron } = React.useContext(CardContext);

  return (
    <div className={['ckw-card__header', className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className="ckw-card__header-text">{children}</div>
      {interactive && showChevron && (
        <span className="ckw-card__chevron" aria-hidden="true">
          <IconChevronRight />
        </span>
      )}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Title text. */
  children: React.ReactNode;
  /** Element to render. Pick the heading level that fits the page outline. */
  as?: CardTitleElement;
}

/**
 * Title of a Card. Renders an `h3` by default; set `as` to match the page's heading outline.
 */
export function CardTitle({ children, as: Element = 'h3', className, ...props }: CardTitleProps) {
  return (
    <Element className={['ckw-card__title', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </Element>
  );
}

export interface CardDescriptionProps extends React.ComponentProps<'p'> {
  /** Short supporting text below the title. */
  children: React.ReactNode;
}

/**
 * Supporting text below the CardTitle, for example a period or an address.
 */
export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  return (
    <p className={['ckw-card__description', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  );
}

export interface CardContentProps extends React.ComponentProps<'div'> {
  /** Any content, for example a Key-Value List or a KPI. */
  children: React.ReactNode;
}

/**
 * Main content area of a Card (the `Content` slot in Figma).
 */
export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={['ckw-card__content', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.ComponentProps<'div'> {
  /** Actions or meta information at the bottom of the card. */
  children: React.ReactNode;
}

/**
 * Footer row of a Card for actions or meta information. Do not put links or buttons
 * into an interactive card (one with `href`).
 */
export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={['ckw-card__footer', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
