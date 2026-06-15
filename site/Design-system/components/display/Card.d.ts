import * as React from "react";

/**
 * Surface container — the base for content cards, list items and panels.
 * Border-first elevation with a soft navy-tinted shadow.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Apply default internal padding. @default true */
  padded?: boolean;
  /** Lift + shadow on hover (for clickable cards). @default false */
  interactive?: boolean;
  /** Remove the shadow (border only). @default false */
  flat?: boolean;
  /** Dark navy variant for hero/feature cards. @default false */
  navy?: boolean;
  /** Render as another element, e.g. "a". @default "div" */
  as?: any;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
