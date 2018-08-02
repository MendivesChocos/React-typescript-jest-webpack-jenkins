module.exports =   {
  setupFiles: [
    "<rootDir>/config/jest/test-setup.js",
    "jest-localstorage-mock"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    '**/src/**.(test|spec).(jsx|tsx|js|ts)'
  ],
  moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
  moduleNameMapper: {
    "^.+\\.s?css$": "<rootDir>/config/jest/assetsTransform.js",
    "^.+\\.(jpg|jpeg|png)$": "<rootDir>/config/jest/assetsTransform.js",
    "^@app/(.*)": "<rootDir>/$1"
  }
}
