import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/ports', status: 404, response: { error: 'ERROR!' } }).as('getPorts')
    cy.get('[data-cy=ports]').click()
    cy.wait('@getPorts').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'ports')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoPortListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports.json').as('getPorts')
    cy.get('[data-cy=ports]').click()
    cy.wait('@getPorts').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/ports')
})

Cypress.Commands.add('createRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/ports', 'fixture:port.json').as('savePort')
    cy.get('[data-cy=save]').click()
    cy.wait('@savePort').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports/1', 'fixture:port.json').as('getPort')
    cy.get('[data-cy=row]').contains('CORFU PORT').dblclick({ force: true })
    cy.wait('@getPort').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/ports/1')
})

Cypress.Commands.add('updateRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/ports/1', 'fixture:port.json').as('savePort')
    cy.get('[data-cy=save]').click()
    cy.wait('@savePort').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/ports')
})

Cypress.Commands.add('deleteRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/ports/1', 'fixture:port.json').as('deletePort')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deletePort').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/ports')
})

