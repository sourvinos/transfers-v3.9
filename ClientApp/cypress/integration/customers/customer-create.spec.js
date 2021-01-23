context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        it('Goto an empty form', () => {
            cy.gotoCustomerList()
            cy.gotoEmptyCustomerForm()
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 12).elementShouldBeValid('description')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers/customers.json').as('getCustomers')
            cy.route('POST', Cypress.config().baseUrl + '/api/customers', 'fixture:customers/customer.json').as('saveCustomer')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveCustomer').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

    })

    after(() => {
        cy.logout()
    })

})