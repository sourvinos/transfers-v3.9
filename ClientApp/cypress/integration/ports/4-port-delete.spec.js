context('Ports - Delete', () => {

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
        cy.readPortRecord()
    })

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/ports/1')
    })

    it('Ask to delete and continue', () => {
        cy.deletePortRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
