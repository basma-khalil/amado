/* global cy */
/// <reference types="cypress" />

describe('Scroll to top spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be hidden when the window is at the top of the page and visible when it scrolls down to more than 300px', () => {
    cy.get('button[title="Scroll to top"]').should('be.hidden');
    cy.scrollTo(0, 301);
    cy.get('button[title="Scroll to top"]').should('be.visible');
  });

  it('Should scroll to the top of the page if the scroll to top button is clicked', () => {
    cy.scrollTo(0, 301);
    cy.get('button[title="Scroll to top"]').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});
