import { Injectable } from '@angular/core'
import { HelperService } from './helper.service'
import * as signalR from '@aspnet/signalr'
import { InteractionService } from './interaction.service'

@Injectable({ providedIn: 'root' })

export class HubService {

    private connection = new signalR.HubConnectionBuilder().withUrl("/destinations").build()

    constructor(private helperService: HelperService, private interactionService: InteractionService) { }

    public startConnection(): void {
        this.connection.start().then(() => {
            this.connection.invoke('GetConnectionId').then((result) => {
                this.helperService.saveItem('connectionId', result)
            })
        })
        // 'BroadcastMessage' will be sent from the controller (Backend)
        this.connection.on('BroadcastMessage', (data) => {
            console.log('From the backend', data)
            this.interactionService.updateRecordCount(data)
        })
        this.connection.on('UserConnected', (connectionId) => {
            console.log('Connected', connectionId)
        })
        this.connection.on('UserDisconnected', () => {
            // console.log('Disconnected', data)
        })
    }

    /**
     * 'SendData' will be called from a form whenever needed (Frontend)
     * 'BroadcastData' is a hub method (Backend)
     */
    public SendData(message: string): void {
        this.connection.invoke('BroadcastData', message)
    }

    public SendDataToUser(connectionId: string, message: string): void {
        this.connection.invoke('BroadcastDataToUser', connectionId, message)
    }

    public async GetConnectionId(): Promise<any> {
        this.connection.invoke('GetConnectionId').then((result) => {
            console.log("Connected", result)
        })
    }

}
