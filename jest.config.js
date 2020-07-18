module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/static/", "<rootDir>/static"],
  // modulePathIgnorePatterns: ["ts, js"],
  // transform: { "^.+\\.ts?$": "ts-jest" },
  // transformIgnorePatterns: ["^.+\\.js$"],
};
