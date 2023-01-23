/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  globalSetup: "./test/global-setup.ts",
  globalTeardown: "./test/global-teardown.ts"
};
