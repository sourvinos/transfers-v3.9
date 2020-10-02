context('Delete', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(1500)
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.gotoDriverListFromHomePage()
    })

    it('Successful attempt to seek a record', () => {
        cy.seekDriver()
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
    })

    it('Unable to delete and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'DELETE',
            url: 'https://localhost:5001/api/drivers/1',
            status: 400,
            response: { error: 'Dummy response' },
            delay: 500
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Ask to delete, accept and display a snackbar', () => {
        cy.server()
        cy.route('DELETE', 'https://localhost:5001/api/drivers/1', 'fixture:driver.json').as('deleteDriver')
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@deleteDriver').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

