import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoPickupPointListWithSuccess', () => {
    cy.getRoutes()
    cy.get('[data-cy=pickupPoints]').click()
    cy.wait('@getRoutes').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
})

Cypress.Commands.add('getRoutes', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
})

Cypress.Commands.add('readRecord', () => {
})