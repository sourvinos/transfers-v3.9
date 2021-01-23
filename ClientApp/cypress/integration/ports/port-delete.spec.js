context('Ports', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Delete', () => {

        it('Read record', () => {
            cy.gotoPortList()
            cy.readPortRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/ports/1')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports/ports.json').as('getPorts')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/ports/1', 'fixture:ports/port.json').as('deletePort')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deletePort').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/ports')
        })

    })

    after(() => {
        cy.logout()
    })

})