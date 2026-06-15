import * as React from "react";

/**
 * Icon-only square button — toolbars, carousels, table row actions.
 * Always pass `label` for accessibility.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Phosphor icon class, e.g. "ph-caret-right". */
  icon: string;
  /** @default "plain" */
  variant?: "plain" | "solid" | "outline";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Adapt for dark navy surfaces. @default false */
  onNavy?: boolean;
  /** Accessible label (sets aria-label). */
  label?: string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
