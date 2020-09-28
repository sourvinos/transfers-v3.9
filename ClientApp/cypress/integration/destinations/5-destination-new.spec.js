context('New', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(1500)
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.gotoDestinationListFromHomePage()
    })

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/destinations/new')
    })

    it('Elements must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Abbreviation is valid', () => {
        cy.typeGibberish('abbreviation', 5)
            .elementShouldBeValid('abbreviation')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 128)
            .elementShouldBeValid('description')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Unable to save and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'https://localhost:5002/api/destinations'
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Save and display a snackbar', () => {
        cy.server()
        cy.route('POST', 'https://localhost:5002/api/destinations', 'fixture:destination.json').as('saveDestination')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveDestination').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    it('Goto the list', () => {
        cy.server()
        cy.route('GET', 'https://localhost:5002/api/destinations', 'fixture:destinations.json').as('getDestinations')
        cy.get('[data-cy=goBack]').click()
        cy.wait('@getDestinations').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'destinations')
    })

})

