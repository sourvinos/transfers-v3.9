context('Drivers - Delete', () => {



    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDriverListWithSuccess()
    })

    it('Read record', () => {
        cy.readRecord()
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
    })

    it('Ask to delete and continue', () => {
        cy.deleteRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

