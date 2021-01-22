context('Drivers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoDriverList()
            cy.readDriverRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers.json').as('getDrivers')
            cy.route('PUT', Cypress.config().baseUrl + '/api/drivers/1', 'fixture:driver.json').as('saveDriver')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveDriver').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
        })

    })

    after(() => {
        cy.logout()
    })

})