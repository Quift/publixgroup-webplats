import * as React from "react";

export interface TabItem {
  /** Stable id (falls back to value/label). */
  id?: string;
  value?: string;
  label: string;
  /** Phosphor icon class. */
  icon?: string;
  /** Optional count pill, e.g. number of items. */
  count?: number;
}

/**
 * Underline tab bar — controlled (`value`+`onChange`) or uncontrolled
 * (`defaultValue`). Use for in-page section switching and list filters.
 */
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs(props: TabsProps): JSX.Element;
