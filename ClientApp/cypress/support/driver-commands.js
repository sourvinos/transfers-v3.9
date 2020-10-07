import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/drivers', status: 404, response: { error: 'ERROR!' } }).as('getDrivers')
    cy.get('[data-cy=drivers]').click()
    cy.wait('@getDrivers').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'drivers')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoDriverListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers.json').as('getDrivers')
    cy.get('[data-cy=drivers]').click()
    cy.wait('@getDrivers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
})

Cypress.Commands.add('createDriverRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/drivers', 'fixture:driver.json').as('saveDriver')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveDriver').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readDriverRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:driver.json').as('getDriver')
    cy.get('[data-cy=row]').contains('STAMATIS').dblclick({ force: true })
    cy.wait('@getDriver').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
})

Cypress.Commands.add('updateDriverRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:driver.json').as('saveDriver')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveDriver').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
})

Cypress.Commands.add('deleteDriverRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:driver.json').as('deleteDriver')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deleteDriver').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
})

