context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('List', () => {

        it('Goto the list', () => {
            cy.gotoCustomerList()
        })

        it('The table has an exact number of rows and columns', () => {
            cy.get('[data-cy=row]').should('have.length', 10)
            cy.get('[data-cy=column]').should('have.length', 6)
        })

        it('Filter the table by typing in the search box', () => {
            cy.wait(500)
            cy.get('[data-cy=searchTerm]').type('travel')
            cy.get('[data-cy=row]').should(rows => {
                expect(rows).to.have.length(3)
            })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]').should('have.text', '')
            cy.get('[data-cy=row]').should((rows) => {
                expect(rows).to.have.length(10)
            })
        })

    })

    after(() => {
        cy.logout()
    })

})