context('Destination - Update', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDestinationListWithSuccess()
    })

    it('Read record', () => {
        cy.readDestinationRecord()
    })

    it('Update record', () => {
        cy.updateDestinationRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

