import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Styled native select with a Phosphor caret. Pass `options` (strings or
 * {value,label}) or supply your own <option> children.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Array<string | SelectOption>;
  placeholder?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export function Select(props: SelectProps): JSX.Element;
