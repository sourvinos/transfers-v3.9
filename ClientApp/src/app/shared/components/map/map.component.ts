import { Component, EventEmitter, Input, Output } from '@angular/core'
import * as L from 'leaflet'
import "leaflet.markercluster"

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent {

    //#region variables

    @Input() color = ''
    @Input() coordinates = ''
    @Input() pickupPoints = []
    @Output() outputCoordinates = new EventEmitter()

    private map: L.Map
    private center = '39.644354136277705,19.85363602638245'
    private red = new L.Icon({ iconUrl: 'assets/images/markers/red.svg', iconSize: [20, 20] })

    //#endregion

    //#region lifecycle hooks

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initMap()
            this.getMarkers()
        }, 1000)
    }

    //#endregion

    //#region private methods

    private getMarkers(): void {
        const markers = L.markerClusterGroup()
        this.pickupPoints.forEach(element => {
            if (element != '') {
                const lat = parseFloat(element.split(',')[0])
                const lon = parseFloat(element.split(',')[1])
                const marker = L.marker(new L.LatLng(lat, lon), { icon: this.red, draggable: true })
                marker
                    .on('dragend', () => this.outputCoordinates.emit(marker.getLatLng()))
                    .on('click', () => marker.remove())
                markers.addLayer(marker), { draggable: true, }
            }
        })
        this.map.addLayer(markers)
    }

    private initMap(): void {
        const lat = parseFloat(this.center.split(',')[0])
        const lon = parseFloat(this.center.split(',')[1])
        this.map = L.map('map', {
            center: [lat, lon],
            zoom: 10
        })
        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic291cnZpbm9zIiwiYSI6ImNrajEwa3plbDRzY2gzMnFqcXppZzNhaDkifQ.JMR_dEvdaFTpQ2jiapPrhg', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/satellite-streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic291cnZpbm9zIiwiYSI6ImNrajEwa3plbDRzY2gzMnFqcXppZzNhaDkifQ.JMR_dEvdaFTpQ2jiapPrhg'
        })
        tiles.addTo(this.map)
    }

    //#endregion

}
