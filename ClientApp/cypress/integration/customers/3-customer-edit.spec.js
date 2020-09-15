context('Edit', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.gotoCustomerListFromHomePage()
    })

    it('Successful attempt to seek a record', () => {
        cy.seekCustomer()
    })

    it('Elements must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Unable to update and display a snackbar', () => {
        cy.server()
        cy.route({
            method: 'PUT',
            url: 'https://localhost:5001/api/customers/155',
            status: 400,
            response: { error: 'Dummy response' },
            delay: 500
        })
        cy.get('[data-cy=save]').click()
        cy.get('[data-cy=customSnackbar]')
    })

    it('Update and display a snackbar', () => {
        cy.server()
        cy.route('PUT', 'https://localhost:5001/api/customers/155', 'fixture:customer.json').as('saveCustomer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveCustomer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

