context('Routes', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        it('Goto an empty form', () => {
            cy.gotoRouteList()
            cy.gotoEmptyRouteForm()
        })

        it('Abbreviation is valid', () => {
            cy.typeRandomChars('abbreviation', 5).elementShouldBeValid('abbreviation')
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 25).elementShouldBeValid('description')
        })

        it('Port is valid', () => {
            cy.typeNotRandomChars('portDescription', 'corfu').then(() => {
                cy.get('#dialog').within(() => {
                    cy.get('input[type=text]')
                        .type('{enter}', { force: true })
                })
            })
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
            cy.route('POST', Cypress.config().baseUrl + '/api/routes', 'fixture:route.json').as('saveRoute')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveRoute').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/routes')
        })

    })

    after(() => {
        cy.logout()
    })

})