context('Transfers list', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Successful attempt to go to the list from the home page', () => {
        cy.gotoTransferListWithSuccess()
    })

    it('Search by a given date', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('4/8/2020{enter}')
            .should('be', '04/08/2020')
        cy.buttonShouldBeEnabled('search')
        cy.get('[data-cy=search]').click()
    })

    it('Element check', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=assignDriver]')
        cy.get('[data-cy=createPdf]')
        cy.get('[data-cy=new]')
    })


    it('There should be five panels, one for each group', () => {
        cy.get('[data-cy=summaryBlock]').should('have.length', 5)
    })

    it('The table should have forteen columns', () => {
        cy.get('[data-cy=header]').should('have.length', 14)
    })

    it('Select all rows by clicking on the first column header', () => {
        cy.get('table').within(() => {
            cy.get('[data-cy=header]:nth-child(1)').click()
        })
    })

    it('Selected sum should be equal to the displayed sum', () => {
        let displayed
        cy.get('[data-cy=sum]')
            .eq(1)
            .then(response => {
                displayed = response.text()
                console.log(displayed)
                cy.get('[data-cy=sum]')
                    .eq(2)
                    .should('have.text', displayed)
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
