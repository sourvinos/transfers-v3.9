context('New', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoCustomerListFromHomePage()
    })

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Elements must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12)
            .elementShouldBeValid('description')
            .elementShouldBeValid('form')
            .buttonShouldBeEnabled('save')
    })

    it('Unable to save and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'https://localhost:5001/api/customers'
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]').children('div').should('have.text', 'This record could not be saved.')
    })

    it('Save and display a snackbar', () => {
        cy.pause()
        cy.server()
        cy.route('POST', 'https://localhost:5001/api/customers', 'fixture:customer.json').as('saveCustomer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveCustomer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]').children('div').should('have.text', 'A new record was created.')
    })

    it('Goto the customer list', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=goBack]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

})

