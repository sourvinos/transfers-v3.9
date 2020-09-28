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
        cy.gotoCustomerListFromHomePage()
    })

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Fields must exist', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 6)
        cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12)
            .elementShouldBeValid('description')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Unable to save and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'https://localhost:5002/api/customers'
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Save and display a snackbar', () => {
        cy.server()
        cy.route('POST', 'https://localhost:5002/api/customers', 'fixture:customer.json').as('saveCustomer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveCustomer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    it('Goto the list', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5002/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=goBack]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

})

