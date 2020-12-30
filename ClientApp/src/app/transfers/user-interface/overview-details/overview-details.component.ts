import { Component, Input } from '@angular/core'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { TransferOverviewDetailsViewModel } from './../../classes/transfer-overview-details-view-model'

@Component({
    selector: 'overview-details',
    templateUrl: './overview-details.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css', './overview-details.component.css']
})

export class OverviewDetailsComponent {

    //#region variables
    @Input() isDataFound: boolean
    @Input() isLoaderVisible: boolean
    @Input() records = new TransferOverviewDetailsViewModel()

    public feature = 'overviewDetails'

    //#endregion

    //#region table

    headers = ['', 'description', 'persons', 'percent', '']
    widths = ['0px', '70%', '15%', '15%', '']
    visibility = ['none', '', '', '', 'none']
    justify = ['center', 'left', 'right', 'right', 'center']
    types = ['', '', '', 'percent', '']
    fields = ['', 'description', 'persons', 'percent', '']

    //#endregion

    constructor(private messageLabelService: MessageLabelService) { }

    //#region public methods
    
    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion

}
