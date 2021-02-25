import { Injectable } from '@angular/core'
import { InteractionService } from './interaction.service'
import * as signalR from '@aspnet/signalr'

@Injectable({ providedIn: 'root' })

export class HubService {

    private connection = new signalR.HubConnectionBuilder().withUrl("/transfers").build()

    constructor(private interactionService: InteractionService) { }

    public startConnection(): void {
        this.connection.start()
        this.connection.on('BroadcastMessage', (data) => {
            this.interactionService.updateRecordCount(data)
        })
    }

    public SendData(message: string): void {
        this.connection.invoke('BroadcastData', message)
    }

}
