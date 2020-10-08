context('Users - Password change', () => {

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

    it('Current password', () => {
        cy.typeGibberish('currentPassword', 12).elementShouldBeValid('currentPassword')
    })

    it('New password', () => {
        cy.typeNotGibberish('newPassword', 'abcde123456').elementShouldBeValid('newPassword')
    })

    it('Confirm password', () => {
        cy.typeNotGibberish('confirmPassword', 'abcde123456').elementShouldBeValid('confirmPassword')
    })

    it('Update', () => {
        cy.server()
        cy.route('POST', Cypress.config().baseUrl + '/api/account/changePassword/', 'fixture:user-changePassword.json').as('changePassword')
        cy.get('[data-cy=save]').click()
        cy.wait('@changePassword').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})