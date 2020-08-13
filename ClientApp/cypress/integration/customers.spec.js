context('Customers', () => {

    before(() => {
        cy.login()
    })

    it('Should go to the /customers', () => {
        cy.get('#customeronia').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers')
    })

    it('Should have a "Customers" header',()=>{
        cy.get('h1').contains('Customers')
    })

})
