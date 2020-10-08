context('Users - Password forgot validation', () => {

    it('Goto the form', () => {
        cy.visit('/login')
            .get('[data-cy=forgotPassword]')
            .click()
    })

    it('Email is valid', () => {
        cy.typeNotGibberish('email', 'george@outlook.com').elementShouldBeValid('email')
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
