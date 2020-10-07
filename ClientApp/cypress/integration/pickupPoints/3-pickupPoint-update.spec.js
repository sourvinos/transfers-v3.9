context('Pickup points - update', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page and load the routes into the select', () => {
        cy.gotoPickupPointListWithSuccess()
    })

    it('Select a route from the dropdown, find its pickup points and populate the table', () => {
        cy.getPickupPointsForSelectedRoute()
    })

    it('Read record', () => {
        cy.readPickupPointRecord()        
    })

    it('Update record', () => {
        cy.updatePickupPointRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
