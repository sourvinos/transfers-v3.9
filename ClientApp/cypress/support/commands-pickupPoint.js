import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoEmptyPickupPointForm', () => {
    cy.get('[data-cy=new]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/new')
})

Cypress.Commands.add('readPickupPointRecord', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('getPickupPoint')
    cy.wait(500)
    cy.get('[data-cy=searchTerm]').clear().type('kaminaki').should('have.value', 'kaminaki')
    cy.get('.button-row-menu').eq(0).click({ force: true })
    cy.get('[data-cy=editButton]').first().click()
    cy.wait('@getPickupPoint').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700').then(() => {
        cy.expect(localStorage.getItem('searchTermPickupPoint')).to.eq('kaminaki')
        cy.clearLocalStorage('searchTermPickupPoint')
    })
})

