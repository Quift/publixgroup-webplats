import * as React from "react";

/**
 * Checkbox with optional label and description. Forwards native input props
 * (`checked`, `defaultChecked`, `onChange`, `disabled`).
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
