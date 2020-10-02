context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
        cy.get('[data-cy=customers]').click()
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/customers')
    })

    it('Critical elements should exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('The table should have an exact number of rows', () => {
        cy.get('[data-cy=row]').should('have.length', 141)
    })

    it('The table should have an exact number of columns', () => {
        cy.get('[data-cy=header]').should('have.length', 6)
    })

    it('Filter the table by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('travel')
        cy.get('[data-cy=row]').should(rows => {
            expect(rows).to.have.length(55)
        })
    })

    it('Clear the filter when the "X" is clicked and the table should have the initial number of rows', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(141)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    after(() => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    after(() => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

})