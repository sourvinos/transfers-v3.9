context('Customers - New', () => {



    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoList()
    })

    it('Goto an empty form', () => {
        cy.get('[data-cy=new]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
    })

    it('Fields must exist', () => {
        cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 6)
        cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
    })

    it('Buttons must exist', () => {
        cy.get('[data-cy=goBack]')
        cy.get('[data-cy=save]')
    })

    it('Description is valid', () => {
        cy.typeGibberish('description', 12).elementShouldBeValid('description')
    })

    it('Form is valid', () => {
        cy.buttonShouldBeEnabled('save')
    })

    it('Create and display a snackbar', () => {
        cy.createRecord()
    })

})

