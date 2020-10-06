import { KeyValuePair } from 'src/app/shared/classes/keyValuePair'

export class Customer extends KeyValuePair {
    name: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean
}
