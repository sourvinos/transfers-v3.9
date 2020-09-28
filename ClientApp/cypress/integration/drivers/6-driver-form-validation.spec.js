context('Form validation', () => {

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

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
    })

    it('Name is not valid when blank', () => {
        cy.typeGibberish('name', 0)
            .elementShouldBeInvalid('name')
    })

    it('Name is not valid when too long', () => {
        cy.typeGibberish('name', 129)
            .elementShouldBeInvalid('name')
    })

    it('Phones is not valid when too long', () => {
        cy.typeGibberish('phones', 129)
            .elementShouldBeInvalid('phones')
    })

    it('Mark record as not active', () => {
        cy.get('[data-cy=isActive]').click()
    })

    it('Form should be invalid, save button should be disabled',()=>{
        cy.elementShouldBeInvalid('form')
        cy.buttonShouldBeDisabled('save')
    })

    it('Choose not to abort when the back icon is clicked', () => {
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
    })

    it('Choose to abort when the back icon is clicked', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5002/api/drivers', 'fixture:drivers.json').as('getDrivers')
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@getDrivers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'drivers')
    })

})
