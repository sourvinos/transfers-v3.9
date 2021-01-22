context('Users', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Update', () => {

        it('Read record', () => {
            cy.gotoUserList()
            cy.readUserRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
            cy.route('PUT', Cypress.config().baseUrl + '/api/users/8d204972-9982-491e-aeec-7ce2dcbd56c5', 'fixture:user.json').as('saveUser')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveUser').its('status').should('eq', 200)
        })

    })

    after(() => {
        cy.logout()
    })

})