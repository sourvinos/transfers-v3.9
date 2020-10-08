context('Users - Password reset validation', () => {

    it('Goto the form', () => {
        cy.visit('/resetPassword')
    })

    it('Correct number of fields', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 2)
    })

    it('Password is empty', () => {
        cy.typeGibberish('password', 0).elementShouldBeInvalid('password')
    })

    it('Password is too short', () => {
        cy.typeNotGibberish('password', 'abcd').elementShouldBeInvalid('password')
    })

    it('Password is too long', () => {
        cy.typeGibberish('password', 129).elementShouldBeInvalid('password')
    })

    it('Password contains spaces', () => {
        cy.typeNotGibberish('password', 'abc def').elementShouldBeInvalid('password')
    })

    it('Confirm password is empty', () => {
        cy.typeGibberish('confirmPassword', 0).elementShouldBeInvalid('confirmPassword')
    })

    it('Confirm password does not match password', () => {
        cy.typeNotGibberish('password', 'abcde12345').elementShouldBeValid('password')
        cy.typeNotGibberish('confirmPassword', 'abcd e123456').elementShouldBeInvalid('confirmPassword')
    })

    it('Confirm password has errors due to incorrect password', () => {
        cy.typeNotGibberish('password', 'abc').elementShouldBeInvalid('password')
        cy.typeNotGibberish('confirmPassword', 'abc').elementShouldBeInvalid('confirmPassword')
    })

    it('Form should be invalid', () => {
        cy.formShouldBeInvalid('form')
    })

    it('Save button should be disabled', () => {
        cy.buttonShouldBeDisabled('save')
    })

})
