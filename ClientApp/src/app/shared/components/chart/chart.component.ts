import { HelperService } from './../../services/helper.service'
import { Component, Input, SimpleChanges } from '@angular/core'
import { Chart } from 'chart.js'

@Component({
    selector: 'chart-component',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent {

    //#region variables

    @Input() period: string
    @Input() xAxis: string[]
    @Input() yAxis: number[]
    @Input() yAxisLastYear: number[]

    private chart: Chart
    private newXAxis = []

    //#endregion

    constructor(private helperService: HelperService) { }

    //#region lifecycle hooks

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            if (this.period == 'period') this.createPeriod()
            if (this.period == 'mtd') this.createMTD()
            if (this.period == 'ytd') this.createYTD()
            this.createChart()
        }
    }

    //#endregion

    //#region private methods

    private createChart(): any {
        this.chart = new Chart("myChart", {
            type: 'bar',
            data: {
                // labels: this.updateXAxisLocale(),
                labels: this.xAxis,
                datasets: [
                    {
                        barPercentage: 1,
                        backgroundColor: this.updateBarColor(),
                        label: this.getYear(),
                        data: this.yAxis,
                        hoverBackgroundColor: this.updateBarColor()
                    },
                    {
                        barPercentage: 0.5,
                        backgroundColor: this.updateBarColor('lastYear'),
                        label: this.getYear(true),
                        data: this.yAxisLastYear,
                        hoverBackgroundColor: this.updateBarColor('lastYear')
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0
                },
                events: ['click'],
                scales: {
                    xAxes: [
                        {
                            gridLines: { color: getComputedStyle(document.body).getPropertyValue('--color-chart-gridLines') },
                            ticks: {
                                fontColor: getComputedStyle(document.body).getPropertyValue('--color-chart-labels'),
                                fontFamily: getComputedStyle(document.body).getPropertyValue('--font-family-charts'),
                                fontSize: parseInt(getComputedStyle(document.body).getPropertyValue('--font-size-charts-xAxis'))
                            },
                        }],
                    yAxes: [{
                        gridLines: { color: getComputedStyle(document.body).getPropertyValue('--color-chart-gridLines') },
                        ticks: {
                            fontColor: getComputedStyle(document.body).getPropertyValue('--color-chart-labels'),
                            fontFamily: getComputedStyle(document.body).getPropertyValue('--font-family-charts'),
                            fontSize: parseInt(getComputedStyle(document.body).getPropertyValue('--font-size-charts-yAxis'))
                        },
                    }]
                },
                legend: {
                    labels: {
                        fontColor: getComputedStyle(document.body).getPropertyValue('--color-chart-labels'),
                    }
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                },
                maintainAspectRatio: false
            }
        })
        return this.chart
    }

    private createPeriod(): void {
        this.newXAxis = this.xAxis
    }

    private createMTD(): void {
        const today = new Date()
        this.newXAxis = []
        for (let index = 1; index <= today.getDate(); index++) {
            const day = '0' + index
            this.newXAxis.push(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day.substr(day.length - 2, 2))
        }
    }

    private createYTD(): void {
        const today = new Date()
        this.newXAxis = []
        for (let index = 1; index <= 12; index++) {
            const month = '0' + index
            this.newXAxis.push(today.getFullYear() + '-' + month.substr(month.length - 2, 2))
        }
    }

    private getYear(lastYear?: boolean): string {
        return lastYear ? (new Date().getFullYear() - 1).toString() : (new Date().getFullYear()).toString()
    }

    private updateBarColor(period?: string): string[] {
        const barColor = []
        for (let i = 1; i <= this.xAxis.length; i++) {
            barColor.push(getComputedStyle(document.body).getPropertyValue(period == null ? '--color-chart-bar' : '--color-chart-bar-lastYear'))
        }
        return barColor
    }

    //#endregion

}
