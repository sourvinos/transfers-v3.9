import { KeyValuePair } from '../../shared/classes/keyValuePair'

export class Driver extends KeyValuePair {
    description: string
    phones: string
    isDefault: boolean
    isActive: boolean
}
