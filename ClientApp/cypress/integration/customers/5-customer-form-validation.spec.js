context('Customers - Form validation', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Correct number of fields', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 6)
        cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
    })

    it('Name is not valid when blank', () => {
        cy.typeGibberish('name', 0)
            .elementShouldBeInvalid('name')
    })

    it('Description is not valid when too long', () => {
        cy.typeGibberish('name', 129)
            .elementShouldBeInvalid('name')
    })

    it('Profession is not valid when too long', () => {
        cy.typeGibberish('profession', 129)
            .elementShouldBeInvalid('profession')
    })

    it('Address is not valid when too long', () => {
        cy.typeGibberish('address', 129)
            .elementShouldBeInvalid('address')
    })

    it('Phones is not valid when too long', () => {
        cy.typeGibberish('phones', 129)
            .elementShouldBeInvalid('phones')
    })

    it('Person in charge is not valid when too long', () => {
        cy.typeGibberish('personInCharge', 129)
            .elementShouldBeInvalid('personInCharge')
    })

    it('Email is not valid', () => {
        cy.typeGibberish('email', 12)
            .elementShouldBeInvalid('email')
    })

    it('Email is not valid when too long', () => {
        cy.typeGibberish('email', 129)
            .elementShouldBeInvalid('email')
    })

    it('Mark record as not active', () => {
        cy.get('[data-cy=isActive]').click()
    })

    it('Form should be invalid, save button should be disabled', () => {
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
        cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/customers')
    })

})
