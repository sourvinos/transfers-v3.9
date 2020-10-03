context('Transfers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Search by a given date', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-01-01', 'fixture:transfers.json').as('getTransfers')
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('1/1/2020{enter}')
        cy.get('[data-cy=search]').click()
        cy.wait('@getTransfers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01')
    })

    it('Unselect all drivers', () => {
        cy.get('[data-cy=driversCheckbox]').click()
    })

    it('Select the first driver', () => {
        cy.get('#-').eq(0).click()
    })

    it('Select some rows', () => {
        cy.get('[data-cy=listTab]').click()
        cy.get('#mat-checkbox-6 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
        cy.get('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
        cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '7')
    })

    it('Click the "Assign driver" button', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/drivers/getActive', 'fixture:drivers-active.json').as('getDrivers')
        cy.get('[data-cy=assignDriver]').click()
        cy.get('[data-cy=driverSelect]').click()
        cy.get('[data-cy=driverElement]').contains('STAMATIS!').click();
        cy.server()
        cy.route('PATCH', Cypress.config().baseUrl + '/api/transfers/assignDriver?driverId=1&id=587&id=590','fixture:transfers-assign-driver.json').as('assignDriver')
        cy.get('[data-cy=continue]').click()
        cy.wait('@assignDriver').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
