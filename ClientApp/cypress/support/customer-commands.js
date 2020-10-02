import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoCustomerListFromHomePage', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
    cy.get('[data-cy=customers]').click().then(() => {
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/customers')
    })
})

Cypress.Commands.add('seekCustomer', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/customers/8', 'fixture:customer.json').as('getCustomer')
    cy.get('[data-cy=row]:nth-child(5)').dblclick()
    cy.wait('@getCustomer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/customers/8')
})