context('Ports - Form validation', () => {

    // Last revision: Mon 5/10/2020 09:00

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoPortListWithSuccess()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/ports/new')
    })

    it('Correct number of fields', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 1)
        cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
    })

    it('Description is not valid when blank', () => {
        cy.typeGibberish('description', 0)
            .elementShouldBeInvalid('description')
    })

    it('Description is not valid when too long', () => {
        cy.typeGibberish('description', 129)
            .elementShouldBeInvalid('description')
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
        cy.get('[data-cy=abort]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/ports/new')
    })

    it('Choose to abort when the back icon is clicked', () => {
        cy.server()
        cy.route('GET', Cypress.config().baseUrl + '/api/ports', 'fixture:ports.json').as('getPorts')
        cy.get('[data-cy=goBack]').click()
        cy.get('.mat-dialog-container')
        cy.get('[data-cy=ok]').click()
        cy.wait('@getPorts').its('status').should('eq', 200)
        cy.url().should('eq', Cypress.config().baseUrl + '/ports')
    })

})
