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
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
        cy.get('[data-cy=routeSelect]').click()
        cy.get('[data-cy=routeElement]').contains('NISAKI').click();
        cy.wait('@getPickupPoints').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
    })

    it('Read record', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('getPickupPoint')
        cy.get('[data-cy=row]').contains('KAMINAKI').dblclick({ force: true })
        cy.wait('@getPickupPoint').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
    })

    it('Delete record', () => {
        cy.server()
        cy.route('DELETE', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('deletePickupPoint')
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@deletePickupPoint').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
