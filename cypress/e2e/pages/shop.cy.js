/* global cy */
/// <reference types="cypress" />

describe('Shop spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('a').contains('shop').first().click();
  });

  it('Should display list view if list view button is clicked', () => {
    cy.get('button[aria-label="list view"]').click();
    cy.get('article[class*="list"]').should('exist');
  });

  it('Should filter products by the clicked category', () => {
    cy.contains('chairs').click();
    cy.location('search').should('contain', 'category=chairs');
    cy.get('article[class*="product-card"').should('have.length', 4);
  });

  it('Should filter products by the checked brand and reset the filter if the brand is unchecked', () => {
    cy.get('input#ikea').check();
    cy.location('search').should('contain', 'brand=ikea');
    cy.get('article[class*="product-card"').should('have.length', 2);
    cy.get('input#ikea').uncheck();
    cy.location('search').should('contain', 'brand=all');
    cy.get('article[class*="product-card"').should('have.length', 6);
  });

  it('Should filter products by the checked color and reset the filter if the color is unchecked', () => {
    cy.get('[aria-label="gray"]').click();
    cy.location('search').should('contain', 'color=gray');
    cy.get('article[class*="product-card"').should('have.length', 1);
    cy.get('[aria-label="gray"]').click();
    cy.location('search').should('contain', 'color=all');
    cy.get('article[class*="product-card"').should('have.length', 6);
  });

  it('Should reset products if the search form is submitted and the clear search button is clicked', () => {
    cy.contains('search').click();
    cy.get('[placeholder="Type your keyword..."]').type('modern');
    cy.get('button[aria-label="search"]').click();
    cy.get('article[class*="product-card"').should('have.length', 3);
    cy.contains('clear search').click();
    cy.get('article[class*="product-card"').should('have.length', 6);
  });

  it('Should add the product to the cart if add to cart button is clicked', () => {
    cy.get('button[aria-label="Add to Cart"]').first().click();
    cy.get('a').contains('cart').first().click();
    cy.get('tbody tr').should('have.length', 1);
  });

  it('Should add the product to the favorite if add to favorite button is clicked', () => {
    cy.get('button[aria-label="Toggle Favorite"]').first().click();
    cy.get('a').contains('favorite').click();
    cy.get('tbody tr').should('have.length', 1);
  });
});
