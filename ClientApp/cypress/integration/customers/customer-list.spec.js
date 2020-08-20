context('Customer list', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoUrlFromElement('customers', 'customers')
    })

    it('Filter the list by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]')
            .type('corfu')
        cy.get('[data-cy=row]')
            .should(($tr) => {
                expect($tr).to.have.length(14)
            })
    })

    it('Clear the filter when the "X" is clicked', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]')
            .should('have.text', '')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

