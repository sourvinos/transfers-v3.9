context('Seek', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(1500)
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.gotoDestinationListFromHomePage()
    })

    it('Successful attempt to seek a record', () => {
        cy.seekDestination()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

