context('Date validation', () => {

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

    it('Invalid day', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('32{enter}')
            .should('be', '')
        cy.buttonShouldBeDisabled('search')
    })

    it('Invalid  month', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('31/14{enter}')
            .should('be', '')
        cy.buttonShouldBeDisabled('search')
    })

    it('Valid day', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('5{enter}')
            .should('be', '05/' + new Date().getMonth() + '/' + new Date().getFullYear())
        cy.buttonShouldBeEnabled('search')
    })

    it('Valid day and month', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('5/8{enter}')
            .should('be', '05/08/' + new Date().getFullYear())
        cy.buttonShouldBeEnabled('search')
    })

    it('Valid day, month and short year', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('5/8/20{enter}')
            .should('be', '05/08/2020')
        cy.buttonShouldBeEnabled('search')
    })

    it('Valid day, month and full year', () => {
        cy.get('[data-cy=dateIn]')
            .clear()
            .type('5/8/2020{enter}')
            .should('be', '05/08/2020')
        cy.buttonShouldBeEnabled('search')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    after(() => {
        cy.get('[data-cy=goBack]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

})
