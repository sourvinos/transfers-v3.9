describe('New transfer without save', () => {

    describe('Init', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Login', () => {
            cy.login()
        })

        it('Goto the transfers list from the home page', () => {
            cy.gotoUrlFromElement('transfers', 'transfers')
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
            cy.gotoUrlFromElement('transfers/dateIn/2020-01-01/transfer/new', 'new')
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

        it('Destination is valid', () => {
            cy.typeNotGibberish('destination', 'paxos')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Customer is not valid when blank', () => {
            cy.typeGibberish('customer', 0)
                .elementShouldBeInvalid('customer')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Customer is valid', () => {
            cy.typeNotGibberish('customer', 'travel')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Pickup point is not valid when blank', () => {
            cy.typeGibberish('pickupPoint', 0)
                .elementShouldBeInvalid('pickupPoint')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Pickup point is valid', () => {
            cy.typeNotGibberish('pickupPoint', 'kiosk')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Adults is not valid', () => {
            cy.typeGibberish('adults', 0).elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('adults', '-1').elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('adults', '1001').elementShouldBeInvalid('adults').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('Adults is valid', () => {
            cy.typeNotGibberish('adults', '3')
        })

        it('Kids is not valid', () => {
            cy.typeGibberish('kids', 0).elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('kids', '-1').elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('kids', '1001').elementShouldBeInvalid('kids').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('kids is valid', () => {
            cy.typeNotGibberish('kids', '2')
        })

        it('Free is not valid', () => {
            cy.typeGibberish('free', 0).elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('free', '-1').elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
            cy.typeNotGibberish('free', '1001').elementShouldBeInvalid('free').elementShouldBeInvalid('form').buttonShouldBeDisabled('save')
        })

        it('Free is valid', () => {
            cy.typeNotGibberish('free', '1')
        })

        it('Total persons should be the correct sum', () => {
            cy.get('[data-cy=totalPersons]').invoke('val').should('eq', '6')
        })

        it('Remarks is not valid when too long', () => {
            cy.typeGibberish('remarks', 129)
                .elementShouldBeInvalid('remarks')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Remarks is valid', () => {
            cy.typeGibberish('remarks', 10)
                .elementShouldBeValid('remarks')
                .elementShouldBeValid('form')
                .buttonShouldBeEnabled('save')
        })

        it('Choose not to abort when the cancel button is clicked', () => {
            cy.get('[data-cy=cancel-edit]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=cancel]').click()
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/dateIn/2020-01-01/transfer/new')
        })

        it('Choose to abort when the cancel button is clicked', () => {
            cy.get('[data-cy=cancel-edit]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=ok]').click()
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/dateIn/2020-01-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})
