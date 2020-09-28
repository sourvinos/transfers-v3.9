import 'cypress-localstorage-commands'

Cypress.Commands.add('searchTransfersWithSuccess', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5002/api/transfers/date/2020-01-01', 'fixture:transfers.json').as('getTransfers')
    cy.get('[data-cy=dateIn]')
        .clear()
        .type('1/1/2020{enter}')
        .should('be', '01/01/2020')
    cy.get('[data-cy=search]').click()
    cy.wait('@getTransfers').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01')
})

Cypress.Commands.add('seekTransferWithSuccess', () => {
    cy.server()
    cy.route('GET', 'https://localhost:5002/api/transfers/1', 'fixture:transfer.json').as('getTransfer')
    cy.get('[data-cy=row]:nth-child(1)').dblclick()
    cy.wait('@getTransfer').its('status').should('eq', 200)
    cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01/transfer/1')
})
