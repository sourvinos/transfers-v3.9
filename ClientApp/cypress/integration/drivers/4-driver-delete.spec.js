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
        cy.readDriverRecord()
    })

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
    })

    it('Ask to delete and continue', () => {
        cy.deleteDriverRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

