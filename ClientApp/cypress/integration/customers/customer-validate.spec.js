context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Validate form', () => {

        it('Goto an empty form', () => {
            cy.gotoCustomerList()
            cy.gotoEmptyCustomerForm()
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 6)
            cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
        })

        it('Description is not valid when blank', () => {
            cy.typeRandomChars('description', 0).elementShouldBeInvalid('description')
        })

        it('Description is not valid when too long', () => {
            cy.typeRandomChars('description', 129).elementShouldBeInvalid('description')
        })

        it('Profession is not valid when too long', () => {
            cy.typeRandomChars('profession', 129).elementShouldBeInvalid('profession')
        })

        it('Address is not valid when too long', () => {
            cy.typeRandomChars('address', 129).elementShouldBeInvalid('address')
        })

        it('Phones is not valid when too long', () => {
            cy.typeRandomChars('phones', 129).elementShouldBeInvalid('phones')
        })

        it('Person in charge is not valid when too long', () => {
            cy.typeRandomChars('personInCharge', 129).elementShouldBeInvalid('personInCharge')
        })

        it('Email is not valid', () => {
            cy.typeRandomChars('email', 12).elementShouldBeInvalid('email')
        })

        it('Email is not valid when too long', () => {
            cy.typeRandomChars('email', 129).elementShouldBeInvalid('email')
        })

        it('Mark record as not active', () => {
            cy.get('[data-cy=isActive]').click()
        })

        it('Form should be invalid, save button should be disabled', () => {
            cy.formShouldBeInvalid('form')
            cy.buttonShouldBeDisabled('save')
        })

        it('Choose not to abort when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-abort]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

      })

    after(() => {
        cy.logout()
    })

})