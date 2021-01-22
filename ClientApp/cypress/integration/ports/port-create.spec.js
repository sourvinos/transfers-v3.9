context('Ports', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        it('Goto an empty form', () => {
            cy.gotoPortList()
            cy.gotoEmptyPortForm()
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 12).elementShouldBeValid('description')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports.json').as('getPorts')
            cy.route('POST', Cypress.config().baseUrl + '/api/ports', 'fixture:port.json').as('savePort')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePort').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/ports')
        })

    })

    after(() => {
        cy.logout()
    })

})