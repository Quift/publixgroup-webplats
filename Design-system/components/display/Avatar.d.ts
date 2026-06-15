import * as React from "react";

/**
 * Avatar showing a photo or auto-derived initials from `name`.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials fallback and the title tooltip. */
  name?: string;
  /** Image URL. Falls back to initials when omitted. */
  src?: string;
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** @default "round" */
  shape?: "round" | "square";
  /** @default "default" */
  tone?: "default" | "navy" | "azure";
}

export function Avatar(props: AvatarProps): JSX.Element;
