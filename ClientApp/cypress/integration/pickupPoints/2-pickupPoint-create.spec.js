context('Pickup points - Create', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page and load the routes into the select', () => {
        cy.gotoPickupPointListWithSuccess()
    })

    it('Select a route from the dropdown, find its pickup points and populate the table', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
        cy.get('[data-cy=routeSelect]').click()
        cy.get('[data-cy=routeElement]').contains('NISAKI').click();
        cy.wait('@getPickupPoints').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/new')
    })

    it('Populate route description', () => {
        cy.get('[data-cy=routeDescription]').type('NISAKI', { force: true })
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 128).elementShouldBeValid('description')
    })

    it('Exact point is valid', () => {
        cy.typeGibberish('exactPoint', 128).elementShouldBeValid('exactPoint')
    })

    it('Time is valid', () => {
        cy.get('[data-cy=time').type('18:45' + '{enter}').elementShouldBeValid('time')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.server()
        cy.route('POST', Cypress.config().baseUrl + '/api/pickupPoints', 'fixture:pickupPoint.json').as('savePickupPoint')
        cy.get('[data-cy=save]').click()
        cy.wait('@savePickupPoint').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    it('Goto the list', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
    })

    it('Goto the list', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
    })

    it('Goto the home page', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

