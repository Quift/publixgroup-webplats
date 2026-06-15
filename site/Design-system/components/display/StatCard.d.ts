import * as React from "react";

/**
 * Headline metric tile — figure in mono, label, optional trend & footnote.
 * Used on dashboards and impact/KPI sections.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** Phosphor icon class beside the label. */
  icon?: string;
  /** Trend text, e.g. "+12%". */
  trend?: string;
  /** @default "up" */
  trendDir?: "up" | "down";
  /** Small caption under the value. */
  footnote?: string;
  /** Dark navy variant. @default false */
  navy?: boolean;
}

export function StatCard(props: StatCardProps): JSX.Element;
