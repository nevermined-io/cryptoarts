module.exports = {  moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    preset: 'ts-jest',
    testRegex: '[^-](spec|test).ts$',
    testEnvironment: 'node',
    coverageDirectory: './coverage',
    verbose: true,
    roots: ['<rootDir>'],
    collectCoverageFrom: ['**/*.{js,jsx}', '**/*.{ts,tx}', '!**/node_modules/**'],
    globalTeardown: '<rootDir>/test/teardown.js'
}
