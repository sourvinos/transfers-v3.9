context('Customers', () => {

    before(() => {
        cy.visit('/')
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Login', () => {
            cy.url().should('eq', Cypress.config().baseUrl + '/login')
                .get('#login').click()
                .url().should('eq', Cypress.config().baseUrl + '/')
        })

        it('Go to the customers list', () => {
            cy.get('[data-cy=customers]').click()
                .url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        it('Filter the list by typing in the search box', () => {
            cy.get('[data-cy=searchTerm]')
                .type('corfu')
                .get('tr').should(($tr) => {
                    expect($tr).to.have.length(15)
                })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
                .get('[data-cy=searchTerm]')
                .should('have.text', '')
        })

        it('Go to an empty form', () => {
            cy.get('[data-cy=new').click()
                .location().should((path) => {
                    expect(path.href).to.include('customers/new')
                })
        })

        it('Go back to the customers list when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
                .url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('New', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Go to the customers list by clicking a link', () => {
            cy.gotoUrl('customers', 'customers')
        })

        it('Go to an empty form by clicking a button', () => {
            cy.gotoUrl('customers/new', 'new')
        })

        it('Description is not valid when blank', () => {
            cy.typeIntoField('description', 0)
                .elementShouldBeInvalid('description')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Description is not valid when too long', () => {
            cy.typeIntoField('description', 129)
                .elementShouldBeInvalid('description')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Profession is not valid when too long', () => {
            cy.typeIntoField('profession', 129)
                .elementShouldBeInvalid('profession')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Address is not valid when too long', () => {
            cy.typeIntoField('address', 129)
                .elementShouldBeInvalid('address')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Phones is not valid when too long', () => {
            cy.typeIntoField('phones', 129)
                .elementShouldBeInvalid('phones')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Person in charge is not valid when too long', () => {
            cy.typeIntoField('personInCharge', 129)
                .elementShouldBeInvalid('personInCharge')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Email is not in valid form', () => {
            cy.typeIntoField('email', 12)
                .elementShouldBeInvalid('email')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it.skip('Email is not valid when too long', () => {
            cy.typeIntoField('email', 129)
                .elementShouldBeInvalid('email')
                .elementShouldBeInvalid('form')
                .buttonShouldBeDisabled('save')
        })

        it('Mark record as not active', () => {
            cy.get('[data-cy=isActive]').click()
        })

        it('Choose not to abort when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
                .get('.mat-dialog-container')
                .get('[data-cy=cancel]').click()
                .url().should('eq', Cypress.config().baseUrl + '/customers/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.get('[data-cy=goBack]').click()
                .get('.mat-dialog-container')
                .get('[data-cy=ok]').click()
                .url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        it('Go to an empty form', () => {
            cy.get('[data-cy=new').click()
                .location().should((path) => {
                    expect(path.href).to.include('customers/new')
                })
        })

        it('Description is valid', () => {
            cy.typeIntoField('description', 12)
                .elementShouldBeValid('description')
                .elementShouldBeValid('form')
                .buttonShouldBeEnabled('save')
        })

        it('Save when the save button is clicked and display a snackbar', () => {
            cy.get('[data-cy=save]').click()
                .get('[data-cy=customSnackbar]')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

})