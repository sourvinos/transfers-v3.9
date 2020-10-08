context('Users - Form validation', () => {

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

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/users/new')
    })

    it('Correct number of fields', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 5)
    })

    it('Username is blank', () => {
        cy.typeGibberish('userName', 0).elementShouldBeInvalid('userName')
    })

    it('Username is too long', () => {
        cy.typeGibberish('userName', 33).elementShouldBeInvalid('userName')
    })

    it('Username contains spaces', () => {
        cy.typeNotGibberish('userName', 'abc def').elementShouldBeInvalid('userName')
    })

    it('Display name is blank', () => {
        cy.typeGibberish('displayName', 0).elementShouldBeInvalid('displayName')
    })

    it('Display name is too long', () => {
        cy.typeGibberish('displayName', 33).elementShouldBeInvalid('displayName')
    })

    it('Email is empty', () => {
        cy.typeGibberish('email', 0).elementShouldBeInvalid('email')
    })

    it('Email is too long', () => {
        cy.typeGibberish('email', 129).elementShouldBeInvalid('email')
    })

    it('Email is not valid', () => {
        cy.typeGibberish('email', 12).elementShouldBeInvalid('email')
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

    it('Choose not to abort when the back icon is clicked', () => {
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/users/new')
    })

    it('Choose to abort when the back icon is clicked', () => {
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

})

