import { TransferViewModel } from './transfer-view-model'

export class TransferListResolved {

    constructor(public result: TransferViewModel, public error: any = null) { }

}
