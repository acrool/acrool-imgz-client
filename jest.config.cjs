module.exports = {
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    // testEnvironment: 'jsdom',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.[jt]s?(x)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    // setupFilesAfterEnv: ['./jest.setup.js']
};
