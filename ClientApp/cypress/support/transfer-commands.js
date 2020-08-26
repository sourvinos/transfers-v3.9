import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoTransferListWithSuccess', () => {
    cy.gotoUrlFromElement('transfers', 'transfers')
})