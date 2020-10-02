context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    describe('Seek a record', () => {

        it('Goto the list from the home page', () => {
            cy.server()
            cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=customers]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        it('Successful attempt to seek a record', () => {
            cy.seekCustomer()
        })

    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

