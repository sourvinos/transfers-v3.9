context('Route selection', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Select a route from the list', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto the list from the home page', () => {
            cy.get('[data-cy=pickupPoints]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
        })

        it('Should select the second route from the list', () => {
            cy.get('[data-cy=routeSelect]').click()
            cy.get('[data-cy=routeElement]').contains('KAVOS').click();
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
