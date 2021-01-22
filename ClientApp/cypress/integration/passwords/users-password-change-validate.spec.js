context('Users - Password change', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        cy.gotoUserList()
        cy.readUserRecord()
        cy.restoreLocalStorage()
    })

    describe('Change', () => {

        it('Goto the change password form', () => {
            cy.get('[data-cy=changePassword]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/8d204972-9982-491e-aeec-7ce2dcbd56c5/changePassword')
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 3)
        })

        it('Current password is blank', () => {
            cy.typeRandomChars('currentPassword', 0).elementShouldBeInvalid('currentPassword')
        })

        it('New password is empty', () => {
            cy.typeRandomChars('password', 0).elementShouldBeInvalid('password')
        })

        it('New password is too short', () => {
            cy.typeNotRandomChars('password', 'abcd').elementShouldBeInvalid('password')
        })

        it('New password is too long', () => {
            cy.typeRandomChars('password', 129).elementShouldBeInvalid('password')
        })

        it('New password contains spaces', () => {
            cy.typeNotRandomChars('password', 'abc def').elementShouldBeInvalid('password')
        })

        it('Confirm password is empty', () => {
            cy.typeRandomChars('confirmPassword', 0).elementShouldBeInvalid('confirmPassword')
        })

        it('Confirm password does not match new password', () => {
            cy.typeNotRandomChars('password', 'abcde12345').elementShouldBeValid('password')
            cy.typeNotRandomChars('confirmPassword', 'abcd e123456').elementShouldBeInvalid('confirmPassword')
        })

        it('Confirm password has errors due to incorrect new password', () => {
            cy.typeNotRandomChars('password', 'abc').elementShouldBeInvalid('password')
            cy.typeNotRandomChars('confirmPassword', 'abc').elementShouldBeInvalid('confirmPassword')
        })

        it('Form should be invalid, save button should be disabled', () => {
            cy.formShouldBeInvalid('form')
            cy.buttonShouldBeDisabled('save')
        })

        it('Ask to abort and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
        })

    })

    after(() => {
        cy.logout()
    })

})