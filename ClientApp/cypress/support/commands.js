import 'cypress-localstorage-commands'

Cypress.Commands.add('login', () => {
    cy.request({
        url: Cypress.config().baseUrl + '/api/auth/auth',
        method: 'POST',
        body: {
            username: 'sourvinos',
            password: '46929e6c-ee70-447a-ba35-542b4be14746',
            grantType: "password"
        }
    }).its('body.response').then(response => {
        cy.setLocalStorage('jwt', response.token)
        cy.setLocalStorage('refresh_token', response.refresh_token)
        cy.setLocalStorage('expiration', response.expiration)
        cy.setLocalStorage('roles', response.roles)
        cy.setLocalStorage('userId', response.userId)
        cy.setLocalStorage('displayName', response.displayName)
        cy.setLocalStorage('language', 'el-GR')
        cy.setLocalStorage('theme', 'blue')
        cy.setLocalStorage('userRole', 'Admin')
        cy.setLocalStorage('loginStatus', '1')
    })
    cy.visit("https://localhost:5001")
    cy.saveLocalStorage()
})

Cypress.Commands.add('logout', () => {
    cy.clearLocalStorage()
})

Cypress.Commands.add('typeRandomChars', (fieldName, length) => {
    cy.get('[data-cy=' + fieldName + ']')
        .clear({ force: true })
        .type(createRandomLetters(length) + '{enter}')
})

Cypress.Commands.add('typeNotRandomChars', (fieldName, fieldContent) => {
    cy.get('[data-cy=' + fieldName + ']')
        .type(fieldContent + '{enter}', { force: true })
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
