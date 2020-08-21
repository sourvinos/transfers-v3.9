context('Customer list', () => {

    before(() => {
        cy.login()
    })

    it('Goto the customers list from the home page', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            .get('[data-cy=customers]').click()
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
            .wait('@getCustomers').its('status').should('eq', 200)
    })

    it('Filter the list by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]')
            .type('travel')
            .get('[data-cy=row]')
            .should(($tr) => {
                expect($tr).to.have.length(2)
            })
    })

    it('Clear the filter when the "X" is clicked', () => {
        cy.get('[data-cy=clearFilter').click()
            .get('[data-cy=searchTerm]')
            .should('have.text', '')
    })

})

