context('Users - Update', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Goto the list', () => {
        cy.gotoUserListWithSuccess()
    })

    it('Read record', () => {
        cy.readUserRecord()
    })

    it('Update record', () => {
        cy.updateUserRecord()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
