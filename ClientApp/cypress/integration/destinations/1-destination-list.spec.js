context('Destinations', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations.json').as('getDestinations')
        cy.get('[data-cy=destinations]').click()
        cy.wait('@getDestinations').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
    })

    it('Critical elements should exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('The table should have an exact number of rows', () => {
        cy.get('[data-cy=row]').should('have.length', 30)
    })

    it('The table should have an exact number of columns', () => {
        cy.get('[data-cy=header]').should('have.length', 5)
    })

    it('Filter the table by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('paxos')
        cy.get('[data-cy=row]').should(rows => {
            expect(rows).to.have.length(3)
        })
    })

    it('Clear the filter when the "X" is clicked and the table should have the initial number of rows', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(30)
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
