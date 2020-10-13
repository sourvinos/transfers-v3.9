import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/drivers', status: 404, response: { error: 'ERROR!' } }).as('getDrivers')
    cy.get('[data-cy=drivers]').click()
    cy.wait('@getDrivers').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'drivers')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoDriverList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers.json').as('getDrivers')
    cy.get('[data-cy=drivers]').click()
    cy.wait('@getDrivers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
})

Cypress.Commands.add('gotoEmptyDriverForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
})

Cypress.Commands.add('readDriverRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:driver.json').as('getDriver')
    cy.get('[data-cy=row]').contains('STAMATIS').dblclick({ force: true })
    cy.wait('@getDriver').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
})
