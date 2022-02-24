module.exports = {
    preset: 'ts-jest',
    globals: { 'ts-jest': { tsconfig: 'tsconfig.test.json' } },
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/test/**'],
};
