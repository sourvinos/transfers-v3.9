describe('Seek customer', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Unsuccessful attempt to edit the second row', () => {
        cy.seekCustomerRecordWithError()
    })

    it('Successful attempt to seek the first row', () => {
        cy.seekCustomerRecordWithSuccess()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

