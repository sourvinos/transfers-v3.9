context('Login page', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it.only('Should disable the login button if username is empty', () => {
        cy.get(`input[formcontrolname="userName"]`).clear()
        cy.get('#login').should('be.disabled')
    })

    it('Should disable the login button if password is empty', () => {
        cy.get('#password').clear()
        cy.get('#login').should('be.disabled')
    })

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
