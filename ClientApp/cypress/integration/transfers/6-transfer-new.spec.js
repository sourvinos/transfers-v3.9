context('New', () => {

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

    it('Valid date', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('1/1/2020{enter}')
            .should('be', '01/01/2020')
        cy.buttonShouldBeEnabled('search')
        cy.get('[data-cy=search]').click()
    })

    it('Go to an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01/transfer/new')
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
        cy.typeNotGibberish('pickupPoint', 'kiosk')
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
        cy.route('POST', 'https://localhost:5002/api/transfers', 'fixture:transfer.json').as('saveTransfer')
        cy.get('[data-cy=save]').click()
        cy.wait('@saveTransfer').its('status').should('eq', 200)
        cy.get('[data-cy=customSnackbar]')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
