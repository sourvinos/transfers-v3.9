import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoEmptyPickupPointForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/new')
})

Cypress.Commands.add('readPickupPointRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('getPickupPoint')
    cy.get('[data-cy=row]').contains('KAMINAKI').dblclick({ force: true })
    cy.wait('@getPickupPoint').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
})

