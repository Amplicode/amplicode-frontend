module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageThreshold": {
    "global": {
      "statements": 4,
      "branches": 4,
      "functions": 2,
      "lines": 4
    },
    "./src/ui/paging": {
      "statements": 90,
      "branches": 90,
      "functions": 90,
      "lines": 90
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ]
};
