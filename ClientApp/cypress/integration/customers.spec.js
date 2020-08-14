context('Customers', () => {

    before(() => {
        cy.login()
    })

    context('Customer list', () => {

        it('Should got to the customers list', () => {
            cy.get('[data-cy=customers]').click()
            cy.url().should('eq', Cypress.config().baseUrl + '/customers')
            cy.get('h1').contains('Customers')
        })

        it('Should hava a home button', () => {
            cy.get('[data-cy=goBack]')
        })

        it('Should have a search box', () => {
            cy.get('[data-cy=searchTerm]').should('exist')
        })

        it('Should filter the list by typing in the search box', () => {
            cy.get('[data-cy=searchTerm]')
                .type('corfu')
                .get('tr')
                .should(($tr) => {
                    expect($tr).to.have.length(15)
                })
        })

        it('Should clear the filter when the "X" is clicked', () => {
            cy.get('[data-cy=clearFilter').click()
            cy.get('[data-cy=searchTerm]')
                .should('have.text', '')
        })
    })

    context('Customer new form', () => {

        it('Should go to an empty form', () => {
            cy.get('[data-cy=new').click()
            cy.location().should((path) => {
                expect(path.href).to.include('/customers/new')
            })
        })

        it('Should show error when description is left blank', () => {
            cy.get('[data-cy=description]')
                .clear()
                .type('{enter}')
                .should('have.class', 'ng-invalid')
            cy.get('[data-cy=form')
                .should('have.class', 'ng-invalid')
            cy.get('[data-cy=save')
                .should('have.attr', 'disabled')
        })

        it('Should show error when description is too long', () => {
            cy.get('[data-cy=description]')
                .clear()
                .type('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890{enter}')
                .should('have.class', 'ng-invalid')
            cy.get('[data-cy=form')
                .should('have.class', 'ng-invalid')
            cy.get('[data-cy=save')
                .should('have.attr', 'disabled')
        })

        it('Should clear the error when description is valid', () => {
            cy.get('[data-cy=description]')
                .clear()
                .type('1234567890{enter}')
                .should('not.have.class', 'ng-invalid')
            cy.get('[data-cy=form')
                .should('not.have.class', 'ng-invalid')
            cy.get('[data-cy=save]')
                .should('not.have.attr', 'disabled')
        })

        it('Should show confirmation message', () => {
            cy.get('[data-cy=goBack]').click()
            cy.get('.mat-dialog-container')
        })

    })

})
