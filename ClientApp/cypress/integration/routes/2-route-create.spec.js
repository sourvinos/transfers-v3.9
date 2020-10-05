context('Ports - Create', () => {

    // Last revision: Mon 5/10/2020 09:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoRouteListWithSuccess()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/routes/new')
    })

    it('Abbreviation is valid', () => {
        cy.typeGibberish('abbreviation', 10).elementShouldBeValid('abbreviation')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12).elementShouldBeValid('description')
    })

    it('Port is valid', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
        cy.typeNotGibberish('portDescription', 'corfu').then(() => {
            cy.wait('@getPorts').its('status').should('eq', 200)
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{enter}', { force: true })
            })
        })
    })

    it.skip('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it.skip('Create and display a snackbar', () => {
        cy.createRecord()
    })

})

