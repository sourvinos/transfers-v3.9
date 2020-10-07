import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoPickupPointListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes/getActive', 'fixture:routes.json').as('getRoutes')
    cy.get('[data-cy=pickupPoints]').click()
    cy.wait('@getRoutes').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
})

Cypress.Commands.add('getPickupPointsForSelectedRoute', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
    cy.get('[data-cy=routeSelect]').click()
    cy.get('[data-cy=routeElement]').contains('NISAKI').click();
    cy.wait('@getPickupPoints').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
})

Cypress.Commands.add('getRoutes', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
})

Cypress.Commands.add('updatePickupPointRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('savePickupPoint')
    cy.get('[data-cy=save]').click()
    cy.wait('@savePickupPoint').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
})

Cypress.Commands.add('readPickupPointRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('getPickupPoint')
    cy.get('[data-cy=row]').contains('KAMINAKI').dblclick({ force: true })
    cy.wait('@getPickupPoint').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
})

Cypress.Commands.add('deletePickupPointRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('deletePickupPoint')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deletePickupPoint').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
})