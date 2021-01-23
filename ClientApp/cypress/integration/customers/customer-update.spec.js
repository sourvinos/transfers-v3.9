context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoCustomerList()
            cy.readCustomerRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers/customers.json').as('getCustomers')
            cy.route('PUT', Cypress.config().baseUrl + '/api/customers/22', 'fixture:customers/customer.json').as('saveCustomer')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveCustomer').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

    })

    after(() => {
        cy.logout()
    })

})