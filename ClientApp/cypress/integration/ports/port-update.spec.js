context('Ports', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoPortList()
            cy.readPortRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports/ports.json').as('getPorts')
            cy.route('PUT', Cypress.config().baseUrl + '/api/ports/1', 'fixture:ports/port.json').as('savePort')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePort').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/ports')
        })

    })

    after(() => {
        cy.logout()
    })

})