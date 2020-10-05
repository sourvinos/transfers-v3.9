context('Customers - Update', () => {

    // Last revision: Mon 5/10/2020 09:00

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
        cy.readRecord()
    })

    it('Update record', () => {
        cy.updateRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
