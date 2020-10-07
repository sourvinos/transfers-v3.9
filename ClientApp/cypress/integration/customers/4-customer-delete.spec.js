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
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
    })

    it('Ask to delete and continue', () => {
        cy.deleteCustomerRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
