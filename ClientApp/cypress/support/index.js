import './commands'
import './customer-commands'
import './destination-commands'
import './driver-commands'
import './transfer-commands'
import './pickupPoint-commands'
import './port-commands'
import './route-commands'
import './user-commands'

Cypress.on('uncaught:exception', () => {
    return false
})
