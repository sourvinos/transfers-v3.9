context('List', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Unsuccessful attempt to go to the list from the home page', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: 'https://localhost:5001/api/customers',
            status: 404,
            response: { error: 'ERROR!' }
        }).as('getCustomers')
        cy.get('[data-cy=customers]').click()
        cy.wait('@getCustomers').its('status').should('eq', 404)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
        cy.get('[data-cy=customSnackbar]').children('div').should('have.text', 'There is no contact with the server.')
        cy.get('[data-cy=goBack').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('Successful attempt to go to the list from the home page', () => {
        cy.gotoCustomerListFromHomePage()
    })

    it('Elements must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=searchTerm]')
        cy.get('[data-cy=content]')
        cy.get('[data-cy=new]')
    })

    it('Filter the list by typing in the search box', () => {
        cy.get('[data-cy=searchTerm]').type('travel')
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
        cy.pause()
    })

})

