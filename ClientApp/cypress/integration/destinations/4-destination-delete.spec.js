context('Destinations - Delete', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDestinationListWithSuccess()
    })

    it('Read record', () => {
        cy.readDestinationRecord()
    })

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations/2')
    })

    it('Ask to delete and continue', () => {
        cy.deleteDestinationRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

