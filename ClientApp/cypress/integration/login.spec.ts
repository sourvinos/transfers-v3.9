context('Login page', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    describe('Field validation', () => {
        it.only('Should disable the login button if username is empty', () => {
            cy.get('#userName').clear()
            cy.get('#login').should('be.disabled')
        })

        it('Should disable the login button if password is empty', () => {
            cy.get('#password').clear()
            cy.get('#login').should('be.disabled')
        })

    })

    describe('Login button', () => {

        it('Should display message if incorrect credentials are typed', () => {
            cy.get('#userName').clear().type('wrongUser')
            cy.get('#password').clear().type('wrongPassword')
            cy.get('#notRobot').click()
            cy.get('#login').click()
            cy.get('.mat-snack-bar-container')
        })

        it('Should login if correct credentials are typed', () => {
            cy.get('#userName').clear().type('sourvinos')
            cy.get('#password').clear().type('1234567890')
            cy.get('#notRobot').click()
            cy.get('#login').click()
            cy.url().should('eq', 'https://localhost:5001/')
        })

    })

    describe('Forgot password button', () => {
        it('Should navigate to correct url when clicked', () => {
            cy.get('#forgotPassword').click()
            cy.url().should('eq', 'https://localhost:5001/forgotPassword')
        })
    })

})
