import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/routes', status: 404, response: { error: 'ERROR!' } }).as('getRoutes')
    cy.get('[data-cy=routes]').click()
    cy.wait('@getRoutes').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'routes')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoRouteListWithSuccess', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
    cy.get('[data-cy=routes]').click()
    cy.wait('@getRoutes').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/routes')
})

Cypress.Commands.add('createRecord', () => {
    cy.server()
    cy.route('POST', Cypress.config().baseUrl + '/api/routes', 'fixture:route.json').as('saveRoute')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveRoute').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('readRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes/1', 'fixture:route.json').as('getRoute')
    cy.get('[data-cy=row]').contains('CORFU PORT').dblclick({ force: true })
    cy.wait('@getRoute').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/routes/1')
})

Cypress.Commands.add('updateRecord', () => {
    cy.server()
    cy.route('PUT', Cypress.config().baseUrl + '/api/routes/1', 'fixture:route.json').as('saveRoute')
    cy.get('[data-cy=save]').click()
    cy.wait('@saveRoute').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/routes')
})

Cypress.Commands.add('deleteRecord', () => {
    cy.server()
    cy.route('DELETE', Cypress.config().baseUrl + '/api/routes/1', 'fixture:route.json').as('deleteRoute')
    cy.get('[data-cy=delete]').click()
    cy.get('.mat-dialog-container')
    cy.get('[data-cy=ok]').click()
    cy.wait('@deleteRoute').its('status').should('eq', 200)
    cy.get('[data-cy=customSnackbar]')
    cy.url().should('eq', Cypress.config().baseUrl + '/routes')
})

