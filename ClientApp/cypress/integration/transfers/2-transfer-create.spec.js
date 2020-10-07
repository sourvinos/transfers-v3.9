context('Transfers - Create', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list from the home page', () => {
        cy.get('[data-cy=transfers]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers')
    })

    it('Valid date', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('1/8{enter}')
            .should('be', '01/08/2020')
        cy.buttonShouldBeEnabled('search')
        cy.get('[data-cy=search]').click()
    })

    it('Goto an empty form', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/destinations/getActive', 'fixture:destinations.json').as('getDestinations')
        cy.route('GET', Cypress.config().baseUrl + '/api/customers/getActive', 'fixture:customers.json').as('getCustomers')
        cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/getActive', 'fixture:pickupPoints.json').as('getPickupPoints')
        cy.get('[data-cy=new]').click()
        cy.wait('@getDestinations').its('status').should('eq', 200)
        cy.wait('@getCustomers').its('status').should('eq', 200)
        cy.wait('@getPickupPoints').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01/transfer/new')
    })

    it('Destination is valid', () => {
        cy.typeNotGibberish('destination', 'paxos')
        cy.get('#dialog').within(() => {
            cy.get('input[type=text]')
                .type('{downarrow}{downarrow}{enter}', { force: true })
        })
    })

    it('Customer is valid', () => {
        cy.typeNotGibberish('customer', 'travel')
        cy.get('#dialog').within(() => {
            cy.get('input[type=text]')
                .type('{downarrow}{downarrow}{enter}', { force: true })
        })
    })

    it('Pickup point is valid', () => {
        cy.typeNotGibberish('pickupPoint', 'ant')
        cy.get('#dialog').within(() => {
            cy.get('input[type=text]')
                .type('{downarrow}{downarrow}{enter}', { force: true })
        })
    })

    it('Adults is valid', () => {
        cy.typeNotGibberish('adults', '3')
    })

    it('kids is valid', () => {
        cy.typeNotGibberish('kids', '2')
    })

    it('Free is valid', () => {
        cy.typeNotGibberish('free', '1')
    })

    it('Remarks is valid', () => {
        cy.typeGibberish('remarks', 10)
            .elementShouldBeValid('remarks')
            .elementShouldBeValid('form')
            .buttonShouldBeEnabled('save')
    })

    it('Save and display a snackbar', () => {
        cy.server()
        cy.route('POST', 'https://localhost:5001/api/transfers', 'fixture:transfer.json').as('saveTransfer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveTransfer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
