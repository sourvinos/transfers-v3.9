context('Users - Password forgot', () => {

    describe('Request password reset link', () => {

        it('Goto the form', () => {
            cy.visit('/login').get('[data-cy=forgotPassword]').click()
        })

        it('Email is valid', () => {
            cy.typeNotRandomChars('email', 'george@outlook.com').elementShouldBeValid('email')
        })

        it('Form is Valid', () => {
            cy.formShouldBeValid('form')
        })

        it('Submit the form and display a snackbar', () => {
            cy.server()
            cy.route('POST', Cypress.config().baseUrl + '/api/account/forgotPassword', 'fixture:user-forgot-password.json').as('submitForm')
            cy.get('[data-cy=submit]').click()
            cy.wait('@submitForm').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
        })

    })

    describe('Validate form', () => {

        it('Goto the form', () => {
            cy.visit('/login').get('[data-cy=forgotPassword]').click()
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 1)
        })

        it('Email is blank', () => {
            cy.typeRandomChars('email', 0).elementShouldBeInvalid('email')
        })

        it('Form is invalid', () => {
            cy.formShouldBeInvalid('form')
        })

        it('Submit button is disabled', () => {
            cy.buttonShouldBeDisabled('submit')
        })

    })

})
