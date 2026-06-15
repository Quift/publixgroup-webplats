import * as React from "react";

/**
 * Labelled text input with optional leading icon, hint text and error state.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — switches the field to its error style. */
  error?: string;
  /** Phosphor icon class shown inside the field, e.g. "ph-magnifying-glass". */
  icon?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Show a required asterisk. @default false */
  required?: boolean;
}

export function Input(props: InputProps): JSX.Element;
