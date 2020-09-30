import './commands'
import './customer-commands'
import './destination-commands'
import './driver-commands'
import './transfer-commands'
import './pickupPoint-commands'

Cypress.on('uncaught:exception', () => {
    return false
})
