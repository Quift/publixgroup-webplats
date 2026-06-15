import * as React from "react";

/**
 * Neutral chip for categories, filters and metadata. Can be selectable
 * (filter pill) or removable (token in a multi-select).
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Phosphor icon class. */
  icon?: string;
  /** Render as a clickable filter pill. @default false */
  selectable?: boolean;
  /** Selected state (with `selectable`). @default false */
  selected?: boolean;
  /** When provided, shows a remove "×". */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
