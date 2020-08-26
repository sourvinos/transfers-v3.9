import './commands'
import './customer-commands'

Cypress.on('uncaught:exception', () => {
    return false
})
