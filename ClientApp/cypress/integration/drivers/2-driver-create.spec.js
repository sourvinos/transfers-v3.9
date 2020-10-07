context('Drivers - Create', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDriverListWithSuccess()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
    })

    it('Name is valid', () => {
        cy.typeGibberish('name', 5).elementShouldBeValid('name')
    })

    it('Phones is valid', () => {
        cy.typeGibberish('phones', 12).elementShouldBeValid('phones')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.createDriverRecord()
    })

    it('Goto the list', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
    })

    it('Goto the home page', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

