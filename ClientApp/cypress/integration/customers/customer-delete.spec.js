describe('Edit customer', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Unsuccessful attempt to go to the list from the home page', () => {
        cy.server()
            .route({
                method: 'GET',
                url: 'https://localhost:5001/api/customers',
                status: 404,
                response: { error: 'ERROR!' }
            }).as('getCustomers')
            .get('[data-cy=customers]').click()
            .wait('@getCustomers').its('status').should('eq', 404)
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
            .get('[data-cy=goBack]').click()
            .url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('Successful attempt to go to the list from the home page', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers', 'fixture:customers.json').as('getCustomers')
            .get('[data-cy=customers]').click()
            .wait('@getCustomers').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/' + 'customers')
    })

    it('Unsuccessful attempt to edit the second row', () => {
        cy.server()
            .route({
                method: 'GET',
                url: 'https://localhost:5001/api/customers/129',
                status: 404,
                response: { error: 'ERROR!' }
            }).as('getCustomer')
            .get('[data-cy=row]:nth-child(2)').dblclick()
            .wait('@getCustomer').its('status').should('eq', 404)
            .url().should('eq', Cypress.config().baseUrl + '/customers')
    })

    it('Successful attempt to edit the second row', () => {
        cy.server()
            .route('GET', 'https://localhost:5001/api/customers/12', 'fixture:customer.json').as('getCustomer')
            .get('[data-cy=row]:nth-child(2)').dblclick()
            .wait('@getCustomer').its('status').should('eq', 200)
            .url().should('eq', Cypress.config().baseUrl + '/customers/12')
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=delete]')
        cy.get('[data-cy=save]')
    })

    it('Ask to delete and abort', () => {
        cy.get('[data-cy=delete]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=cancel]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/12')
    })

    it('Ask to delete and accept', () => {
        cy.server()
            .route('DELETE', 'https://localhost:5001/api/customers/12', 'fixture:customer.json').as('deleteCustomer')
            .get('[data-cy=delete]').click()
            .get('.mat-dialog-container')
            .get('[data-cy=ok]').click()
            .wait('@deleteCustomer').its('status').should('eq', 200)
            .get('[data-cy=customSnackbar]')
            .url().should('eq', Cypress.config().baseUrl + '/customers')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})

