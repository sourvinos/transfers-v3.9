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

    it('Successful attempt to seek a record', () => {
        cy.seekCustomer()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

