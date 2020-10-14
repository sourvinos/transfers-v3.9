import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoCustomerListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/customers', status: 404, response: { error: 'ERROR!' } }).as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('getCustomerRecordWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/customers/222', status: 404, response: { error: 'ERROR!' } }).as('getCustomer')
    cy.get('[data-cy=row]').contains('ASK 2 TRAVEL').dblclick({ force: true })
    cy.wait('@getCustomer').its('status').should('eq', 404)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoCustomerList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers')
})

Cypress.Commands.add('gotoEmptyCustomerForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
})

Cypress.Commands.add('readCustomerRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/customers/222', 'fixture:customer.json').as('getCustomer')
    cy.get('[data-cy=row]').contains('ASK 2 TRAVEL').dblclick({ force: true })
    cy.wait('@getCustomer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
})
