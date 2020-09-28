context('Seek', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(1500)
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.gotoDriverListFromHomePage()
    })

    it('Successful attempt to seek a record', () => {
        cy.seekDriver()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

