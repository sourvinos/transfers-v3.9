import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoUserListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
    cy.get('[data-cy=users]').click()
    cy.wait('@getUsers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/users')
})

Cypress.Commands.add('createUserRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/account/register', 'fixture:user.json').as('saveUser')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveUser').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readUserRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28', 'fixture:user.json').as('getUser')
    cy.get('[data-cy=row]').contains('George').dblclick({ force: true })
    cy.wait('@getUser').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28')
})

Cypress.Commands.add('updateUserRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28', 'fixture:user.json').as('saveUser')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveUser').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/users')
})

Cypress.Commands.add('deleteUserRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28', 'fixture:user.json').as('deleteUser')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deleteUser').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/users')
})