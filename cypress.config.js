const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://programamazsalud.com.mx',
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 12000,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--lang=es-ES');
        }
        return launchOptions;
      });
      return config;
    },
  },
});
