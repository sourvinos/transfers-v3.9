context('Transfers', () => {

    before(() => {
        cy.visit('/')
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Should login', () => {
            cy.url().should('eq', Cypress.config().baseUrl + '/login')
            cy.get('#login').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/')
        })

        it('Should go to the transfers list', () => {
            cy.get('[data-cy=transfers]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
