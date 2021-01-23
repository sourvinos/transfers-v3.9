context('Destinations', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        it('Read record', () => {
            cy.gotoDestinationList()
            cy.readDestinationRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/destinations/2')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations/destinations.json').as('getDestinations')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/destinations/2', 'fixture:destinations/destination.json').as('deleteDestination')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteDestination').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
        })

    })

    after(() => {
        cy.logout()
    })

})