context('Users - Password change validation', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoUserListWithSuccess()
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
        cy.typeGibberish('currentPassword', 0).elementShouldBeInvalid('currentPassword')
    })

    it('New password is empty', () => {
        cy.typeGibberish('newPassword', 0).elementShouldBeInvalid('newPassword')
    })

    it('New password is too short', () => {
        cy.typeNotGibberish('newPassword', 'abcd').elementShouldBeInvalid('newPassword')
    })

    it('New password is too long', () => {
        cy.typeGibberish('newPassword', 129).elementShouldBeInvalid('newPassword')
    })

    it('New password contains spaces', () => {
        cy.typeNotGibberish('newPassword', 'abc def').elementShouldBeInvalid('newPassword')
    })

    it('Confirm password is empty', () => {
        cy.typeGibberish('confirmPassword', 0).elementShouldBeInvalid('confirmPassword')
    })

    it('Confirm password does not match new password', () => {
        cy.typeNotGibberish('newPassword', 'abcde12345').elementShouldBeValid('newPassword')
        cy.typeNotGibberish('confirmPassword', 'abcd e123456').elementShouldBeInvalid('confirmPassword')
    })

    it('Confirm password has errors due to incorrect new password', () => {
        cy.typeNotGibberish('newPassword', 'abc').elementShouldBeInvalid('newPassword')
        cy.typeNotGibberish('confirmPassword', 'abc').elementShouldBeInvalid('confirmPassword')
    })

    it('Form should be invalid, save button should be disabled', () => {
        cy.formShouldBeInvalid('form')
        cy.buttonShouldBeDisabled('save')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})