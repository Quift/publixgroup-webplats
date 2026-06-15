import * as React from "react";

/**
 * Status badge / pill with semantic tones and an optional leading dot or icon.
 * Use for application status, shift state, grant outcomes, etc.
 *
 * @startingPoint section="Display" subtitle="Status badges, tags, avatars & cards" viewport="700x150"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: "neutral" | "info" | "success" | "warning" | "danger" | "brand" | "solid";
  /** Show a leading status dot. @default false */
  dot?: boolean;
  /** Phosphor icon class. */
  icon?: string;
  /** @default "md" */
  size?: "sm" | "md";
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
