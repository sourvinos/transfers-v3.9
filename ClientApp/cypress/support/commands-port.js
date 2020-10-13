import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/ports', status: 404, response: { error: 'ERROR!' } }).as('getPorts')
    cy.get('[data-cy=ports]').click()
    cy.wait('@getPorts').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'ports')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoPortList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports.json').as('getPorts')
    cy.get('[data-cy=ports]').click()
    cy.wait('@getPorts').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/ports')
})

Cypress.Commands.add('gotoEmptyPortForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/ports/new')
})

Cypress.Commands.add('readPortRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports/1', 'fixture:port.json').as('getPort')
    cy.get('[data-cy=row]').contains('CORFU PORT').dblclick({ force: true })
    cy.wait('@getPort').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/ports/1')
})