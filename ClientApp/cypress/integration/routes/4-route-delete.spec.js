context('Routes - Delete', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoRouteListWithSuccess()
    })

    it('Read record', () => {
        cy.readRouteRecord()
    })

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/routes/19')
    })

    it('Ask to delete and continue', () => {
        cy.deleteRouteRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

