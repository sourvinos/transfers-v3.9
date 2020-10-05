import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/customers', status: 404, response: { error: 'ERROR!' } }).as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoCustomerListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers')
})

Cypress.Commands.add('createRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/customers', 'fixture:customer.json').as('saveCustomer')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveCustomer').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/customers/222', 'fixture:customer.json').as('getCustomer')
    cy.get('[data-cy=row]').contains('ASK 2 TRAVEL').dblclick({ force: true })
    cy.wait('@getCustomer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
})

Cypress.Commands.add('updateRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/customers/222', 'fixture:customer.json').as('saveCustomer')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveCustomer').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/customers')
})

Cypress.Commands.add('deleteRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/customers/222', 'fixture:customer.json').as('deleteCustomer')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deleteCustomer').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/customers')
})

