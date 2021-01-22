context('Routes', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        it('Read record', () => {
            cy.gotoRouteList()
            cy.readRouteRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/routes/19')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/routes/19', 'fixture:route.json').as('deleteRoute')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteRoute').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/routes')
        })

    })

    after(() => {
        cy.logout()
    })

})