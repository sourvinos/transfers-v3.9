import { Component, Input } from '@angular/core'
import { TransferOverviewDetailsViewModel } from './../../classes/transfer-overview-details-view-model'

@Component({
    selector: 'overview-details',
    templateUrl: './overview-details.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css', './overview-details.component.css']
})

export class OverviewDetailsComponent {

    @Input() isDataFound: boolean
    @Input() isLoaderVisible: boolean
    @Input() records = new TransferOverviewDetailsViewModel()

    public feature = 'overviewDetails'

    headers = ['', 'description', 'persons', 'percent', '']
    widths = ['0px', '70%', '15%', '15%', '']
    visibility = ['none', '', '', '', 'none']
    justify = ['center', 'left', 'right', 'right', 'center']
    fields = ['', 'description', 'persons', 'percent', '']
    types = ['', '', '', 'percent', '']

}
