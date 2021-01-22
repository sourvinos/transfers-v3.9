context('Users - Password change', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        cy.gotoUserList()
        cy.readUserRecord()
    })

    describe('Change', () => {

        it('Goto the change password form', () => {
            cy.get('[data-cy=changePassword]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/8d204972-9982-491e-aeec-7ce2dcbd56c5/changePassword')
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

    })

    after(() => {
        cy.logout()
    })

})