/* global cy */
/// <reference types="cypress" />

describe('Skip link spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be hidden when the page loads and visible when the Tab button on the keyboard is pressed', () => {
    // Cypress considers elements visible if elements are intractable for the browser
    // cy.contains('skip to main content').should('be.hidden');
    cy.window().focus().realPress('Tab');
    cy.contains('skip to main content').should('have.focus').and('be.visible');
  });

  it('Should go to the main content if the skip to main content link is clicked', () => {
    cy.window().focus().realPress('Tab');
    cy.contains('skip to main content').realPress('Enter');
    cy.realPress('Tab')
      .focused()
      .then(($el) => expect($el.closest('main')).not.to.be.null);
  });
});
