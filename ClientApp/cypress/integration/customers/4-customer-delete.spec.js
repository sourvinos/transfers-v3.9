context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    describe('Seek and delete a record', () => {

        it('Goto the list from the home page', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=customers]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        it('Successful attempt to seek a record', () => {
            cy.seekCustomer()
        })

        it('Ask to delete and abort', () => {
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=abort]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/8')
        })

        it('Ask to delete, accept, display a snackbar and go back to the list', () => {
            cy.server()
            cy.route('DELETE', Cypress.config().baseUrl + '/api/customers/8', 'fixture:customer.json').as('deleteCustomer')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=ok]').click()
            cy.wait('@deleteCustomer').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

