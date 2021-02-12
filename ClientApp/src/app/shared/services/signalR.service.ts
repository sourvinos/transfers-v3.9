import { Injectable } from '@angular/core'
import * as signalR from '@aspnet/signalr'

@Injectable({ providedIn: 'root' })

export class SignalRService {

    private connection = new signalR.HubConnectionBuilder().withUrl("/destinations").build()

    public startConnection(): void {
        this.connection.on('Send', (data: any) => { console.log(data) })
        this.connection.on('ReceiveMessage', (data: any) => { console.log(data) })
        this.connection.start().then(() => { console.log("Connected") })
    }

    public SendData(message: string): void {
        this.connection.invoke('SendMessageToAll', message)
    }

}
