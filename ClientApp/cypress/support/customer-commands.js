import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoCustomerListWithSuccess', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
})

Cypress.Commands.add('gotoCustomerListWithError', () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'https://localhost:5001/api/customers',
        status: 404,
        response: { error: 'ERROR!' }
    }).as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    cy.get('[data-cy=goBack]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
})

Cypress.Commands.add('seekCustomerRecordWithError', () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'https://localhost:5001/api/customers/155',
        status: 404,
        response: { error: 'ERROR!' }
    }).as('getCustomer')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getCustomer').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/155')
})

Cypress.Commands.add('seekCustomerRecordWithSuccess', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/customers/155', 'fixture:customer.json').as('getCustomer')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getCustomer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/155')
})
