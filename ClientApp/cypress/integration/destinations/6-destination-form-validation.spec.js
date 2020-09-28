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
        cy.gotoDestinationListFromHomePage()
    })

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations/new')
    })

    it('Abbreviation is not valid when blank', () => {
        cy.typeGibberish('abbreviation', 0)
            .elementShouldBeInvalid('abbreviation')
    })

    it('Abbreviation is not valid when too long', () => {
        cy.typeGibberish('abbreviation', 6)
            .elementShouldBeInvalid('abbreviation')
    })

    it('Description is not valid when blank', () => {
        cy.typeGibberish('description', 0)
            .elementShouldBeInvalid('description')
    })

    it('Description is not valid when too long', () => {
        cy.typeGibberish('description', 129)
            .elementShouldBeInvalid('description')
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
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Choose to abort when the back icon is clicked', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5002/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

})
