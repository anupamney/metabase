/**
 * No-op stub. The enterprise content-translation feature was removed with the
 * commercially-licensed enterprise/ directory, so there is no
 * translateContentString implementation to spy on. Kept so existing specs
 * that call it still load; the returned spy is inert.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslateContentStringFunction = (...args: any[]) => any;

export const setupTranslateContentStringSpy = (
  _mockImplementation?: TranslateContentStringFunction,
) => {
  let translateContentStringSpy: jest.Mock;

  beforeEach(() => {
    translateContentStringSpy = jest.fn();
  });

  afterEach(() => {
    translateContentStringSpy?.mockClear();
  });

  return () => translateContentStringSpy;
};
