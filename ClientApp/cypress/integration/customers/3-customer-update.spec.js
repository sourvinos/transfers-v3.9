context('Customers - Update', () => {

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

    it('Update record', () => {
        cy.updateCustomerRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
