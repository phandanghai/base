/** @type {import("jest").Config} **/
module.exports = {
  rootDir: '.',
  testMatch: ['<rootDir>/{apps,packages}/**/*.(spec|test).ts'],
  passWithNoTests: true, // ⭐ QUAN TRỌNG
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: [
    '{apps,packages}/**/*.(t|j)s',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
