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
    cy.route('GET', Cypress.config().baseUrl + '/api/users/b6401c3e', 'fixture:user.json').as('getUser')
    cy.wait(500)
    cy.get('[data-cy=searchTerm]').clear().type('sourvinos').should('have.value', 'sourvinos')
    cy.get('.button-row-menu').eq(0).click({ force: true })
    cy.get('[data-cy=editButton]').first().click()
    cy.wait('@getUser').its('status').should('eq', 200)
    cy.setLocalStorage("editUserCaller", 'list');
    cy.url().should('eq', Cypress.config().baseUrl + '/users/b6401c3e').then(() => {
        cy.expect(localStorage.getItem('searchTermUser')).to.eq('sourvinos')
        cy.clearLocalStorage('searchTermUser')
    })
})    
