import { KeyValuePair } from 'src/app/shared/classes/keyValuePair'
import { Port } from 'src/app/ports/classes/port'

export class Route extends KeyValuePair {
    description: string
    fullDescription: string
    port: Port
    isActive: boolean
}
