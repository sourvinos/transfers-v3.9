context('New', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(1500)
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.gotoDriverListFromHomePage()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
    })

    it('Fields must exist', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 2)
        cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 2)
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Name is valid', () => {
        cy.typeGibberish('name', 5)
            .elementShouldBeValid('name')
    })

    it('Phones is valid', () => {
        cy.typeGibberish('phones', 12)
            .elementShouldBeValid('phones')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Unable to save and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'https://localhost:5001/api/drivers'
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Save and display a snackbar', () => {
        cy.server()
        cy.route('POST', 'https://localhost:5001/api/drivers', 'fixture:driver.json').as('saveDriver')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveDriver').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    it('Goto the list', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5001/api/drivers', 'fixture:drivers.json').as('getDrivers')
        cy.get('[data-cy=goBack]').click()
        cy.wait('@getDrivers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
    })

})

