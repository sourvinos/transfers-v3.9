import 'cypress-localstorage-commands'

Cypress.Commands.add('gotoTransfersWrapper', () => {
    cy.get('[data-cy=transfersMenu]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
})

Cypress.Commands.add('searchTransfers', () => {
    cy.server()
    cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
    cy.get('[data-cy=dateIn]')
        .clear()
        .type('1/8/2020{enter}')
        .should('be', '01/08/2020')
    cy.get('[data-cy=search]').click()
    cy.wait('@getTransfers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01').then(() => {
        cy.expect(localStorage.getItem('date')).to.eq('2020-08-01')
    })
})

Cypress.Commands.add('seekTransfer', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5001/api/transfers/587', 'fixture:transfer.json').as('getTransfer')
    cy.get('.button-row-menu').eq(0).click({ force: true })
    cy.get('[data-cy=editButton]').first().click()
    cy.wait('@getTransfer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01/transfer/587')
})
