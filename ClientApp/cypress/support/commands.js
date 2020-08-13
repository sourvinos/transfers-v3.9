Cypress.Commands.add("login", () => {
    cy.visit('/')
    cy.get('#login').click()
})
