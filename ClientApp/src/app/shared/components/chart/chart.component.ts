import { Component, Input } from '@angular/core'
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
    @Input() yAxisCurrent: number[]
    @Input() yAxisPrevious: number[]

    private chart: Chart
    private newXAxis = []

    //#endregion

    //#region lifecycle hooks

    ngOnChanges(): void {
        if (this.xAxis.length > 0) {
            if (this.period == 'period') {
                this.createPeriod()
                this.createChart()
            }
            if (this.period == 'mtd') {
                this.createMTD()
                this.xAxis = this.formatMTDxAxis()
                this.createChart()
            }
            if (this.period == 'ytd') {
                this.createYTD()
                this.xAxis = this.formatYTDxAxis()
                this.createChart()
            }
        }
    }

    //#endregion

    //#region private methods

    private createChart(): any {
        this.chart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.xAxis,
                datasets: [
                    {
                        barPercentage: 1,
                        backgroundColor: this.updateBarColor(),
                        label: this.getYear(),
                        data: this.yAxisCurrent,
                        hoverBackgroundColor: this.updateBarColor()
                    },
                    {
                        barPercentage: 0.5,
                        backgroundColor: this.updateBarColor('lastYear'),
                        label: this.getYear(true),
                        data: this.yAxisPrevious,
                        hoverBackgroundColor: this.updateBarColor('lastYear')
                    }
                ]
            },
            options: {
                animation: {
                    duration: 1000
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
            const month = '0' + today.getMonth() + 1
            this.newXAxis.push(today.getFullYear() + '-' + month.substr(month.length - 2, 2) + '-' + day.substr(day.length - 2, 2))
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
        if (this.xAxis.length > 0) {
            const year = parseInt(new Date().getFullYear().toString())
            return lastYear ? (year - 1).toString() : year.toString()
        }
    }

    private updateBarColor(period?: string): string[] {
        const barColor = []
        for (let i = 1; i <= this.xAxis.length; i++) {
            barColor.push(getComputedStyle(document.body).getPropertyValue(period == null ? '--color-chart-bar' : '--color-chart-bar-lastYear'))
        }
        return barColor
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

    private updateXAxisLocale(): string[] {
        this.newXAxis.forEach((element, index) => {
            this.newXAxis[index] = this.updateElementLocale(element.substr(5, 6))
        })
        return this.newXAxis
    }

    private formatPeriodxAxis(): string[] {
        this.xAxis.forEach((element, index) => {
            this.newXAxis[index] = (element.substr(5, 5))
        })
        return this.newXAxis
    }

    private formatMTDxAxis(): string[] {
        this.newXAxis.forEach((element, index) => {
            this.newXAxis[index] = (element.substr(8, 2))
        })
        return this.newXAxis
    }

    private formatYTDxAxis(): string[] {
        this.newXAxis.forEach((element, index) => {
            this.newXAxis[index] = (element.substr(5, 2))
        })
        return this.newXAxis
    }

    //#endregion

}
