context('List', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.visit('customers')
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('Filter the list by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('travel')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(24)
        })
    })

    it('Clear the filter when the "X" is clicked', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should((rows) => {
            expect(rows).to.have.length(94)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

