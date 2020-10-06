context('Routes - Create', () => {

    // Last revision: Mon 5/10/2020 09:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
        cy.get('[data-cy=routes]').click()
        cy.wait('@getRoutes').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/routes')
    })

    it('Goto an empty form', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
        cy.get('[data-cy=new]').click()
        cy.wait('@getPorts').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/routes/new')
    })

    it('Abbreviation is valid', () => {
        cy.typeGibberish('abbreviation', 10).elementShouldBeValid('abbreviation')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12).elementShouldBeValid('description')
    })

    it('Port is valid', () => {
        cy.typeNotGibberish('portDescription', 'corfu').then(() => {
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{enter}', { force: true })
            })
        })
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.createRecord()
    })

})

