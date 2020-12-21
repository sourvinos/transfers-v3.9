import { Component, Input } from '@angular/core'
import { MapService } from '../../services/map.service'
import * as L from 'leaflet'

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent {

    @Input() color = ''

    private map: L.Map

    constructor(private mapService: MapService) { }

    ngAfterViewInit(): void {
        this.initMap()
    }

    private initMap(): void {
        this.map = L.map('map').setView([39.621755478534524, 19.918298721313477], 15)
        const tiles = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
            maxZoom: 20
        })
        this.map.on('click', (location: L.LocationEvent) => {
            this.mapService.addMarker(this.map, location, this.color)
        })
        tiles.addTo(this.map)
    }

}
