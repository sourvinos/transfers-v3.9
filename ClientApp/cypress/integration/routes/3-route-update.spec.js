context('Routes - Update', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoRouteListWithSuccess()
    })

    it('Read record', () => {
        cy.readRouteRecord()
    })
    
    it('Update record', () => {
        cy.updateRouteRecord()
        cy.pause()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
