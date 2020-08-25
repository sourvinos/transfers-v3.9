describe('Edit customer', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the customers list from the home page', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            .get('[data-cy=customers]').click()
            .wait('@getCustomers').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

    it('Edit the second row', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers/129', 'fixture:customer.json').as('getCustomer')
            .get('[data-cy=row]:nth-child(2)').dblclick()
            .wait('@getCustomer').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/customers/129')
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Update and display a snackbar', () => {
        cy.server()
            .route('PUT', 'https://localhost:5001/api/customers/129', 'fixture:customer.json').as('saveCustomer')
            .get('[data-cy=save]').click()
            .wait('@saveCustomer').its('status').should('eq', 200)
            .get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

