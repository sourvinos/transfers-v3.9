describe('New customer with save', () => {

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Login', () => {
        cy.login()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoUrlFromElement('customers', 'customers')
    })

    it('Go to an empty form', () => {
        cy.gotoUrlFromElement('customers/new', 'new')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12)
            .elementShouldBeValid('description')
            .elementShouldBeValid('form')
            .buttonShouldBeEnabled('save')
    })

    it('Save and display a snackbar', () => {
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Goto the customer list', () => {
        cy.get('[data-cy="goBack"]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

