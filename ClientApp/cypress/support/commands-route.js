import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoListWithFailure', () => {
    cy.server()
    cy.route({ method: 'GET', url: Cypress.config().baseUrl + '/api/routes', status: 404, response: { error: 'ERROR!' } }).as('getRoutes')
    cy.get('[data-cy=routes]').click()
    cy.wait('@getRoutes').its('status').should('eq', 404)
    cy.url().should('eq', Cypress.config().baseUrl + '/' + 'routes')
    cy.get('[data-cy=customSnackbar]')
})

Cypress.Commands.add('gotoRouteList', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/routes', 'fixture:routes.json').as('getRoutes')
    cy.get('[data-cy=routes]').click()
    cy.wait('@getRoutes').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/routes')
})

Cypress.Commands.add('gotoEmptyRouteForm', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
    cy.get('[data-cy=new]').click()
    cy.wait('@getPorts').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/routes/new')
})

Cypress.Commands.add('readRouteRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
    cy.route('GET', Cypress.config().baseUrl + '/api/routes/19', 'fixture:route.json').as('getRoute')
    cy.get('[data-cy=row]').contains('NISAKI').dblclick({ force: true })
    cy.wait('@getPorts').its('status').should('eq', 200)
    cy.wait('@getRoute').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/routes/19')
})
