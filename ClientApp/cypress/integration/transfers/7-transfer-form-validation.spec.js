context('Form validation', () => {

    describe('Init', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Login', () => {
            cy.login()
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

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Form', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Destination is not valid when blank', () => {
            cy.typeGibberish('destination', 0)
                .elementShouldBeInvalid('destination')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Customer is not valid when blank', () => {
            cy.typeGibberish('customer', 0)
                .elementShouldBeInvalid('customer')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Pickup point is not valid when blank', () => {
            cy.typeGibberish('pickupPoint', 0)
                .elementShouldBeInvalid('pickupPoint')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Adults is not valid', () => {
            cy.typeGibberish('adults', 0).elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('adults', '-1').elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('adults', '1001').elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('Kids is not valid', () => {
            cy.typeGibberish('kids', 0).elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('kids', '-1').elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('kids', '1001').elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('Free is not valid', () => {
            cy.typeGibberish('free', 0).elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('free', '-1').elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('free', '1001').elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('Remarks is not valid when too long', () => {
            cy.typeGibberish('remarks', 129)
                .elementShouldBeInvalid('remarks')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Choose not to abort when the abort button is clicked', () => {
            cy.get('[data-cy=abort]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=abort]').click()
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01/transfer/new')
        })

        it('Choose to abort when the abort button is clicked', () => {
            cy.get('[data-cy=abort]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=ok]').click()
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-01-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
