/**
 * No-op stubs. The commercially-licensed enterprise/ directory was removed
 * from this fork, so there are no enterprise plugins to initialize; OSS
 * default implementations are always in effect. These helpers are kept so
 * existing specs that call them still load.
 */

export function setupEnterpriseTest() {}

export function setupEnterprisePlugins() {}

export function setupSdkPlugins() {}

/**
 * @param {import("./enterprise-typed").ENTERPRISE_PLUGIN_NAME} _pluginName
 */
export function setupEnterpriseOnlyPlugin(_pluginName) {}
