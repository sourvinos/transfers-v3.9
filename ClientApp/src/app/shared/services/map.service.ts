import { Injectable } from '@angular/core'
import "leaflet.markercluster"
import * as L from 'leaflet'


@Injectable({
    providedIn: 'root'
})

export class MapService {

    private blue = new L.Icon({ iconUrl: 'assets/images/markers/blue.svg', iconSize: [20, 20] })
    private gold = new L.Icon({ iconUrl: 'assets/images/markers/gold.svg', iconSize: [20, 20] })
    private red = new L.Icon({ iconUrl: 'assets/images/markers/red.svg', iconSize: [20, 20] })
    private green = new L.Icon({ iconUrl: 'assets/images/markers/green.svg', iconSize: [20, 20] })
    private orange = new L.Icon({ iconUrl: 'assets/images/markers/orange.svg', iconSize: [20, 20] })
    private yellow = new L.Icon({ iconUrl: 'assets/images/markers/yellow.svg', iconSize: [20, 20] })
    private violet = new L.Icon({ iconUrl: 'assets/images/markers/violet.svg', iconSize: [20, 20] })
    private grey = new L.Icon({ iconUrl: 'assets/images/markers/grey.svg', iconSize: [20, 20] })

    addMarker(map: L.Map, location: L.LocationEvent, color: string): void {
        const marker = L.marker(new L.LatLng(location.latlng.lat, location.latlng.lng), { draggable: true }).addTo(map)
        marker
            .setIcon(this[color])
            .on('dragend', () => {
                console.log(marker.getLatLng().lat.toFixed(3))
                console.log(marker.getLatLng().lng.toFixed(3))
            })
            .on('click', () => {
                marker.remove()
            })

    }

}
