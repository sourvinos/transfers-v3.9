context('Drivers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Validate form', () => {

        it('Goto an empty form', () => {
            cy.gotoDriverList()
            cy.gotoEmptyDriverForm()
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 2)
            cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 2)
        })

        it('Name is not valid when blank', () => {
            cy.typeRandomChars('description', 0).elementShouldBeInvalid('description')
        })

        it('Name is not valid when too long', () => {
            cy.typeRandomChars('description', 129).elementShouldBeInvalid('description')
        })

        it('Phones is not valid when too long', () => {
            cy.typeRandomChars('phones', 129).elementShouldBeInvalid('phones')
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
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/drivers', 'fixture:drivers.json').as('getDrivers')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=dialog-ok]').click()
            cy.wait('@getDrivers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/drivers')
        })

    })

    after(() => {
        cy.logout()
    })

})