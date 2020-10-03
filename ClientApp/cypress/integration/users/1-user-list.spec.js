context('Users', () => {

    // Last revision: Sat 3/10/2020 13:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
        cy.get('[data-cy=users]').click()
        cy.wait('@getUsers').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/users')
    })

    it('The table should have an exact number of rows and columns', () => {
        cy.get('[data-cy=row]').should('have.length', 5)
        cy.get('[data-cy=column]').should('have.length', 6)
    })

    it('Filter the table by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('js')
        cy.get('[data-cy=row]').should(rows => {
            expect(rows).to.have.length(1)
        })
    })

    it('Clear the filter when the "X" is clicked and the table should have the initial number of rows', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(5)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    after(() => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

})