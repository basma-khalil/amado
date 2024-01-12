/* global cy */
/* global Cypress */
/// <reference types="cypress" />

describe('Sidebar spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be a collapsible sidebar on x-small screens', () => {
    cy.viewport(
      Cypress.env('x_small_screen_width'),
      Cypress.env('x_small_screen_height')
    );
    cy.get('#site-sidebar').should('be.hidden');
    cy.get('header button[aria-label="open menu"]').click();
    cy.get('#site-sidebar').should('be.visible');
    cy.get('aside button[aria-label="close menu"]').click();
    cy.get('#site-sidebar').should('be.hidden');
  });

  it('Should navigate to the home page if the home link is clicked', () => {
    cy.get('#site-sidebar').contains('home').trigger('mouseover');
    cy.get('#site-sidebar').contains('home')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('home').click();
    cy.location('pathname').should('eq', '/');
  });

	it('Should navigate to the shop page if the shop link is clicked', () => {
    cy.get('#site-sidebar').contains('shop').trigger('mouseover');
    cy.get('#site-sidebar').contains('shop')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('shop').click();
    cy.location('pathname').should('eq', '/shop');
		cy.contains('categories').should('exist');
  });

	it('Should navigate to the cart page if the cart link is clicked', () => {
    cy.get('#site-sidebar nav').contains('cart').trigger('mouseover');
    cy.get('#site-sidebar nav').contains('cart')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar nav').contains('cart').click();
    cy.location('pathname').should('eq', '/cart');
		cy.contains('shopping cart').should('exist');
  });

	it('Should navigate to the checkout page if the checkout link is clicked', () => {
    cy.get('#site-sidebar').contains('checkout').trigger('mouseover');
    cy.get('#site-sidebar').contains('checkout')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('checkout').click();
    cy.location('pathname').should('eq', '/checkout');
		cy.contains('checkout').should('exist');
  });

	it('Should navigate to the new this week page if the new this week link is clicked', () => {
    cy.get('#site-sidebar').contains('new this week').trigger('mouseover');
    cy.get('#site-sidebar').contains('new this week')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('new this week').click();
    cy.location('pathname').should('eq', '/shop');
    cy.location('search').should('contain', 'sorting=newest');
		cy.contains('categories').should('exist');
  });

	it('Should navigate to the cart page if the cart link is clicked', () => {
    cy.get('#site-sidebar [class*="user-tools"').contains('cart').trigger('mouseover');
    cy.get('#site-sidebar').contains('cart')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('cart').click();
    cy.location('pathname').should('eq', '/cart');
		cy.contains('shopping cart').should('exist');
  });

	it('Should navigate to the favorite page if the favorite link is clicked', () => {
    cy.get('#site-sidebar').contains('favorite').trigger('mouseover');
    cy.get('#site-sidebar').contains('favorite')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('favorite').click();
    cy.location('pathname').should('eq', '/favorite');
		cy.contains('saved items').should('exist');
  });

	it('Should display the search form if the search button is clicked', () => {
    cy.get('#site-sidebar').contains('search').trigger('mouseover');
    cy.get('#site-sidebar').contains('search')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').contains('search').click();
    cy.get('#search-container').should('be.visible');
  });

	it('Should navigate to the Pinterest page if the Pinterest link is clicked', () => {
    cy.get('#site-sidebar').get('a[title="Pinterest"]').trigger('mouseover');
    cy.get('#site-sidebar').get('a[title="Pinterest"]')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').get('a[title="Pinterest"]').should('have.attr', 'href').and('include', 'pinterest');
  });

	it('Should navigate to the Instagram page if the Instagram link is clicked', () => {
    cy.get('#site-sidebar').get('a[title="Instagram"]').trigger('mouseover');
    cy.get('#site-sidebar').get('a[title="Instagram"]')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').get('a[title="Instagram"]').should('have.attr', 'href').and('include', 'instagram');
  });

	it('Should navigate to the Facebook page if the Facebook link is clicked', () => {
    cy.get('#site-sidebar').get('a[title="Facebook"]').trigger('mouseover');
    cy.get('#site-sidebar').get('a[title="Facebook"]')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').get('a[title="Facebook"]').should('have.attr', 'href').and('include', 'facebook');
  });

	it('Should navigate to the Twitter page if the Twitter link is clicked', () => {
    cy.get('#site-sidebar').get('a[title="Twitter"]').trigger('mouseover');
    cy.get('#site-sidebar').get('a[title="Twitter"]')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#site-sidebar').get('a[title="Twitter"]').should('have.attr', 'href').and('include', 'twitter');
  });
});
