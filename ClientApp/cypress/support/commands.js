import 'cypress-localstorage-commands'

Cypress.Commands.add('login', () => {
    cy.visit('/login')
        .get('[data-cy=login]')
        .click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-cy=userMenu]').click()
    cy.get('[data-cy=logout]').click()
})

Cypress.Commands.add('typeRandomChars', (fieldName, length) => {
    cy.get('[data-cy=' + fieldName + ']')
        .clear()
        .type(createRandomLetters(length) + '{enter}')
})

Cypress.Commands.add('typeNotRandomChars', (fieldName, fieldContent) => {
    cy.get('[data-cy=' + fieldName + ']')
        .clear()
        .type(fieldContent + '{enter}')
})

Cypress.Commands.add('formShouldBeInvalid', (element) => {
    cy.get('[data-cy=' + element + ']')
        .should('have.class', 'ng-invalid')
})

Cypress.Commands.add('formShouldBeValid', (element) => {
    cy.get('[data-cy=' + element + ']')
        .should('not.have.class', 'ng-invalid')
})

Cypress.Commands.add('elementShouldBeInvalid', (element) => {
    cy.get('[data-cy=' + element + ']')
        .should('have.attr', 'aria-invalid', 'true')
})

Cypress.Commands.add('elementShouldBeValid', (element) => {
    cy.get('[data-cy=' + element + ']')
        .should('not.have.class', 'aria-invalid', 'false')
})

Cypress.Commands.add('buttonShouldBeDisabled', (button) => {
    cy.get('[data-cy=' + button + ']')
        .should('have.attr', 'disabled')
})

Cypress.Commands.add('buttonShouldBeEnabled', (button) => {
    cy.get('[data-cy=' + button + ']')
        .should('not.have.attr', 'disabled')
})

Cypress.Commands.add('clickOnDeleteAndAbort', () => {
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=dialog-abort]').click()
})

function createRandomLetters(length) {
    let field = ''
    for (let index = 1; index <= length; index++) {
        field += String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65))
    }
    return field
}
