context('Drivers - Update', () => {



    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDriverListWithSuccess()
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

