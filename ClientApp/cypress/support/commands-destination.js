import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/destinations', status: 404, response: { error: 'ERROR!' } }).as('getDestinations')
    cy.get('[data-cy=destinations]').click()
    cy.wait('@getDestinations').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'destinations')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoDestinationList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations.json').as('getDestinations')
    cy.get('[data-cy=destinations]').click()
    cy.wait('@getDestinations').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
})

Cypress.Commands.add('gotoEmptyDestinationForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations/new')
})

Cypress.Commands.add('readDestinationRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destination.json').as('getDestination')
    cy.get('[data-cy=row]').contains('PAXOS - ANTIPAXOS').dblclick({ force: true })
    cy.wait('@getDestination').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations/2')
})