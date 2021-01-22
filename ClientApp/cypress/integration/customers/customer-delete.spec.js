context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        it('Read record', () => {
            cy.gotoCustomerList()
            cy.readCustomerRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/22')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/customers/22', 'fixture:customer.json').as('deleteCustomer')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteCustomer').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

    })

    after(() => {
        cy.logout()
    })

})