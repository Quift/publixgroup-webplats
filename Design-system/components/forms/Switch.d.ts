import * as React from "react";

/**
 * Toggle switch for binary settings. Forwards native input props.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export function Switch(props: SwitchProps): JSX.Element;
