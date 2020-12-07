import { Component, Input } from '@angular/core'
import { TransferOverviewDetailsViewModel } from './../../classes/transfer-overview-details-view-model'

@Component({
    selector: 'overview-details',
    templateUrl: './overview-details.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css', './overview-details.component.css']
})

export class OverviewDetailsComponent {

    public feature = 'overviewDetails'

    headers = ['', 'description', 'persons', 'percent', '']
    widths = ['0px', '80%', '10%', '10%', '']
    visibility = ['none', '', '', '', 'none']
    justify = ['center', 'left', 'right', 'right', 'center']
    fields = ['', 'description', 'persons', 'percent', '']
    type = ['', '', '', 'percent', '']

    @Input() records = new TransferOverviewDetailsViewModel()

}
