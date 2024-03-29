/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
};
