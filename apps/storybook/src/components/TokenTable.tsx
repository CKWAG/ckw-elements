import React from 'react';
import type { ReactNode } from 'react';

interface Column {
  header: string;
  width?: string;
}

interface TokenTableProps {
  columns: Column[];
  children: ReactNode;
}

/**
 * Generic table for documentation pages.
 * Styled via .docs-table in docs.css — Figma-aligned header, borders, and spacing.
 */
export function TokenTable({ columns, children }: TokenTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="docs-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={`${col.header}-${index}`} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface TokenTableRowProps {
  children: ReactNode;
}

export function TokenTableRow({ children }: TokenTableRowProps) {
  return <tr>{children}</tr>;
}

interface TokenTableCellProps {
  children: ReactNode;
  mono?: boolean;
}

export function TokenTableCell({ children, mono }: TokenTableCellProps) {
  return (
    <td className={mono ? 'cell-mono' : undefined}>
      {children}
    </td>
  );
}
