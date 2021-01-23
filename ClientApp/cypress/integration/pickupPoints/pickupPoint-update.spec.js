context('Pickup points', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

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

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints/pickupPoints.json').as('getPickupPoints')
            cy.route('PUT', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoints/pickupPoint.json').as('savePickupPoint')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePickupPoint').its('status').should('eq', 200)
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
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