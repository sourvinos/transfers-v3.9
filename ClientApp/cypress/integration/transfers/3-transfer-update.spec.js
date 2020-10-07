context('Edit', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Successful attempt to search by a given date', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        cy.searchTransfersWithSuccess()
    })

    it('Successful attempt to seek the first row', () => {
        cy.get('#listTab').click()
        cy.seekTransferWithSuccess()
    })

    it('Update and display a snackbar', () => {
        cy.server()
        cy.route('PUT', 'https://localhost:5001/api/transfers/587', 'fixture:transfer.json').as('saveTransfer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveTransfer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

