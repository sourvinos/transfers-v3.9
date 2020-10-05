context('Customers - Delete', () => {



    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoList()
    })

    it('Seek record', () => {
        cy.seekRecord()
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
    })

    it('Ask to delete and continue', () => {
        cy.deleteRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

