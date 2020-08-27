context('Seek', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.gotoCustomerListFromHomePage()
    })

    it('Unsuccessful attempt to seek a record', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: 'https://localhost:5001/api/customers/155',
            status: 404,
            response: { error: 'ERROR!' }
        }).as('getCustomer')
        cy.get('[data-cy=row]:nth-child(1)').dblclick()
        cy.wait('@getCustomer').its('status').should('eq', 404)
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

