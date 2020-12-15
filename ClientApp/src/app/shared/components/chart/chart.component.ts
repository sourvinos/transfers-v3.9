import { Component, Input, KeyValueDiffers, SimpleChanges } from '@angular/core'
import { Chart } from 'node_modules/chart.js'

@Component({
    selector: 'chart-component',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent {

    //#region variables

    @Input() xAxis: string[]
    @Input() yAxis: number[]
    @Input() yAxisLastYear: number[]

    private newXAxis = []
    private differ: any
    private backgroundColor = []

    //#endregion

    constructor(differs: KeyValueDiffers) {
        this.differ = differs.find([]).create()
    }

    //#region lifecycle hooks

    ngDoCheck(): void {
        // const changes = this.differ.diff(this.xAxis)
        // if (changes) {
        //     console.log('Changed...')
        // }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Detecting', changes)
        this.createMTD()
        // this.updateYAxis('yAxis', 'newYAxis')
        // this.update('newYAxisLastYear', 'yAxisLastYear')
        this.createChart()
    }

    //#endregion

    //#region private methods

    private createChart(): void {
        return new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.updateXAxisLocale(),
                datasets: [
                    {
                        barPercentage: 1,
                        backgroundColor: this.backgroundColor,
                        data: this.yAxis,
                        label: 'MTD',
                    }
                ]
            }
        })
    }

    private createMTD(): void {
        const today = new Date()
        this.newXAxis = []
        for (let index = 1; index <= today.getDate(); index++) {
            const day = '0' + index
            this.newXAxis.push(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day.substr(day.length - 2, 2))
        }
    }

    // private updateYAxis(axis: string, newAxis: string): void {
    //     this.yAxis.forEach((element, index) => {
    //         const found = this.newYAxis.find(x => x == element)
    //         if (found) {
    //             const position = this.newYAxis.indexOf(found)
    //             this[newAxis][position] = this[axis][index]
    //         }
    //     })
    //     // console.log('new yAxis', newAxis)
    // }

    private updateXAxisLocale(): string[] {
        this.newXAxis.forEach((element, index) => {
            this.newXAxis[index] = this.updateElementLocale(element.substr(5, 6))
        })
        return this.newXAxis
    }

    private updateElementLocale(element: string): string {
        const locale = localStorage.getItem('language')
        switch (locale) {
            case 'en-GB':
                return element.substr(3, 4) + '/' + element.substr(0, 2)
            case 'en-US':
                return element.replace('-', '/')
        }
    }

    //#endregion

}
