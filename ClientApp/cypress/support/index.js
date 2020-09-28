import './commands'
import './customer-commands'
import './destination-commands'
import './driver-commands'
import './transfer-commands'

Cypress.on('uncaught:exception', () => {
    return false
})
