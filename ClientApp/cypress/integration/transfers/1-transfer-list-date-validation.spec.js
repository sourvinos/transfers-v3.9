context('Transfers list', () => {
    
    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    describe('Search button is disabled when the date is invalid', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto the transfers list from the home page', () => {
            cy.gotoUrlFromElement('transfers', 'transfers')
        })

        it('Wrong day', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('32{enter}')
                .should('be', '')
            cy.buttonShouldBeDisabled('search')
        })

        it('Wrong month', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('31/14{enter}')
                .should('be', '')
            cy.buttonShouldBeDisabled('search')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Search button is enabled when the date is valid', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Goto the transfers list from the home page', () => {
            cy.gotoUrlFromElement('transfers', 'transfers')
        })

        it('Valid day', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5{enter}')
                .should('be', '05/' + new Date().getMonth() + '/2020')
            cy.buttonShouldBeEnabled('search')
        })

        it('Valid day and month', () => {
            cy.get('[data-cy=dateIn]')
                .clear()
                .type('5/8{enter}')
                .should('be', '05/08/2020')
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

    })

})
