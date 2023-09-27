module.exports = {
  testEnvironment: 'node', // Use a Node.js environment for your backend tests
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // Define your test file patterns
  testPathIgnorePatterns: ['/node_modules/'], // Ignore files in the node_modules directory
};
