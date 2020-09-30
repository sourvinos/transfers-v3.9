context('Route selection', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Select a route from the dropdown', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto the list from the home page', () => {
            cy.get('[data-cy=pickupPoints]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
        })

        it('Select a route from the dropdown', () => {
            cy.get('[data-cy=routeSelect]').click()
            cy.get('[data-cy=routeElement]').contains('KAVOS').click();
        })

        it('Successful attempt to seek a record', () => {
            cy.get('[data-cy=row]:nth-child(1)').dblclick()
        })
    
        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
