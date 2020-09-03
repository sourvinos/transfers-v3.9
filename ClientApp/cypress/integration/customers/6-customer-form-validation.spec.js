context('Form validation', () => {

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

    it('Description is not valid when blank', () => {
        cy.typeGibberish('description', 0)
            .elementShouldBeInvalid('description')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Description is not valid when too long', () => {
        cy.typeGibberish('description', 129)
            .elementShouldBeInvalid('description')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Profession is not valid when too long', () => {
        cy.typeGibberish('profession', 129)
            .elementShouldBeInvalid('profession')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Address is not valid when too long', () => {
        cy.typeGibberish('address', 129)
            .elementShouldBeInvalid('address')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Phones is not valid when too long', () => {
        cy.typeGibberish('phones', 129)
            .elementShouldBeInvalid('phones')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Person in charge is not valid when too long', () => {
        cy.typeGibberish('personInCharge', 129)
            .elementShouldBeInvalid('personInCharge')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Email is not valid', () => {
        cy.typeGibberish('email', 12)
            .elementShouldBeInvalid('email')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Email is not valid when too long', () => {
        cy.typeGibberish('email', 129)
            .elementShouldBeInvalid('email')
            .elementShouldBeInvalid('form')
            .buttonShouldBeDisabled('save')
    })

    it('Mark record as not active', () => {
        cy.get('[data-cy=isActive]').click()
    })

    it('Choose not to abort when the back icon is clicked', () => {
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=cancel]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Choose to abort when the back icon is clicked', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

})