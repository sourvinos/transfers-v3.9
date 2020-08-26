import './commands'
import './customer-commands'
import './transfer-commands'

Cypress.on('uncaught:exception', () => {
    return false
})
