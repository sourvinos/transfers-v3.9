describe('Delete customer', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Seek the first row', () => {
        cy.seekCustomerRecordWithSuccess()
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=cancel]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/155')
    })

    it('Ask to delete, accept and display a snackbar', () => {
        cy.server()
        cy.route('DELETE', 'https://localhost:5001/api/customers/155', 'fixture:customer.json').as('deleteCustomer')
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@deleteCustomer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

