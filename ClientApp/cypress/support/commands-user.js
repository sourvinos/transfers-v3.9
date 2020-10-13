import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoUserList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/users', 'fixture:users.json').as('getUsers')
    cy.get('[data-cy=users]').click()
    cy.wait('@getUsers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/users')
})

Cypress.Commands.add('gotoEmptyUserForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/users/new')
})

Cypress.Commands.add('readUserRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28', 'fixture:user.json').as('getUser')
    cy.get('[data-cy=row]').contains('George').dblclick({ force: true })
    cy.wait('@getUser').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/users/7bf9acf1-74c2-459c-8366-82f05bfa3e28')
})
