describe('Edit customer', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.gotoCustomerListWithSuccess()
    })

    it('Seek the first row', () => {
        cy.seekCustomerRecordWithSuccess()
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
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

