import componentsPackage from '@ckw-elements/components/package.json';
import tokensPackage from '@ckw-elements/tokens/package.json';
import componentsChangelog from '../../../../packages/components/CHANGELOG.md?raw';
import tokensChangelog from '../../../../packages/tokens/CHANGELOG.md?raw';

export interface PackageVersion {
  name: string;
  version: string;
  npmUrl: string;
  changelogUrl: string;
}

export interface ReleaseNoteSection {
  heading: string;
  items: string[];
}

export interface ReleaseNote {
  packageName: string;
  version: string;
  sections: ReleaseNoteSection[];
}

interface ChangelogSource {
  packageName: string;
  markdown: string;
}

const packageChangelogs: ChangelogSource[] = [
  {
    packageName: componentsPackage.name,
    markdown: componentsChangelog,
  },
  {
    packageName: tokensPackage.name,
    markdown: tokensChangelog,
  },
];

export const packageVersions: PackageVersion[] = [
  {
    name: componentsPackage.name,
    version: componentsPackage.version,
    npmUrl: 'https://www.npmjs.com/package/@ckw-elements/components',
    changelogUrl:
      'https://github.com/CKWAG/ckw-elements-design/blob/main/packages/components/CHANGELOG.md',
  },
  {
    name: tokensPackage.name,
    version: tokensPackage.version,
    npmUrl: 'https://www.npmjs.com/package/@ckw-elements/tokens',
    changelogUrl:
      'https://github.com/CKWAG/ckw-elements-design/blob/main/packages/tokens/CHANGELOG.md',
  },
];

export const releaseNotes: ReleaseNote[] = packageChangelogs.flatMap((source) =>
  parseChangelog(source.markdown, source.packageName),
);

function parseChangelog(markdown: string, packageName: string): ReleaseNote[] {
  const notes: ReleaseNote[] = [];
  let currentNote: ReleaseNote | undefined;
  let currentSection: ReleaseNoteSection | undefined;

  for (const line of markdown.split('\n')) {
    const versionMatch = /^##\s+(.+)$/.exec(line);
    if (versionMatch) {
      currentNote = {
        packageName,
        version: normalizeHeading(versionMatch[1]),
        sections: [],
      };
      notes.push(currentNote);
      currentSection = undefined;
      continue;
    }

    const sectionMatch = /^###\s+(.+)$/.exec(line);
    if (sectionMatch && currentNote) {
      currentSection = {
        heading: normalizeHeading(sectionMatch[1]),
        items: [],
      };
      currentNote.sections.push(currentSection);
      continue;
    }

    const itemMatch = /^-\s+(.+)$/.exec(line);
    if (itemMatch && currentNote) {
      if (!currentSection) {
        currentSection = { heading: 'Changes', items: [] };
        currentNote.sections.push(currentSection);
      }
      currentSection.items.push(normalizeMarkdownText(itemMatch[1]));
      continue;
    }

    if (line.trim() && currentSection && currentSection.items.length > 0) {
      const lastItemIndex = currentSection.items.length - 1;
      currentSection.items[lastItemIndex] =
        `${currentSection.items[lastItemIndex]} ${normalizeMarkdownText(line.trim())}`;
    }
  }

  return notes.filter((note) => note.sections.some((section) => section.items.length > 0));
}

function normalizeHeading(value: string): string {
  return value.replace(/^v/, '').trim();
}

function normalizeMarkdownText(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
}
