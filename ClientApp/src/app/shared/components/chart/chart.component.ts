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

    private newXAxis = []

    //#endregion

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

    private createChart(): Chart {
        return new Chart("myChart", {
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
    }

    private createPeriod(): void {
        this.newXAxis = this.xAxis
    }

    private createMTD(): void {
        const today = new Date()
        this.newXAxis = []
        for (let index = 1; index <= this.getLastDayOfMonth(today.getFullYear(), (today.getMonth() + 1)); index++) {
            const day = '0' + index
            this.newXAxis.push(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day.substr(day.length - 2, 2))
        }
    }

    private createYTD(): void {
        const today = new Date()
        this.newXAxis = []
        for (let index = 1; index <= 12; index++) {
            this.newXAxis.push(today.getFullYear() + '-' + index)
        }
    }

    private getLastDayOfMonth(year: number, month: number): any {
        return new Date(year, month, 0).getDate()
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
