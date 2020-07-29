describe('TestB', () => {

    before(() => {
        cy.clearLocalStorageSnapshot()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Customers', () => {
        cy.visit('/customers')
        cy.setLocalStorage('displayName', 'John')
        cy.getLocalStorage('displayName').should("equal", "John")
        // cy.url().should('eq', 'https://localhost:5001/customers')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})