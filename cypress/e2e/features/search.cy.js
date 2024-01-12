/* global cy */
/// <reference types="cypress" />

describe('Search spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be hidden when the page loads and visible when the sidebar search button is clicked', () => {
    cy.get('#search-container').should('be.hidden');
    cy.contains('search').click();
    cy.get('#search-container').should('be.visible');
  });

  it('Should navigate to the shop page if the search form is submitted', () => {
    cy.contains('search').click();
    cy.get('[placeholder="Type your keyword..."]').type('test');
    cy.get('button[aria-label="search"]').click();
    cy.location('pathname').should('eq', '/shop');
    cy.location('search').should('contain', 'query=test');
    cy.contains('categories').should('exist');
  });

  it('Should filter products by the search query if the search form is submitted', () => {
    cy.contains('search').click();
    cy.get('[placeholder="Type your keyword..."]').type('modern');
    cy.get('button[aria-label="search"]').click();
    cy.contains('your search results for: "modern"').should('exist');
    cy.get('article[class*="product-card"').should('have.length', 3);
  });
});
