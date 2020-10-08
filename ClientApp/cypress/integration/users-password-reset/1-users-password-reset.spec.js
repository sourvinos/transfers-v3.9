context('Users - Password reset', () => {

    it('Goto the form', () => {
        cy.visit('/resetPassword')
    })

    it('New password', () => {
        cy.typeNotGibberish('password', 'abcde123456').elementShouldBeValid('password')
    })

    it('Confirm password', () => {
        cy.typeNotGibberish('confirmPassword', 'abcde123456').elementShouldBeValid('confirmPassword')
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
