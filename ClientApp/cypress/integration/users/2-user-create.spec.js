context('Users - Create', () => {

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

    it('Username is valid', () => {
        cy.typeGibberish('userName', 12).elementShouldBeValid('userName')
    })

    it('Display name is valid', () => {
        cy.typeGibberish('displayName', 12).elementShouldBeValid('displayName')
    })

    it('Email is valid', () => {
        cy.typeNotGibberish('email', 'user@outlook.com').elementShouldBeValid('email')
    })

    it('Password is valid',()=>{
        cy.typeNotGibberish('password', '1234567890').elementShouldBeValid('password')
    })

    it('Confirm password is valid',()=>{
        cy.typeNotGibberish('confirmPassword', '1234567890').elementShouldBeValid('confirmPassword')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.createUserRecord()
    })

    it('Goto the home page', () => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

