context('Login', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Should go to the login', () => {
        cy.visit('/login')
        cy.get('h1').should('contain', 'Login')
        cy.get('h1').should('be.visible')
        cy.get('#login').should('be.visible')
        cy.get('#login').click()
    })

})
