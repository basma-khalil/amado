/* global cy */
/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.intercept(
      {
        hostname: 'firestore.googleapis.com',
      },
      // FIX: Can't display fake responses to apply it for tests
      { fixture: 'projects.json' }
    );
    cy.visit('/');

  });
});

// https://github.com/prescottprue/cypress-firebase
// Firestore Emulator
