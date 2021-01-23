context('Pickup points', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Select a route from the dropdown', () => {
            cy.populateRoutesDropdown()
            cy.selectRouteFromDropdown()
        })

        it('Goto an empty form', () => {
            cy.gotoEmptyPickupPointForm()
        })

        it('Populate route description', () => {
            cy.get('[data-cy=routeDescription]').type('NISAKI', { force: true })
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 128).elementShouldBeValid('description')
        })

        it('Exact point is valid', () => {
            cy.typeRandomChars('exactPoint', 128).elementShouldBeValid('exactPoint')
        })

        it('Time is valid', () => {
            cy.get('[data-cy=time').type('18:45' + '{enter}').elementShouldBeValid('time')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints/pickupPoints.json').as('getPickupPoints')
            cy.route('POST', Cypress.config().baseUrl + '/api/pickupPoints', 'fixture:pickupPoints/pickupPoint.json').as('savePickupPoint')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePickupPoint').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    after(() => {
        cy.logout()
    })

})