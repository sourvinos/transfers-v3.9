context('Pickup points', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Populate the routes dropdown', () => {
            cy.populateRoutesDropdown()
        })

        it('Select a route from the dropdown', () => {
            cy.selectRouteFromDropdown()
        })

        it('Read record', () => {
            cy.readPickupPointRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
        })

        it('Delete record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('deletePickupPoint')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deletePickupPoint').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    after(() => {
        cy.logout()
    })

})