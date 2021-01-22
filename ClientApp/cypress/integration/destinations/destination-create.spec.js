context('Destinations', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Create', () => {

        it('Goto an empty form', () => {
            cy.gotoDestinationList()
            cy.gotoEmptyDestinationForm()
        })

        it('Abbreviation is valid', () => {
            cy.typeRandomChars('abbreviation', 5).elementShouldBeValid('abbreviation')
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 128).elementShouldBeValid('description')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/destinations', 'fixture:destinations.json').as('getDestinations')
            cy.route('POST', Cypress.config().baseUrl + '/api/destinations', 'fixture:destination.json').as('saveDestination')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveDestination').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/destinations')
        })

    })

    after(() => {
        cy.logout()
    })

})