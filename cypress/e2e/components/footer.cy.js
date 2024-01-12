/* global cy */
/* global Cypress */
/// <reference types="cypress" />

describe('Footer spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have the footer menu as a dropdown menu on small screens', () => {
    cy.viewport(
      Cypress.env('small_screen_width'),
      Cypress.env('small_screen_height')
    );
    cy.get('#footer-menu').should('be.hidden');
    cy.get('footer button[aria-label="open menu"]').click();
    cy.get('#footer-menu').should('be.visible');
    cy.get('footer button[aria-label="close menu"]').click();
    cy.get('#footer-menu').should('be.hidden');
  });

  it('Should navigate to the home page if the home link is clicked', () => {
    cy.get('#footer-menu').contains('home').trigger('mouseover');
    cy.get('#footer-menu')
      .contains('home')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#footer-menu').contains('home').click();
    cy.location('pathname').should('eq', '/');
  });

  it('Should navigate to the shop page if the shop link is clicked', () => {
    cy.get('#footer-menu').contains('shop').trigger('mouseover');
    cy.get('#footer-menu')
      .contains('shop')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#footer-menu').contains('shop').click();
    cy.location('pathname').should('eq', '/shop');
    cy.contains('categories').should('exist');
  });

  it('Should navigate to the cart page if the cart link is clicked', () => {
    cy.get('#footer-menu').contains('cart').trigger('mouseover');
    cy.get('#footer-menu')
      .contains('cart')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#footer-menu').contains('cart').click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('shopping cart').should('exist');
  });

  it('Should navigate to the checkout page if the checkout link is clicked', () => {
    cy.get('#footer-menu').contains('checkout').trigger('mouseover');
    cy.get('#footer-menu')
      .contains('checkout')
      .should('have.css', 'cursor', 'pointer');
    cy.get('#footer-menu').contains('checkout').click();
    cy.location('pathname').should('eq', '/checkout');
    cy.contains('checkout').should('exist');
  });
});
