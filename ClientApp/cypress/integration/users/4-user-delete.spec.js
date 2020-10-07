context('Users - Delete', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoUserListWithSuccess()
    })

    it('Read record', () => {
        cy.readUserRecord()
    })

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28')
    })

    it('Delete record', () => {
        cy.deleteUserRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
