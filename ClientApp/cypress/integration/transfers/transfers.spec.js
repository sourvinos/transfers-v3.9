context('Transfers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        cy.gotoTransfersWrapper()
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Totals should have the correct values', () => {
            cy.get(':nth-child(1) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('There should be five summary boxes', () => {
            cy.get('[data-cy=summaryBlock]').should('have.length', 5)
        })

        it('The table should have the correct number of rows and columns', () => {
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get('[data-cy=column]').should('have.length', 15)
        })

        it('Select all rows by clicking on the "S" column header', () => {
            cy.get('table').within(() => { cy.get('[data-cy=column]:nth-child(1)').click() })
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '72')
        })

        it('Unselect all destinations', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=destinationsCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 0)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '0')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select all destinations', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=destinationsCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Unselect all customers', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=customersCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 0)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '0')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select all customers', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=customersCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Unselect all routes', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=routesCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 0)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '0')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select all routes', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=routesCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Unselect all drivers', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=driversCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 0)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '0')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select all drivers', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=driversCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Unselect all ports', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=portsCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 0)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '0')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select all ports', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=portsCheckbox]').click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 17)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '72')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Unselect the first port', () => {
            cy.get('[data-cy=summaryTab]').click()
            cy.get('[data-cy=port]').eq(0).click()
            cy.get('[data-cy=listTab]').click()
            cy.get('[data-cy=row]').should('have.length', 6)
            cy.get(':nth-child(2) > .selection > [data-cy=totalsSum]').should('have.text', '35')
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '0')
        })

        it('Select the first two rows', () => {
            cy.get('#mat-checkbox-108 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
            cy.get('#mat-checkbox-109 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '8')
        })

        it('Select the summary tab', () => {
            cy.get('[data-cy=summaryTab]').click()
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Create', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Goto an empty form', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.route('GET', Cypress.config().baseUrl + '/api/customers/getActive', 'fixture:customers.json').as('getCustomers')
            cy.route('GET', Cypress.config().baseUrl + '/api/destinations/getActive', 'fixture:destinations.json').as('getDestinations')
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers/getActive', 'fixture:drivers.json').as('getDrivers')
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers/defaultDriver', 'fixture:driver.json').as('getDefaultDriver')
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/getActive', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
            cy.get('[data-cy=new]').click()
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.wait('@getDestinations').its('status').should('eq', 200)
            cy.wait('@getDrivers').its('status').should('eq', 200)
            cy.wait('@getDefaultDriver').its('status').should('eq', 200)
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
            cy.wait('@getPorts').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01/transfer/new')
        })

        it('Destination is valid', () => {
            cy.typeNotRandomChars('destination', 'paxos')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Customer is valid', () => {
            cy.typeNotRandomChars('customer', 'travel')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Pickup point is valid', () => {
            cy.typeNotRandomChars('pickupPoint', 'ant')
            cy.get('#dialog').within(() => {
                cy.get('input[type=text]')
                    .type('{downarrow}{downarrow}{enter}', { force: true })
            })
        })

        it('Adults is valid', () => {
            cy.typeNotRandomChars('adults', '3')
        })

        it('kids is valid', () => {
            cy.typeNotRandomChars('kids', '2')
        })

        it('Free is valid', () => {
            cy.typeNotRandomChars('free', '1')
        })

        it('Remarks is valid', () => {
            cy.typeRandomChars('remarks', 10)
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

        it('Close the form', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.get('[data-cy=abort]').click()
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Update', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Select the list tab', () => {
            cy.get('[data-cy=listTab]').click()
        })

        it('Seek the first row', () => {
            cy.seekTransfer()
        })

        it('Update and display a snackbar', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.route('PUT', 'https://localhost:5001/api/transfers/587', 'fixture:transfer.json').as('saveTransfer')
            cy.get('[data-cy=save]').click()
            cy.wait('@saveTransfer').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Delete', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Select the list tab', () => {
            cy.get('[data-cy=listTab]').click()
        })

        it('Seek the first row', () => {
            cy.seekTransfer()
        })

        it('Ask to delete and abord', () => {
            cy.clickOnDeleteAndAbort()
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/transfers/587', 'fixture:transfer.json').as('deleteTransfer')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deleteTransfer').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01')
        })

    })

    describe('Validate form', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Goto an empty form', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.route('GET', Cypress.config().baseUrl + '/api/customers/getActive', 'fixture:customers.json').as('getCustomers')
            cy.route('GET', Cypress.config().baseUrl + '/api/destinations/getActive', 'fixture:destinations.json').as('getDestinations')
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers/getActive', 'fixture:drivers.json').as('getDrivers')
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers/defaultDriver', 'fixture:driver.json').as('getDefaultDriver')
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/getActive', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.route('GET', Cypress.config().baseUrl + '/api/ports/getActive', 'fixture:ports.json').as('getPorts')
            cy.get('[data-cy=new]').click()
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.wait('@getDestinations').its('status').should('eq', 200)
            cy.wait('@getDrivers').its('status').should('eq', 200)
            cy.wait('@getDefaultDriver').its('status').should('eq', 200)
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
            cy.wait('@getPorts').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01/transfer/new')
        })

        it('Destination is not valid when blank', () => {
            cy.typeRandomChars('destination', 0)
                .elementShouldBeInvalid('destination')
        })

        it('Customer is not valid when blank', () => {
            cy.typeRandomChars('customer', 0)
                .elementShouldBeInvalid('customer')
        })

        it('Pickup point is not valid when blank', () => {
            cy.typeRandomChars('pickupPoint', 0)
                .elementShouldBeInvalid('pickupPoint')
        })

        it('Adults is not valid', () => {
            cy.typeRandomChars('adults', 0).elementShouldBeInvalid('adults')
            cy.typeNotRandomChars('adults', '-1').elementShouldBeInvalid('adults')
            cy.typeNotRandomChars('adults', '1001').elementShouldBeInvalid('adults')
        })

        it('Kids is not valid', () => {
            cy.typeRandomChars('kids', 0).elementShouldBeInvalid('kids')
            cy.typeNotRandomChars('kids', '-1').elementShouldBeInvalid('kids')
            cy.typeNotRandomChars('kids', '1001').elementShouldBeInvalid('kids')
        })

        it('Free is not valid', () => {
            cy.typeRandomChars('free', 0).elementShouldBeInvalid('free')
            cy.typeNotRandomChars('free', '-1').elementShouldBeInvalid('free')
            cy.typeNotRandomChars('free', '1001').elementShouldBeInvalid('free')
        })

        it('Remarks is not valid when too long', () => {
            cy.typeRandomChars('remarks', 129)
                .elementShouldBeInvalid('remarks')
        })

        it('Form should be invalid, save button should be disabled', () => {
            cy.formShouldBeInvalid('form')
            cy.buttonShouldBeDisabled('save')
        })

        it('Choose not to abort when the abort button is clicked', () => {
            cy.get('[data-cy=abort]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=dialog-abort]').click()
            })
        })

        it('Choose to abort when the abort button is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.get('[data-cy=abort]').click()
            cy.get('#dialog').within(() => {
                cy.get('[data-cy=dialog-ok]').click()
            })
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Validate date', () => {

        it('Invalid day', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('32{enter}')
                .should('be', '')
        })

        it('Invalid  month', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('31/14{enter}')
                .should('be', '')
        })

        it('Valid day', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5{enter}')
                .should('be', '05/' + new Date().getMonth() + '/' + new Date().getFullYear())
        })

        it('Valid day and month', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5/8{enter}')
                .should('be', '05/08/' + new Date().getFullYear())
        })

        it('Valid day, month and short year', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5/8/20{enter}')
                .should('be', '05/08/2020')
        })

        it('Valid day, month and full year', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5/8/2020{enter}')
                .should('be', '05/08/2020')
        })

    })

    describe('Assign driver', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Search by a given date', () => {
            cy.searchTransfers()
        })

        it('Unselect all drivers', () => {
            cy.get('[data-cy=driversCheckbox]').click()
        })

        it('Select the first driver', () => {
            cy.get('#-').eq(0).click()
        })

        it('Select the list tab', () => {
            cy.get('[data-cy=listTab]').click()
        })

        it('Select some rows', () => {
            cy.get('#mat-checkbox-300 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
            cy.get('#mat-checkbox-301 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
            cy.get(':nth-child(3) > .selection > [data-cy=totalsSum]').should('have.text', '7')
        })

        it('Click the "Assign driver" button', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers/getActive', 'fixture:drivers-active.json').as('getDrivers')
            cy.route('GET', Cypress.config().baseUrl + '/api/transfers/date/2020-08-01', 'fixture:transfers.json').as('getTransfers')
            cy.get('[data-cy=assignDriver]').click()
            cy.get('[data-cy=driverSelect]').click()
            cy.get('[data-cy=driverElement]').contains('STAMATIS!').click();
            cy.server()
            cy.route('PATCH', Cypress.config().baseUrl + '/api/transfers/assignDriver?driverId=1&id=587&id=590', 'fixture:transfers-assign-driver.json').as('assignDriver')
            cy.get('[data-cy=continue]').click()
            cy.wait('@assignDriver').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.wait('@getTransfers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/transfers/date/2020-08-01')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})

