context('Users - Password change', () => {

    describe('Change', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Login', () => {
            cy.login()
            cy.saveLocalStorage()
        })

        it('Goto the list', () => {
            cy.gotoUserList()
        })

        it('Read record', () => {
            cy.readUserRecord()
        })

        it('Goto the change password form', () => {
            cy.get('[data-cy=changePassword]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/changePassword/7bf9acf1-74c2-459c-8366-82f05bfa3e28')
        })

        it('Current password', () => {
            cy.typeRandomChars('currentPassword', 12).elementShouldBeValid('currentPassword')
        })

        it('New password', () => {
            cy.typeNotRandomChars('password', 'abcde123456').elementShouldBeValid('password')
        })

        it('Confirm password', () => {
            cy.typeNotRandomChars('confirmPassword', 'abcde123456').elementShouldBeValid('confirmPassword')
        })

        it('Update', () => {
            cy.server()
            cy.route('POST', Cypress.config().baseUrl + '/api/account/changePassword/', 'fixture:user-change-password.json').as('changePassword')
            cy.get('[data-cy=save]').click()
            cy.wait('@changePassword').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Validate form', () => {

        it('Login', () => {
            cy.login()
            cy.saveLocalStorage()
        })

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto the list', () => {
            cy.gotoUserList()
        })

        it('Read record', () => {
            cy.readUserRecord()
        })

        it('Goto the change password form', () => {
            cy.get('[data-cy=changePassword]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/changePassword/7bf9acf1-74c2-459c-8366-82f05bfa3e28')
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
            cy.get('[data-cy=ok]').click()
            cy.wait('@getUsers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/users')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

        after(() => {
            cy.logout()
        })

    })

})