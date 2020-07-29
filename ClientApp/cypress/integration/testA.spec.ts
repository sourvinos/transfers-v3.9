describe('TestA', () => {

    before(() => {
        cy.clearLocalStorageSnapshot()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Says hello', () => {
        cy.visit('/login')
        cy.get('#userName').clear().type('sourvinos')
        cy.get('#password').clear().type('1234567890')
        cy.get('#login').click()
        cy.log('Hello')
        cy.saveLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})