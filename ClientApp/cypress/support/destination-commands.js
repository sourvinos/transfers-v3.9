import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/destinations', status: 404, response: { error: 'ERROR!' } }).as('getDestinations')
    cy.get('[data-cy=destinations]').click()
    cy.wait('@getDestinations').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'destinations')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoDestinationListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations.json').as('getDestinations')
    cy.get('[data-cy=destinations]').click()
    cy.wait('@getDestinations').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
})

Cypress.Commands.add('createDestinationRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/destinations', 'fixture:destination.json').as('saveDestination')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveDestination').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readDestinationRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destination.json').as('getDestination')
    cy.get('[data-cy=row]').contains('PAXOS - ANTIPAXOS').dblclick({ force: true })
    cy.wait('@getDestination').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations/2')
})

Cypress.Commands.add('updateDestinationRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destination.json').as('saveDestination')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveDestination').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
})

Cypress.Commands.add('deleteDestinationRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destination.json').as('deleteDestination')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deleteDestination').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
})

