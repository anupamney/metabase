import type { SdkStoreState } from "embedding-sdk-bundle/store/types";
import type { SettingsState, State } from "metabase/redux/store";
import { createMockUser } from "metabase-types/api/mocks";

import { createMockAdminState } from "./admin";
import { createMockApiState } from "./api";
import { createMockAppState } from "./app";
import { createMockAuthState } from "./auth";
import { createMockDashboardState } from "./dashboard";
import { createMockEmbedState } from "./embed";
import { createMockEmbeddingDataPickerState } from "./embedding-data-picker";
import { createMockNormalizedEntitiesState } from "./entities";
import { createMockModalState } from "./modal";
import { createMockParametersState } from "./parameters";
import { createMockQueryBuilderState } from "./qb";
import { createMockRoutingState } from "./routing";
import { createMockSettingsState } from "./settings";
import { createMockSetupState } from "./setup";
import { createMockUploadState } from "./upload";
import { createMockVisualizerState } from "./visualizer";

/**
 * The shape accepted (and returned) by mock-state builders and test render
 * harnesses: `State` plus seed-only fields with no reducer behind them.
 * `settings` is mirrored into `window.MetabaseBootstrap` below; the render
 * harnesses strip it before it reaches `preloadedState`.
 */
export type StoreSeedState = State & {
  settings: SettingsState;
};

export function createMockState<S extends Pick<SdkStoreState, "sdk">>(
  opts?: S,
): SdkStoreState;
export function createMockState(opts?: Partial<StoreSeedState>): StoreSeedState;
export function createMockState(opts: any) {
  const state = {
    admin: createMockAdminState(),
    app: createMockAppState(),
    auth: createMockAuthState(),
    currentUser: createMockUser(),
    dashboard: createMockDashboardState(),
    embed: createMockEmbedState(),
    embeddingDataPicker: createMockEmbeddingDataPickerState(),
    entities: createMockNormalizedEntitiesState(),
    "metabase-api": createMockApiState(),
    parameters: createMockParametersState(),
    qb: createMockQueryBuilderState(),
    routing: createMockRoutingState(),
    settings: createMockSettingsState(),
    setup: createMockSetupState(),
    upload: createMockUploadState(),
    visualizer: {
      past: [],
      present: createMockVisualizerState(),
      future: [],
    },
    modal: createMockModalState(),
    ...opts,
  };

  // Intentional side effect — do NOT "clean this up" into explicit per-test
  // seeding. There's no `settings` reducer; settings resolve from the
  // `getSessionProperties` cache, falling back to `window.MetabaseBootstrap`.
  // Auto-mirroring the mock settings into the bootstrap here is what lets a
  // store-less or pure-selector test read them without a separate step — so
  // nobody silently forgets to seed settings and reads empty. jest-setup-env
  // clears the bootstrap between tests.
  //
  // Restricted to jest: Storybook calls createMockState at every story's module
  // load, so writing this shared global there would leak one story's settings
  // into the next (Loki caught exactly that). Stories seed the query cache
  // per-store instead (see `getManifestStore` in `__support__/entities-store`).
  //
  // Only fills an *empty* bootstrap, so a test that set its own bootstrap and
  // then builds a settings-less mock state isn't clobbered by our defaults.
  const hasExplicitSettings = opts?.settings != null;
  if (
    process.env.NODE_ENV === "test" &&
    typeof window !== "undefined" &&
    state.settings?.values &&
    (hasExplicitSettings || window.MetabaseBootstrap === undefined)
  ) {
    window.MetabaseBootstrap = state.settings.values;
  }

  return state;
}
