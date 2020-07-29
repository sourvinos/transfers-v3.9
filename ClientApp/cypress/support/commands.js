import "cypress-localstorage-commands"

Cypress.Commands.add("login", () => {
    cy.visit('/login')
    cy.get('#userName').clear().type('sourvinos')
    cy.get('#password').clear().type('1234567890')
    cy.get('#login').click()
})
