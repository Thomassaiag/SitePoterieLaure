export default {
    testEnvironment: "jsdom", // For testing React components in a browser-like environment
    
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    moduleNameMapper: {
        // Handle CSS imports
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel to transform your JSX files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!node-fetch)/"
    ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup file for additional configurations
    moduleDirectories: ["node_modules", "src"], // Simplify module imports
};
