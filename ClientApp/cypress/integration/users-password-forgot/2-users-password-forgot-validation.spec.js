context('Users - Password forgot validation', () => {

    it('Goto the form', () => {
        cy.visit('/login')
            .get('[data-cy=forgotPassword]')
            .click()
    })

    it('Correct number of fields', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 1)
    })

    it('Email is blank', () => {
        cy.typeGibberish('email', 0).elementShouldBeInvalid('email')
    })

    it('Form is invalid', () => {
        cy.formShouldBeInvalid('form')
    })

    it('Submit button is disabled', () => {
        cy.buttonShouldBeDisabled('submit')
    })

})
