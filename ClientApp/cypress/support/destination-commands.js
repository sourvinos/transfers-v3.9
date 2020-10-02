import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoDestinationListFromHomePage', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/destinations', 'fixture:destinations.json').as('getDestinations')
    cy.get('[data-cy=destinations]').click()
    cy.wait('@getDestinations').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
})

Cypress.Commands.add('seekDestination', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/destinations/16', 'fixture:destination.json').as('getDestination')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getDestination').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/destinations/16')
})