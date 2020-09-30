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
            cy.server()
            cy.route('GET', 'https://localhost:5002/api/routes', 'fixture:routes.json').as('getRoutes')
            cy.wait('@getRoutes').its('status').should('eq', 200)
        })

        it('Select a route from the dropdown', () => {
            cy.get('[data-cy=routeSelect]').click()
            cy.get('[data-cy=routeElement]').contains('KAVOS').click();
        })

        it('The table should have sixty-nine rows', () => {
            cy.get('[data-cy=row]').should('have.length', 69)
        })

        it('The table should have six columns', () => {
            cy.get('[data-cy=header]').should('have.length', 6)
        })

        it('Buttons must exist', () => {
            cy.get('[data-cy=goBack]')
            cy.get('[data-cy=searchTerm]')
            cy.get('[data-cy=content]')
            cy.get('[data-cy=new]')
        })

        it('Filter the list by typing in the search box', () => {
            cy.get('[data-cy=searchTerm]').type('corfu')
            cy.get('[data-cy=row]').should(rows => {
                expect(rows).to.have.length(5)
            })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]').should('have.text', '')
            cy.get('[data-cy=row]').should(($tr) => {
                expect($tr).to.have.length(69)
            })
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
