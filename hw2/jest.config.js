module.exports = {
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	// testPathIgnorePatterns: ['/lib', '/src/vmunimx/upload-page/file-rendering'],
	// testResultsProcessor: 'jest-sonar-reporter',
	// preset: 'ts-jest',
	// testEnvironment: 'node',
	// moduleDirectories: ['node_modules'],
	// setupFilesAfterEnv: ['./src/tests/setup.ts'],
	// coverageDirectory: '<rootDir>/coverage/',
	// coveragePathIgnorePatterns: ['file-generator/lib/'],
	transform: {
		'^.+\\.(ts)$': 'ts-jest',
	},
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
		},
	},
};
