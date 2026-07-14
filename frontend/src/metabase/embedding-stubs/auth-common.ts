/**
 * Stub for "embedding/auth-common", which lived in the removed
 * commercially-licensed enterprise/ directory. Embedding SDK SSO auth is not
 * available in this build; the SDK bundle that imports these is not built or
 * shipped, so these throw if ever reached.
 */

const unavailable = (name: string) => {
  return () => {
    throw new Error(
      `${name} is unavailable: enterprise embedding auth is not part of this build`,
    );
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectToInstanceAuthSso: (...args: any[]) => any = unavailable(
  "connectToInstanceAuthSso",
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jwtDefaultRefreshTokenFunction: (...args: any[]) => any =
  unavailable("jwtDefaultRefreshTokenFunction");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateSession: (...args: any[]) => any =
  unavailable("validateSession");
