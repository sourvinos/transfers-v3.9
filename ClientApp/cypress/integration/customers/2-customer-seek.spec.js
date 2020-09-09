context('Seek', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.gotoCustomerListFromHomePage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

