module.exports = {
  preset: 'jest-preset-angular',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/image.js',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/jestGlobalMocks.ts'],
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!src/jestGlobalMocks.ts',
    'src/app/**/**.ts',
    '!src/app/**/**.module.ts'
  ]
};
