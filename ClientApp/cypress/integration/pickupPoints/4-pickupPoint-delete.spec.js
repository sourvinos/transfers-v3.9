context('Pickup points - Delete', () => {

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

    it('Ask to delete and abort', () => {
        cy.clickOnDeleteAndAbort()
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
    })

    it('Delete record', () => {
        cy.deletePickupPointRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
