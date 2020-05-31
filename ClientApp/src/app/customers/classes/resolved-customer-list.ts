import { Customer } from './customer';

export class ResolvedCustomerList {

    constructor(public customerList: Customer[], public error: any = null) { }

}
