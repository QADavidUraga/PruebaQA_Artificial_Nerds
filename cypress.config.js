const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.com',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
});
