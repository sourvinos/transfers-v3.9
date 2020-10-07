context('Ports - Update', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoPortListWithSuccess()
    })

    it('Read record', () => {
        cy.readPortRecord()
    })

    it('Update record', () => {
        cy.updatePortRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
