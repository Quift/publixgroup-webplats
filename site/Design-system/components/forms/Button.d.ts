import * as React from "react";

/**
 * PubliX Group primary button. Navy is the brand default; azure is the in-app
 * action colour; secondary/ghost for lower emphasis; danger for destructive.
 *
 * @startingPoint section="Forms" subtitle="Brand button — all variants & sizes" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: "primary" | "accent" | "secondary" | "ghost" | "danger";
  /** Control height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Phosphor icon class before the label, e.g. "ph-plus". */
  iconLeft?: string;
  /** Phosphor icon class after the label, e.g. "ph-arrow-right". */
  iconRight?: string;
  /** Stretch to full container width. @default false */
  block?: boolean;
  /** Adapt secondary/ghost variants for dark navy surfaces. @default false */
  onNavy?: boolean;
  /** Render as another element/component (e.g. "a"). @default "button" */
  as?: any;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
