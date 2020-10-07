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
        cy.readDriverRecord()
    })

    it('Update record', () => {
        cy.updateDriverRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

