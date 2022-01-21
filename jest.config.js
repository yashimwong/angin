module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/test/**'],
};
