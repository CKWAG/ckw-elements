import releases from './releases.json';

export interface ReleaseEntry {
  version: string;
  date: string;
  notes: string[];
}

export const releaseNotes: ReleaseEntry[] = releases;
