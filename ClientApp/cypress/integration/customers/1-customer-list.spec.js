context('Customer list', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Unsuccessful attempt to go to the list from the home page', () => {
        cy.gotoCustomerListWithError()
    })

    it('Successful attempt to go to the list from the home page', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('Filter the list by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]')
            .type('travel')
        cy.get('[data-cy=row]').should(($tr) => {
            expect($tr).to.have.length(24)
        })
    })

    it('Clear the filter when the "X" is clicked', () => {
        cy.get('[data-cy=clearFilter').click()
        cy.get('[data-cy=searchTerm]').should('have.text', '')
        cy.get('[data-cy=row]').should(($tr) => {
            expect($tr).to.have.length(94)
        })
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

