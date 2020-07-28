context('Customer list', () => {

    describe('Get records', () => {
        it('Should return three records and display them', () => {
            cy.server()
            cy.fixture('customers').then(() => {
                cy.route({
                    method: 'GET',
                    url: '/api/customers',
                    status: 200,
                    response: 'fixture:customers',
                }).as('customers')
            })
            cy.visit('/customers')
            cy.wait('@customers')
            cy.get('tbody > tr').should('have.length', 3)
        })

        it('Should return an error and display a snackbar', () => {
            cy.server()
            cy.fixture('customers').then(() => {
                cy.route({
                    method: 'GET',
                    url: '/api/customers',
                    status: 404,
                    response: '',
                }).as('customers')
            })
            cy.visit('/customers')
            cy.wait('@customers')
            cy.get('.mat-snack-bar-container')
        })

    })

})