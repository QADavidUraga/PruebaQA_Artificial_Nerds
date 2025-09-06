const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Plugins si los necesitas
    },
    baseUrl: "https://programamazsalud.com.mx/",
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 800,
  }
});
