context('Seek', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Successful attempt to search by a given date', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        cy.searchTransfersWithSuccess()
    })

    it('Unsuccessful attempt to edit the second row', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: 'https://localhost:5001/api/transfers/1',
            status: 404,
            response: { error: 'ERROR!' }
        }).as('getTransfer')
        cy.get('[data-cy=row]:nth-child(1)').dblclick()
        cy.wait('@getTransfer').its('status').should('eq', 404)
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

