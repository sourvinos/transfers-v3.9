context('Customers', () => {

    before(() => {
        cy.visit('/')
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('Login', () => {
            cy.login()
        })

        it('Goto the customers list from the home page', () => {
            cy.gotoUrl('customers', 'customers')
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

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe.skip('New', () => {

        describe.skip('New customer without save', () => {

            beforeEach(() => {
                cy.restoreLocalStorage()
            })
    
            it('Login', () => {
                cy.login()
            })
    
            it('Goto the customers list', () => {
                cy.gotoUrl('customers', 'customers')
            })
    
            it('Go to an empty form', () => {
                cy.gotoUrl('customers/new', 'new')
            })

            it('Description is not valid when blank', () => {
                cy.typeGibberish('description', 0)
                    .elementShouldBeInvalid('description')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Description is not valid when too long', () => {
                cy.typeGibberish('description', 129)
                    .elementShouldBeInvalid('description')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Profession is not valid when too long', () => {
                cy.typeGibberish('profession', 129)
                    .elementShouldBeInvalid('profession')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Address is not valid when too long', () => {
                cy.typeGibberish('address', 129)
                    .elementShouldBeInvalid('address')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Phones is not valid when too long', () => {
                cy.typeGibberish('phones', 129)
                    .elementShouldBeInvalid('phones')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Person in charge is not valid when too long', () => {
                cy.typeGibberish('personInCharge', 129)
                    .elementShouldBeInvalid('personInCharge')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Email is not valid', () => {
                cy.typeGibberish('email', 12)
                    .elementShouldBeInvalid('email')
                    .elementShouldBeInvalid('form')
                    .buttonShouldBeDisabled('save')
            })

            it('Email is not valid when too long', () => {
                cy.typeGibberish('email', 129)
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

            afterEach(() => {
                cy.saveLocalStorage()
            })

        })

        describe('New customer with save', () => {

            beforeEach(() => {
                cy.restoreLocalStorage()
            })
    
            it('Login', () => {
                cy.login()
            })

            it('Goto the customers list', () => {
                cy.gotoUrl('customers', 'customers')
            })

            it('Go to an empty form', () => {
                cy.get('[data-cy=new').click()
                    .location().should((path) => {
                        expect(path.href).to.include('customers/new')
                    })
            })

            it('Description is valid', () => {
                cy.typeGibberish('description', 12)
                    .elementShouldBeValid('description')
                    .elementShouldBeValid('form')
                    .buttonShouldBeEnabled('save')
            })

            it('Save and display a snackbar', () => {
                cy.get('[data-cy=save]').click()
                    .get('[data-cy=customSnackbar]')
            })

            it('Goto the customer list', () => {
                cy.get('[data-cy="goBack"]').click()
                    .url().should('eq', Cypress.config().baseUrl + '/customers')
            })

            afterEach(() => {
                cy.saveLocalStorage()
            })

        })

    })

})