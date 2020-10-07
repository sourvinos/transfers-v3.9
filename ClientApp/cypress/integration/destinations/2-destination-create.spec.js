context('Destinations - Create', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoDestinationListWithSuccess()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations/new')
    })

    it('Abbreviation is valid', () => {
        cy.typeGibberish('abbreviation', 5).elementShouldBeValid('abbreviation')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 128).elementShouldBeValid('description')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.createDestinationRecord()
    })

    it('Goto the list', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
    })

    it('Goto the home page', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})