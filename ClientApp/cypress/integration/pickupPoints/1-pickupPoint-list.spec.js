context('Pickup points', () => {

    // Last revision: Sat 3/10/2020 13:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page and load the routes into the select', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/routes/getActive', 'fixture:routes.json').as('getRoutes')
        cy.get('[data-cy=pickupPoints]').click()
        cy.wait('@getRoutes').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
    })

    it('Select a route from the dropdown, find its pickup points and populate the table', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
        cy.get('[data-cy=routeSelect]').click()
        cy.get('[data-cy=routeElement]').contains('NISAKI').click();
        cy.wait('@getPickupPoints').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
    })

    it('The table should have an exact number of rows and columns', () => {
        cy.get('[data-cy=row]').should('have.length', 10)
        cy.get('[data-cy=column]').should('have.length', 6)
    })

    it('Filter the table by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('mare')
        cy.get('[data-cy=row]').should(rows => {
            expect(rows).to.have.length(1)
        })
    })

    it('Clear the filter when the "X" is clicked and the table should have the initial number of rows', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(10)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
