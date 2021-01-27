import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Component } from '@angular/core'
import { DestinationService } from 'src/app/destinations/classes/destination.service'

@Component({
    selector: 'app-record-count',
    templateUrl: './record-count.component.html',
    styleUrls: ['./record-count.component.css']
})

export class RecordCountComponent {

    public recordCount = 0

    constructor(private destinationService: DestinationService, private interactionService: InteractionService) { }

    public getCount(): void {
        this.destinationService.getCount().subscribe(result => {
            this.recordCount = result
        })
    }

    // ngDoCheck(): any {
    //     this.interactionService.recordCount.subscribe(result => {
    //         this.recordCount = result
    //     })
    // }

}
