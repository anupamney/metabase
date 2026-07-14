import fetchMock from "fetch-mock";

import type {
  EnterpriseSettingKey,
  EnterpriseSettingValue,
  SettingDefinition,
} from "metabase-types/api";

// Inlined from the removed enterprise/ directory's user_provisioning types.
interface MaskedScimApiKey {
  id: number;
  scope: "scim";
  key: string;
  key_prefix: string;
  masked_key: string;
  name: string;
  user_id: null;
  created_at: string;
  creator_id: number;
  updated_at: string;
  updated_by_id: number;
}

interface UnmaskedScimApiKey extends MaskedScimApiKey {
  unmasked_key: string;
}

export function setupSettingsEndpoints(settings: SettingDefinition[]) {
  fetchMock.get("path:/api/setting", settings, { name: "settings-list" });
}

export function setupSettingEndpoint<K extends EnterpriseSettingKey>({
  settingKey,
  settingValue,
}: {
  settingKey: K;
  settingValue: EnterpriseSettingValue<K>;
}) {
  if (settingValue === null || settingValue === undefined) {
    throw new Error("settingValue must be non-null and non-undefined");
  }
  fetchMock.get(
    "path:/api/setting/" + settingKey,
    { body: settingValue },
    { name: `setting-${settingKey}` },
  );
}

export function setupUpdateSettingEndpoint(
  { status }: { status?: number } = { status: 204 },
) {
  const name = "update-setting";
  fetchMock.removeRoute(name);
  fetchMock.put(new RegExp("/api/setting/"), { status }, { name: name });
}

export function setupUpdateSettingsEndpoint(
  { status }: { status?: number } = { status: 204 },
) {
  fetchMock.put("path:/api/setting", { status });
}

export function setupScimEndpoints(
  payload: MaskedScimApiKey | UnmaskedScimApiKey,
) {
  fetchMock.get("path:/api/ee/scim/api_key", payload);
  fetchMock.post("path:/api/ee/scim/api_key", payload);
}

export function setupUpsellEndpoints() {
  fetchMock.get(
    "path:/api/user-key-value/namespace/user_acknowledgement/key/upsell-embedding-methods",
    { status: 204 },
  );
}

export function setupGenerateRandomTokenEndpoint(token: string) {
  fetchMock.get(
    "path:/api/util/random_token",
    { token },
    { name: "generate-random-token" },
  );
}
