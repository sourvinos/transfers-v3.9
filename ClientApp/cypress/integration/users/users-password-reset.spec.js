context('Users - Password reset', () => {

    describe('Reset password', () => {

        it('Goto the form', () => {
            cy.visit('/resetPassword')
        })

        it('New password', () => {
            cy.typeNotRandomChars('password', 'abcde123456').elementShouldBeValid('password')
        })

        it('Confirm password', () => {
            cy.typeNotRandomChars('confirmPassword', 'abcde123456').elementShouldBeValid('confirmPassword')
        })

        it('Form is valid', () => {
            cy.formShouldBeValid('form')
        })

        it('Submit the form and display a snackbar', () => {
            cy.server()
            cy.route('POST', Cypress.config().baseUrl + '/api/account/resetPassword', 'fixture:user-forgot-password.json').as('submitForm')
            cy.get('[data-cy=save]').click()
            cy.wait('@submitForm').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
        })

    })

    describe('Validate form', () => {

        it('Goto the form', () => {
            cy.visit('/resetPassword')
        })
    
        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 2)
        })
    
        it('Password is empty', () => {
            cy.typeRandomChars('password', 0).elementShouldBeInvalid('password')
        })
    
        it('Password is too short', () => {
            cy.typeNotRandomChars('password', 'abcd').elementShouldBeInvalid('password')
        })
    
        it('Password is too long', () => {
            cy.typeRandomChars('password', 129).elementShouldBeInvalid('password')
        })
    
        it('Password contains spaces', () => {
            cy.typeNotRandomChars('password', 'abc def').elementShouldBeInvalid('password')
        })
    
        it('Confirm password is empty', () => {
            cy.typeRandomChars('confirmPassword', 0).elementShouldBeInvalid('confirmPassword')
        })
    
        it('Confirm password does not match password', () => {
            cy.typeNotRandomChars('password', 'abcde12345').elementShouldBeValid('password')
            cy.typeNotRandomChars('confirmPassword', 'abcd e123456').elementShouldBeInvalid('confirmPassword')
        })
    
        it('Confirm password has errors due to incorrect password', () => {
            cy.typeNotRandomChars('password', 'abc').elementShouldBeInvalid('password')
            cy.typeNotRandomChars('confirmPassword', 'abc').elementShouldBeInvalid('confirmPassword')
        })
    
        it('Form should be invalid', () => {
            cy.formShouldBeInvalid('form')
        })
    
        it('Save button should be disabled', () => {
            cy.buttonShouldBeDisabled('save')
        })
    
    })

})
