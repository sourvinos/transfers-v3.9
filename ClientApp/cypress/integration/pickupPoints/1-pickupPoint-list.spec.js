context('Pickup points', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page and load the routes into the select', () => {
        cy.getRoutes()
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

    it('Critical elements should exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('The table should have an exact number of rows', () => {
        cy.get('[data-cy=row]').should('have.length', 203)
    })

    it('The table should have an exact number of columns', () => {
        cy.get('[data-cy=header]').should('have.length', 6)
    })

    it('Filter the table by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('mare')
        cy.get('[data-cy=row]').should(rows => {
            expect(rows).to.have.length(2)
        })
    })

    it('Clear the filter when the "X" is clicked and the table should have the initial number of rows', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(203)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    after(() => {
        cy.getRoutes()
        cy.get('[data-cy=goBack]').click()
        cy.wait('@getRoutes').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
    })

})
