import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoDriverListFromHomePage', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/drivers', 'fixture:drivers.json').as('getDrivers')
    cy.get('[data-cy=drivers]').click()
    cy.wait('@getDrivers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
})

Cypress.Commands.add('seekDriver', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/drivers/1', 'fixture:driver.json').as('getDriver')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getDriver').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/drivers/1')
})