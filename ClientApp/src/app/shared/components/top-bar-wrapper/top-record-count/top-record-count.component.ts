import { Component } from '@angular/core'
import { DestinationService } from 'src/app/destinations/classes/destination.service'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'top-record-count',
    templateUrl: './top-record-count.component.html',
    styleUrls: ['./top-record-count.component.css']
})

export class TopRecordCountComponent {

    public recordCount = 0
    public previousRecordCount = 0
    public difference = 0
    public loginStatus: boolean
    private firstRead: boolean
    public latest: number

    constructor(private accountService: AccountService, private interactionService: InteractionService, private destinationService: DestinationService) { }

    ngOnInit(): void {
        this.firstRead = true
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
    }

    ngDoCheck(): void {
        if (this.loginStatus) {
            if (this.firstRead) {
                this.destinationService.getCount().subscribe(result => {
                    this.firstRead = false
                    this.latest = result
                    this.difference = 0
                })
            } else {
                this.interactionService.recordCount.subscribe(result => {
                    this.difference = result - this.latest
                })
            }
        }
    }

}
