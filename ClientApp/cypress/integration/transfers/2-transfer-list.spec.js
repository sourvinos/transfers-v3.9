context('List', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Go to the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Unsuccessful attempt to search by a given date', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: 'https://localhost:5001/api/transfers/date/2020-01-01',
            status: 404,
            response: { error: 'ERROR!' }
        }).as('getTransfers')
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('1/1/2020{enter}')
            .should('be', '01/01/2020')
        cy.get('[data-cy=search]').click()
        cy.wait('@getTransfers').its('status').should('eq', 404)
        cy.url().should('eq', Cypress.config().baseUrl + '/' + 'transfers/date/2020-01-01')
        cy.get('[data-cy=goBack]').click()
    })

    it('Successful attempt to search by a given date', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
        cy.searchTransfersWithSuccess()
    })

    it('Check for elements presence', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=assignDriver]')
        cy.get('[data-cy=createPdf]')
        cy.get('[data-cy=new]')
        cy.get('[data-cy=summaryBlock]').should('have.length', 5)
        cy.get('[data-cy=header]').should('have.length', 14)
    })

    it('Select all rows by clicking on the first column header', () => {
        cy.get('table').within(() => {
            cy.get('[data-cy=header]:nth-child(1)').click()
        })
    })

    it('Selected sum should be equal to the displayed sum', () => {
        let displayedSum
        cy.get('[data-cy=sum]')
            .eq(1)
            .then(response => {
                displayedSum = response.text()
                cy.get('[data-cy=sum]')
                    .eq(2)
                    .should('have.text', displayedSum)
            })
    })

    it('Unselect all destinations and table should have no rows', () => {
        cy.get('[data-cy=destinationsCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 0)
    })

    it('Select all destinations and table should have three rows', () => {
        cy.get('[data-cy=destinationsCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 3)
    })

    it('Unselect all customers and table should have no rows', () => {
        cy.get('[data-cy=customersCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 0)
    })

    it('Select all customers and table should have three rows', () => {
        cy.get('[data-cy=customersCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 3)
    })

    it('Unselect all routes and table should have no rows', () => {
        cy.get('[data-cy=routesCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 0)
    })

    it('Select all routes and table should have three rows', () => {
        cy.get('[data-cy=routesCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 3)
    })

    it('Unselect all drivers and table should have no rows', () => {
        cy.get('[data-cy=driversCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 0)
    })

    it('Select all drivers and table should have three rows', () => {
        cy.get('[data-cy=driversCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 3)
    })

    it('Unselect all ports and table should have no rows', () => {
        cy.get('[data-cy=portsCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 0)
    })

    it('Select all ports and table should have three rows', () => {
        cy.get('[data-cy=portsCheckbox]').click()
        cy.get('table tbody tr')
            .should('have.length', 3)
    })

    it('Expand the ports summary, unselect the first port and table should have two rows', () => {
        cy.get('[data-cy=summaryBlock')
            .eq(4).click()
        cy.get('[data-cy=port]')
            .eq(0).click()
        cy.get('table tbody tr')
            .should('have.length', 2)
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
