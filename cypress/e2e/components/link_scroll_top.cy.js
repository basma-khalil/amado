/* global cy */
/// <reference types="cypress" />

describe('Link scroll to top spec', () => {
  it('Should scroll to the top of the page if any link is clicked', () => {
    cy.visit('/');
    cy.get('#footer-menu').contains('cart').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});
