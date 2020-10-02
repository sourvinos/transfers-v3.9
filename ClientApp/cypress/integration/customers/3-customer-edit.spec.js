context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    describe('Seek and update a record', () => {

        it('Goto the list from the home page', () => {
            cy.server()
            cy.route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=customers]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        it('Successful attempt to seek a record', () => {
            cy.seekCustomer()
        })

        it('Update and display a snackbar', () => {
            cy.server()
            cy.route('PUT', 'https://localhost:5001/api/customers/8', 'fixture:customer.json').as('saveCustomer')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveCustomer').its('status').should('eq', 200)
            cy.get('[data-cy=customSnackbar]')
        })

    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

