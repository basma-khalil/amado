const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  env: {
    x_small_screen_width: 576,
    x_small_screen_height: 800,
    small_screen_width: 768,
    small_screen_height: 1024,
    medium_screen_width: 992,
    medium_screen_height: 1368,
  },
});
