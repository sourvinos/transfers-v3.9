import * as L from 'leaflet'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import "leaflet-easybutton"
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
    @Output() isFullScreen = new EventEmitter()
    @Output() outputCoordinates = new EventEmitter()

    private map: L.Map
    private bounds = [39.821062382395915, 19.528198242187504, 39.337351150575174, 20.17772605800193]
    private red = new L.Icon({ iconUrl: 'assets/images/markers/red.svg', iconSize: [30, 30] })

    //#endregion

    //#region lifecycle hooks

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initMap()
            this.getMarkers()
        }, 1000)
    }

    //#endregion

    //#region public methods

    public onFullscreen(): void {
        const formWrapperHeight = document.getElementById('form-wrapper').offsetHeight
        const formWrapperWidth = document.getElementById('form-wrapper').offsetWidth
        const topBarHeight = document.getElementById('top-bar').offsetHeight
        const sideBarWidth = document.getElementById('side-bar').offsetWidth
        document.getElementById('map-wrapper').style.height = formWrapperHeight + 'px'
        document.getElementById('map-wrapper').style.width = formWrapperWidth + 8 + 'px'
        document.getElementById('map-wrapper').style.top = topBarHeight + 'px'
        document.getElementById('map-wrapper').style.left = sideBarWidth + 'px'
        document.getElementById('map-wrapper').style.position = 'fixed'
        document.getElementById('map-container').style.width = '100%'
        document.getElementById('map-container').style.height = '100%'
        document.getElementById('map-container').style.paddingBottom = '2rem'
        setTimeout(() => {
            this.map.invalidateSize()
        }, 700)
    }

    public onFullscreenExit(): void {
        document.getElementById('map-container').style.width = '500px'
        document.getElementById('map-wrapper').style.width = '500px'
        document.getElementById('map-wrapper').style.height = '100%'
        document.getElementById('map-wrapper').style.position = 'initial'
        this.map.invalidateSize()
    }

    public onZoomIn(): void {
        this.map.setZoom(this.map.getZoom() + 1)
    }

    public onZoomOut(): void {
        this.map.setZoom(this.map.getZoom() - 1)
    }

    public onZoomToBounds(): void {
        this.map.fitBounds([
            [this.bounds[0], this.bounds[1]],
            [this.bounds[2], this.bounds[3]]
        ], { padding: [50, 50] })
    }

    //#endregion

    //#region private methods

    private customToolTip(element: { description: string; time: string }): string {
        const tooltip =
            '<div id="customTooltip">' +
            '<h2>Pickup point: ' + element.description + '</h2>' +
            '<h2>Time: ' + element.time + '</h2>' +
            '</div>'
        return tooltip
    }

    private getMarkers(): void {
        const markers = L.markerClusterGroup({ zoomToBoundsOnClick: true })
        this.pickupPoints.forEach(element => {
            if (element.coordinates != '') {
                const lat = parseFloat(element.coordinates.split(',')[0])
                const lon = parseFloat(element.coordinates.split(',')[1])
                const marker = L.marker(new L.LatLng(lat, lon), { icon: this.red, draggable: true })
                marker
                    .bindTooltip(this.customToolTip(element), { className: 'leaflet-tooltip' }).openTooltip()
                    // .bindPopup(this.customToolTip(element))
                    .on('dragend', () => this.outputCoordinates.emit(marker.getLatLng()))
                    .on('click', () => this.zoomToMarker(lat, lon))
                markers.addLayer(marker), { draggable: true, }
            }
        })
        this.map.addLayer(markers)
    }

    private initMap(): void {
        this.map = L.map('map', {
            zoomControl: false,
            zoomSnap: 0,
        })
        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic291cnZpbm9zIiwiYSI6ImNrajEwa3plbDRzY2gzMnFqcXppZzNhaDkifQ.JMR_dEvdaFTpQ2jiapPrhg', {
            accessToken: 'pk.eyJ1Ijoic291cnZpbm9zIiwiYSI6ImNrajEwa3plbDRzY2gzMnFqcXppZzNhaDkifQ.JMR_dEvdaFTpQ2jiapPrhg',
            attribution: '',
            id: 'mapbox/satellite-streets-v11',
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
        })
        tiles.addTo(this.map)
        this.onZoomToBounds()
    }

    private zoomToMarker(lat: number, lon: number): void {
        this.map.setView(new L.LatLng(lat, lon), this.map.getMaxZoom())
    }

    //#endregion

}
