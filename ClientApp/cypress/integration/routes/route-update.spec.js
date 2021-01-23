context('Routes', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoRouteList()
            cy.readRouteRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes/outes.json').as('getRoutes')
            cy.route('PUT', Cypress.config().baseUrl + '/api/routes/19', 'fixture:routes/route.json').as('saveRoute')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveRoute').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/routes')
        })

    })

    after(() => {
        cy.logout()
    })

})