context('Users', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        cy.gotoUserList()
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('The table should have an exact number of rows and columns', () => {
            cy.get('[data-cy=row]').should('have.length', 2)
            cy.get('[data-cy=column]').should('have.length', 6)
        })

        it('Filter the table by typing in the search box', () => {
            cy.wait(500)
            cy.get('[data-cy=searchTerm]').type('sourvinos')
            cy.get('[data-cy=row]').should(rows => {
                expect(rows).to.have.length(1)
            })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]').should('have.text', '')
            cy.get('[data-cy=row]').should((rows) => {
                expect(rows).to.have.length(2)
            })
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Create', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto an empty form', () => {
            cy.gotoEmptyUserForm()
        })

        it('Username is valid', () => {
            cy.typeRandomChars('userName', 12).elementShouldBeValid('userName')
        })

        it('Display name is valid', () => {
            cy.typeRandomChars('displayName', 12).elementShouldBeValid('displayName')
        })

        it('Email is valid', () => {
            cy.typeNotRandomChars('email', 'user@outlook.com').elementShouldBeValid('email')
        })

        it('Password is valid', () => {
            cy.typeNotRandomChars('password', '1234567890').elementShouldBeValid('password')
        })

        it('Confirm password is valid', () => {
            cy.typeNotRandomChars('confirmPassword', '1234567890').elementShouldBeValid('confirmPassword')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create and display a snackbar', () => {
            cy.server()
            cy.route('POST', Cypress.config().baseUrl + '/api/account/register', 'fixture:user.json').as('saveUser')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveUser').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
        })

        it('Go back to the list', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.get('[data-cy=goBack]').click()
            cy.wait('@getUsers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/users')
        })

    })

    describe('Update', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Read record', () => {
            cy.readUserRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.route('PUT', Cypress.config().baseUrl + '/api/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28', 'fixture:user.json').as('saveUser')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveUser').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.wait('@getUsers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/users')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Delete', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Read record', () => {
            cy.readUserRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/8d204972-9982-491e-aeec-7ce2dcbd56c5')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/users/8d204972-9982-491e-aeec-7ce2dcbd56c5', 'fixture:user.json').as('deleteUser')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteUser').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/users')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe.only('Validate form', () => {

        it('Goto an empty form', () => {
            cy.gotoEmptyUserForm()
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 5)
            cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
        })

        it('Username is blank', () => {
            cy.typeRandomChars('userName', 0).elementShouldBeInvalid('userName')
        })

        it('Username is too long', () => {
            cy.typeRandomChars('userName', 33).elementShouldBeInvalid('userName')
        })

        it('Username contains spaces', () => {
            cy.typeNotRandomChars('userName', 'abc def').elementShouldBeInvalid('userName')
        })

        it('Display name is blank', () => {
            cy.typeRandomChars('displayName', 0).elementShouldBeInvalid('displayName')
        })

        it('Display name is too long', () => {
            cy.typeRandomChars('displayName', 33).elementShouldBeInvalid('displayName')
        })

        it('Email is empty', () => {
            cy.typeRandomChars('email', 0).elementShouldBeInvalid('email')
        })

        it('Email is too long', () => {
            cy.typeRandomChars('email', 129).elementShouldBeInvalid('email')
        })

        it('Email is not valid', () => {
            cy.typeRandomChars('email', 12).elementShouldBeInvalid('email')
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

        it('Mark user as admin', () => {
            cy.get('[data-cy=isAdmin]').click()
        })

        it('Choose not to abort when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-abort]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/users/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@getUsers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/users')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})