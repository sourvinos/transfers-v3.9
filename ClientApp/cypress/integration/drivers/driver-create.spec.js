context('Drivers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        it('Goto an empty form', () => {
            cy.gotoDriverList()
            cy.gotoEmptyDriverForm()
        })

        it('Name is valid', () => {
            cy.typeRandomChars('description', 5).elementShouldBeValid('description')
        })

        it('Phone is valid', () => {
            cy.typeRandomChars('phones', 5).elementShouldBeValid('phones')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers.json').as('getDrivers')
            cy.route('POST', Cypress.config().baseUrl + '/api/drivers', 'fixture:driver.json').as('saveDriver')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveDriver').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
        })

    })

    after(() => {
        cy.logout()
    })

})