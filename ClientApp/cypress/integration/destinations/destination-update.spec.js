context('Destinations', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoDestinationList()
            cy.readDestinationRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations/destinations.json').as('getDestinations')
            cy.route('PUT', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destinations/destination.json').as('saveDestination')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveDestination').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
        })

    })

    after(() => {
        cy.logout()
    })

})