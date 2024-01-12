/* global cy */
/* global Cypress */
/// <reference types="cypress" />

describe('Header spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be hidden on medium and large screens', () => {
    cy.get('header[class*="site-header"]').should('be.hidden');
  });

  it('Should be visible on x-small screens', () => {
    cy.viewport(
      Cypress.env('x_small_screen_width'),
      Cypress.env('x_small_screen_height')
    );
    cy.get('header[class*="site-header"]').should('be.visible');
  });

  it('Should have the sidebar as a collapsible sidebar on x-small screens', () => {
    cy.viewport(
      Cypress.env('x_small_screen_width'),
      Cypress.env('x_small_screen_height')
    );
    cy.get('#site-sidebar').should('be.hidden');
    cy.get('header button[aria-label="open menu"]').click();
    cy.get('#site-sidebar').should('be.visible');
    cy.get('header button[aria-label="close menu"]').click();
    cy.get('#site-sidebar').should('be.hidden');
  });
});
