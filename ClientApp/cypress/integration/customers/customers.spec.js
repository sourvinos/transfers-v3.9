context('Customers', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        cy.gotoCustomerListWithSuccess()
    })

    describe('List', () => {

        beforeEach(() => {
            cy.restoreLocalStorage()
        })

        it('The table has an exact number of rows and columns', () => {
            cy.get('[data-cy=row]').should('have.length', 141)
            cy.get('[data-cy=column]').should('have.length', 6)
        })

        it('Filter the table by typing in the search box', () => {
            cy.get('[data-cy=searchTerm]').type('travel')
            cy.get('[data-cy=row]').should(rows => {
                expect(rows).to.have.length(55)
            })
        })

        it('Clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]').should('have.text', '')
            cy.get('[data-cy=row]').should((rows) => {
                expect(rows).to.have.length(141)
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
            cy.get('[data-cy=new]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
        })

        it('Name is valid', () => {
            cy.typeGibberish('description', 12).elementShouldBeValid('nadescriptionme')
        })

        it('Form is valid', () => {
            cy.buttonShouldBeEnabled('save')
        })

        it('Create and display a snackbar', () => {
            cy.createCustomerRecord()
        })

        it('Go back to the list', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=goBack]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
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
            cy.readCustomerRecord()
        })

        it('Update record', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.updateCustomerRecord()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
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
            cy.readCustomerRecord()
        })

        it('Ask to delete and abort', () => {
            cy.clickOnDeleteAndAbort()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/222')
        })

        it('Ask to delete and continue', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.deleteCustomerRecord()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

        afterEach(() => {
            cy.saveLocalStorage()
        })

    })

    describe('Validate form', () => {
  
        it('Goto an empty form', () => {
            cy.get('[data-cy=new]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
        })

        it('Correct number of fields', () => {
            cy.get('[data-cy=form]').find('.mat-form-field').should('have.length', 6)
            cy.get('[data-cy=form]').find('.mat-slide-toggle').should('have.length', 1)
        })

        it('Name is not valid when blank', () => {
            cy.typeGibberish('description', 0).elementShouldBeInvalid('description')
        })

        it('Description is not valid when too long', () => {
            cy.typeGibberish('description', 129).elementShouldBeInvalid('description')
        })

        it('Profession is not valid when too long', () => {
            cy.typeGibberish('profession', 129).elementShouldBeInvalid('profession')
        })

        it('Address is not valid when too long', () => {
            cy.typeGibberish('address', 129).elementShouldBeInvalid('address')
        })

        it('Phones is not valid when too long', () => {
            cy.typeGibberish('phones', 129).elementShouldBeInvalid('phones')
        })

        it('Person in charge is not valid when too long', () => {
            cy.typeGibberish('personInCharge', 129).elementShouldBeInvalid('personInCharge')
        })

        it('Email is not valid', () => {
            cy.typeGibberish('email', 12).elementShouldBeInvalid('email')
        })

        it('Email is not valid when too long', () => {
            cy.typeGibberish('email', 129).elementShouldBeInvalid('email')
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
            cy.url().should('eq', Cypress.config().baseUrl + '/customers/new')
        })

        it('Choose to abort when the back icon is clicked', () => {
            cy.server()
            cy.route('GET', Cypress.config().baseUrl + '/api/customers', 'fixture:customers.json').as('getCustomers')
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
            cy.get('[data-cy=ok]').click()
            cy.wait('@getCustomers').its('status').should('eq', 200)
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
        })

    })

    after(() => {
        cy.logout()
    })

})