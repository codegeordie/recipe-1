/// <reference types="cypress" />

describe('recipe favoriting', () => {
	before(() => {
		cy.login()
		cy.visit('/')
		cy.wait('@session')
	})

	it('favorite a recipe', () => {
		cy.get('[data-test-id="recipe-card"]').first().as('testcard')
		cy.get('@testcard').within(() => {
			cy.get('[data-test-id="setFavoriteButton"]').click()
			cy.get('[data-test-id="unsetFavoriteButton"]').should('be.visible')
		})
		cy.intercept('POST', '/api/proxy/users/favorites').as('setFav')
		cy.wait('@setFav')
		//cy.wait(1000)
		cy.contains('Only My Favorites').click()
		//cy.wait(1000)
		cy.get('@testcard').should('be.visible')
		//cy.wait(1000)
		cy.get('[data-test-id="setFavoriteButton"]').should('not.exist')
	})

	it('remove a favorite', () => {
		cy.contains('Only My Favorites').click()
		cy.wait(1000)
		cy.get('[data-test-id="recipe-card"]').first().as('testcard')
		cy.get('@testcard').within(() => {
			cy.get('[data-test-id="unsetFavoriteButton"]').click()
			cy.intercept('POST', '/api/proxy/users/favorites').as('setFav')
			cy.wait('@setFav')
			cy.get('[data-test-id="setFavoriteButton"]').should('be.visible')
		})
	})
})
