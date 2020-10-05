context('Customers - Edit', () => {



    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list with failure', () => {
        cy.gotoListWithFailure()
    })

    it.only('Goto the list', () => {
        cy.gotoList()
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
