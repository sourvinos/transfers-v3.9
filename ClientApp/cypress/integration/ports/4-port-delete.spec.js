context('Ports - Delete', () => {

    // Last revision: Mon 5/10/2020 09:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoPortListWithSuccess()
    })

    it('Read record', () => {
        cy.readRecord()
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/ports/1')
    })

    it('Ask to delete and continue', () => {
        cy.deleteRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

