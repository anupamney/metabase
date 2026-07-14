/**
 * Type-only stub for the "custom-viz" package, which lived in the removed
 * commercially-licensed enterprise/ directory. Open-source code only ever
 * imported types from it (never runtime values), so this stub declares just
 * the types those imports reference.
 */

export type WidgetMountHandle<TProps> = {
  update(props: TProps): void;
  unmount(): void;
};

export type WidgetMount<TProps = Record<string, unknown>> = (
  container: Element,
  initialProps: TProps,
) => WidgetMountHandle<TProps>;

export type VisualizationGridSize = {
  width: number;
  height: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnPredicate = (column: any) => boolean;

export interface ColumnTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (...args: any[]) => boolean;
}
