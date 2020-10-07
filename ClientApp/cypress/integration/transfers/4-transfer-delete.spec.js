context('Edit', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Successful attempt to search by a given date', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        cy.searchTransfersWithSuccess()
    })

    it('Successful attempt to seek the first row', () => {
        cy.get('#listTab').click()
        cy.seekTransferWithSuccess()
        cy.url().should('eq', Cypress.config().baseUrl + '/tranfers/2020-08-01/587')
    })

    it('Ask to delete and abord', () => {
        cy.clickOnDeleteAndAbort()        
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

