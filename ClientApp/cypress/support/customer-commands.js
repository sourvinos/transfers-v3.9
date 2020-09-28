import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoCustomerListFromHomePage', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5002/api/customers', 'fixture:customers.json').as('getCustomers')
    cy.get('[data-cy=customers]').click()
    cy.wait('@getCustomers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
})

Cypress.Commands.add('seekCustomer', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5002/api/customers/155', 'fixture:customer.json').as('getCustomer')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getCustomer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/155')
})