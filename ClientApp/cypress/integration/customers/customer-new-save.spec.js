describe('New customer with save', () => {

    before(() => {
        cy.login()
    })

    it('Goto the customers list from the home page', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            .get('[data-cy=customers]').click()
            .wait('@getCustomers').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

    it('Go to an empty form', () => {
        cy.gotoUrlFromElement('customers/new', 'new')
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers/new')
    })

    it('Critical elements', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12)
            .elementShouldBeValid('description')
            .elementShouldBeValid('form')
            .buttonShouldBeEnabled('save')
    })

    it('Save and display a snackbar', () => {
        cy.server()
            .route('POST', 'https://localhost:5001/api/customers', 'fixture:customer.json').as('saveCustomer')
            .get('[data-cy=save]').click()
            .wait('@saveCustomer').its('status').should('eq', 200)
            .get('[data-cy=customSnackbar]')
    })

    it('Goto the customer list', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            .get('[data-cy=goBack]').click()
            .wait('@getCustomers').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

})

