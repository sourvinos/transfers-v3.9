context('Customers - Delete', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Read record', () => {
        cy.readCustomerRecord()
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
    })

    it('Ask to delete and continue', () => {
        cy.deleteCustomerRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
