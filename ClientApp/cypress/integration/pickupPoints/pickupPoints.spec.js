context('Pickup points', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Populate the select', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/routes/getActive', 'fixture:routes.json').as('getRoutes')
            cy.get('[data-cy=tablesMenu]').click()
            cy.get('[data-cy=pickupPointsMenu]').click()
            cy.wait('@getRoutes').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints')
        })

        it('Select a route from the dropdown', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.get('[data-cy=routeSelect]').click()
            cy.get('[data-cy=routeElement]').contains('NISAKI').click()
            cy.wait('@getPickupPoints').its('status').should('eq', 200).then(() => {
                cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
            })
        })

        it('The table has an exact number of rows and columns', () => {
            cy.get('[data-cy=row]').should('have.length', 10)
            cy.get('[data-cy=column]').should('have.length', 6)
        })

        it('Filter the table by typing in the search box', () => {
            cy.wait(500)
            cy.get('[data-cy=searchTerm]').type('mare')
            cy.get('[data-cy=row]').should(rows => {
                expect(rows).to.have.length(1)
            })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]').should('have.text', '')
            cy.get('[data-cy=row]').should((rows) => {
                expect(rows).to.have.length(10)
            })
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Create', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto an empty form', () => {
            cy.gotoEmptyPickupPointForm()
        })

        it('Populate route description', () => {
            cy.get('[data-cy=routeDescription]').type('NISAKI', { force: true })
        })

        it('Description is valid', () => {
            cy.typeRandomChars('description', 128).elementShouldBeValid('description')
        })

        it('Exact point is valid', () => {
            cy.typeRandomChars('exactPoint', 128).elementShouldBeValid('exactPoint')
        })

        it('Time is valid', () => {
            cy.get('[data-cy=time').type('18:45' + '{enter}').elementShouldBeValid('time')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create and display a snackbar', () => {
            cy.server()
            cy.route('POST', Cypress.config().baseUrl + '/api/pickupPoints', 'fixture:pickupPoint.json').as('savePickupPoint')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePickupPoint').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
        })

        it('Go back to the list', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.get('[data-cy=goBack]').click()
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Update', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Read record', () => {
            cy.readPickupPointRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.route('PUT', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('savePickupPoint')
            cy.get('[data-cy=save]').click()
            cy.wait('@savePickupPoint').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Delete', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Read record', () => {
            cy.readPickupPointRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/1700')
        })

        it('Delete record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.route('DELETE', Cypress.config().baseUrl + '/api/pickupPoints/1700', 'fixture:pickupPoint.json').as('deletePickupPoint')
            cy.get('[data-cy=delete]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@deletePickupPoint').its('status').should('eq', 200).then(() => {
                cy.get('[data-cy=customSnackbar]')
            })
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })

    })

    describe('Validate form', () => {

        it('Goto an empty form', () => {
            cy.gotoEmptyPickupPointForm()
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 4)
            cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
        })

        it('Description is not valid when blank', () => {
            cy.typeRandomChars('description', 0).elementShouldBeInvalid('description')
        })

        it('Description is not valid when too long', () => {
            cy.typeRandomChars('description', 129).elementShouldBeInvalid('description')
        })

        it('Exact point is not valid when blank', () => {
            cy.typeRandomChars('exactPoint', 0).elementShouldBeInvalid('exactPoint')
        })

        it('Exact point is not valid when too long', () => {
            cy.typeRandomChars('exactPoint', 129).elementShouldBeInvalid('exactPoint')
        })

        it('Time is not valid when blank', () => {
            cy.typeRandomChars('time', 0).elementShouldBeInvalid('time')
        })

        it('Time is not valid when validation fails', () => {
            cy.typeNotRandomChars('time', '45:10').elementShouldBeInvalid('time')
        })

        it('Time is not valid when too long', () => {
            cy.typeRandomChars('time', 6).elementShouldBeInvalid('time')
        })

        it('Mark record as not active', () => {
            cy.get('[data-cy=isActive]').click()
        })

        it('Form should be invalid, save button should be disabled', () => {
            cy.formShouldBeInvalid('form')
            cy.buttonShouldBeDisabled('save')
        })

        it('Choose not to abort when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-abort]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19/pickupPoint/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/pickupPoints/routeId/19', 'fixture:pickupPoints.json').as('getPickupPoints')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@getPickupPoints').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/pickupPoints/routeId/19')
        })
    })

    after(() => {
        cy.logout()
    })

})