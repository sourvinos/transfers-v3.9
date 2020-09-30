import 'cypress-localstorage-commands'

Cypress.Commands.add('seekPickupPoint', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5002/api/pickupPoints/1', 'fixture:pickupPoint.json').as('getPickupPoint')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getPickupPoint').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/1')
})