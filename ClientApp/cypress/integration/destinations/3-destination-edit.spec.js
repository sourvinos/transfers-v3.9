context('Edit', () => {

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

    it('Successful attempt to seek a record', () => {
        cy.seekDestination()
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Unable to update and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'PUT',
            url: 'https://localhost:5001/api/destinations/16',
            status: 400,
            response: { error: 'Dummy response' },
            delay: 500
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Update and display a snackbar', () => {
        cy.server()
        cy.route('PUT', 'https://localhost:5001/api/destinations/16', 'fixture:destination.json').as('saveDestination')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveDestination').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

