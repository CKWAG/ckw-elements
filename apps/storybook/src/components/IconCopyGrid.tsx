import React from 'react';
import type { ChangeEvent } from 'react';
import { Icon, iconMetadata, iconNames } from '@ckwag/elements-icons';
import type { IconMetadata, IconName } from '@ckwag/elements-icons';

const DEFAULT_ICON_NAME = 'search';
const DEFAULT_ICON_SIZE = 24;

interface IconCopyButtonProps {
  code: string;
  label: string;
}

interface IconSnippetOptions {
  ariaLabel?: string;
  size?: number;
}

interface IconPlaygroundProps {
  /** Icon name selected through Storybook controls. */
  name?: IconName;
  /** Icon size in pixels. */
  size?: number;
  /** Accessible label. Empty values render the icon as decorative. */
  ariaLabel?: string;
  /** Show inline controls inside the docs page. */
  showControls?: boolean;
}

function getSelectedIcon(name: IconName): IconMetadata {
  return iconMetadata.find((icon) => icon.name === name) ?? iconMetadata[0];
}

function escapeAttribute(value: string): string {
  return value.replace(/"/g, '&quot;');
}

function getIconPropsSnippet({ ariaLabel, size = DEFAULT_ICON_SIZE }: IconSnippetOptions): string {
  const props = size === DEFAULT_ICON_SIZE ? [] : [`size={${size}}`];
  const trimmedLabel = ariaLabel?.trim();

  if (trimmedLabel) {
    props.push(`aria-label="${escapeAttribute(trimmedLabel)}"`);
  } else {
    props.push('aria-hidden="true"');
  }

  return props.join(' ');
}

function getComponentSnippet(icon: IconMetadata, options: IconSnippetOptions): string {
  const props = getIconPropsSnippet(options);

  return `import { ${icon.componentName} } from '@ckwag/elements-icons';

<${icon.componentName} ${props} />`;
}

function getNameSnippet(icon: IconMetadata, options: IconSnippetOptions): string {
  const props = getIconPropsSnippet(options);

  return `import { Icon } from '@ckwag/elements-icons';

<Icon name="${icon.name}" ${props} />`;
}

function copyWithTextarea(code: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = code;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.inset = '0';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);
  return copied;
}

async function copyCode(code: string): Promise<boolean> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(code);
    return true;
  }

  return copyWithTextarea(code);
}

function IconCopyButton({ code, label }: IconCopyButtonProps) {
  const [status, setStatus] = React.useState<'idle' | 'copied' | 'failed'>('idle');
  const timeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleCopy = async () => {
    const copied = await copyCode(code).catch(() => false);
    setStatus(copied ? 'copied' : 'failed');

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus('idle');
    }, 1600);
  };

  const buttonText = status === 'copied' ? 'Copied' : status === 'failed' ? 'Failed' : label;

  return (
    <button className="icon-copy-button" type="button" onClick={handleCopy}>
      {buttonText}
    </button>
  );
}

/**
 * Renders a configurable icon preview with copyable React snippets.
 */
export function IconPlayground({
  name: controlledName,
  size: controlledSize,
  ariaLabel: controlledAriaLabel,
  showControls = true,
}: IconPlaygroundProps = {}) {
  const [selectedName, setSelectedName] = React.useState<IconName>(DEFAULT_ICON_NAME);
  const [iconSize, setIconSize] = React.useState(DEFAULT_ICON_SIZE);
  const [label, setLabel] = React.useState('');
  const name = controlledName ?? selectedName;
  const size = controlledSize ?? iconSize;
  const ariaLabel = controlledAriaLabel ?? label;
  const selectedIcon = getSelectedIcon(name);
  const snippetOptions = { ariaLabel, size };
  const componentSnippet = getComponentSnippet(selectedIcon, snippetOptions);
  const nameSnippet = getNameSnippet(selectedIcon, snippetOptions);
  const className = showControls ? 'icon-playground' : 'icon-playground icon-playground--compact';

  const handleNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(event.target.value as IconName);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIconSize(Number(event.target.value));
  };

  return (
    <div className={className}>
      <div className="icon-playground__preview" aria-label="Icon preview">
        <Icon
          name={name}
          size={size}
          aria-hidden={ariaLabel.trim() ? undefined : true}
          aria-label={ariaLabel.trim() || undefined}
        />
      </div>

      {showControls && (
        <div className="icon-playground__controls">
          <label className="icon-playground__field">
            <span>Icon</span>
            <select value={selectedName} onChange={handleNameChange}>
              {iconNames.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
          </label>

          <label className="icon-playground__field">
            <span>Size</span>
            <input
              min="12"
              max="64"
              step="4"
              type="number"
              value={size}
              onChange={handleSizeChange}
            />
          </label>

          <label className="icon-playground__field">
            <span>ARIA label</span>
            <input
              type="text"
              value={ariaLabel}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Decorative when empty"
            />
          </label>
        </div>
      )}

      <div className="icon-playground__code">
        <pre>
          <code>{componentSnippet}</code>
        </pre>
        <div className="icon-playground__actions">
          <IconCopyButton code={componentSnippet} label="Copy component" />
          <IconCopyButton code={nameSnippet} label="Copy name API" />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the complete CKW icon index with copyable component snippets.
 */
export function IconCopyGrid() {
  return (
    <div className="icon-copy-grid">
      {iconMetadata.map((icon) => {
        const componentSnippet = getComponentSnippet(icon, {});

        return (
          <div key={icon.name} className="icon-copy-card">
            <Icon name={icon.name} aria-hidden="true" />
            <div className="icon-copy-card__meta">
              <span className="token-badge">{icon.name}</span>
              <span className="icon-copy-card__component">{icon.componentName}</span>
            </div>
            <IconCopyButton code={componentSnippet} label="Copy" />
          </div>
        );
      })}
    </div>
  );
}
