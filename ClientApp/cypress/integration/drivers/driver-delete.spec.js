context('Drivers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        it('Read record', () => {
            cy.gotoDriverList()
            cy.readDriverRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers/drivers.json').as('getDrivers')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:drivers/driver.json').as('deleteDriver')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteDriver').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
        })

    })

    after(() => {
        cy.logout()
    })

})