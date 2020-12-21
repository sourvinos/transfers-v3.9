import moment from 'moment'
import { TransferService } from './transfer.service'
import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })

export class TransferChartService {

    //#region variables

    private xAxis = []
    private yAxis = { yAxisCurrent: [], yAxisPrevious: [] }
    private personsPerDate = []

    //#endregion

    constructor(private transferService: TransferService) { }

    public async createXAxis(period: string, fromDate: string, toDate: string): Promise<string[]> {
        switch (period) {
            case 'period':
                this.createXAxisPeriod(fromDate, toDate)
                return this.updateXAxisLocale()
            case 'mtd':
                this.createXAxisMTD()
                return this.updateXAxisLocale()
            case 'ytd':
                this.createXAxisYTD()
                return this.updateXAxisLocale()
        }
    }

    public async verticalAxis(period: string, fromDate: string, toDate: string): Promise<any> {
        switch (period) {
            case 'period':
                await this.loadPersonsGroupByDate('personsPerDate', fromDate, toDate, period).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisCurrent = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                await this.loadPersonsGroupByDate('personsPerDate', fromDate, toDate, period, true).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisPrevious = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                return this.yAxis
            case 'mtd':
                await this.loadPersonsGroupByDate('personsPerDate', fromDate, toDate, period).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisCurrent = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                await this.loadPersonsGroupByDate('personsPerDate', fromDate, toDate, period, true).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisPrevious = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                return this.yAxis
            case 'ytd':
                await this.loadPersonsGroupByMonth('personsPerDate', fromDate, toDate, period).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisCurrent = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                await this.loadPersonsGroupByMonth('personsPerDate', fromDate, toDate, period, true).then((response) => {
                    this.personsPerDate = response
                    this.yAxis.yAxisPrevious = this.createYAxis(this.personsPerDate, this.xAxis)
                })
                return this.yAxis
        }
    }

    private createYAxis(personsPerDate: any[], xAxis: any[]): any[] {
        const array = []
        let dayHasPersons: boolean
        for (let index = 1; index <= xAxis.length; index++) {
            dayHasPersons = false
            for (let i = 1; i <= personsPerDate.length; i++) {
                // console.log(xAxis[index - 1], ' ** ', personsPerDate[i - 1].dateIn)
                if (xAxis[index - 1].substr(5, 5) == personsPerDate[i - 1].dateIn.substr(5, 5)) {
                    dayHasPersons = true
                    array.push(personsPerDate[i - 1].persons)
                }
            }
            if (dayHasPersons == false) {
                array.push(0)
            }
        }
        return array
    }

    private loadPersonsGroupByDate(viewModel: string, fromDate: string, toDate: string, period: string, lastYear?: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getPersonsPerDate(this.periodSelector(period, fromDate, toDate, lastYear)[0], this.periodSelector(period, fromDate, toDate, lastYear)[1]).toPromise().then((
                response => {
                    this[viewModel] = response
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private loadPersonsGroupByMonth(viewModel: string, fromDate: string, toDate: string, period: string, lastYear?: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getPersonsPerMonth(this.periodSelector(period, fromDate, toDate, lastYear)[0], this.periodSelector(period, fromDate, toDate, lastYear)[1]).toPromise().then((
                response => {
                    this[viewModel] = response
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private periodSelector(variable: string, fromDate: string, toDate: string, lastYear?: boolean): string[] {
        const dates = []
        switch (variable) {
            case 'period':
                dates[0] = this.getPeriodFrom(fromDate, lastYear)
                dates[1] = this.getPeriodTo(toDate, lastYear)
                break
            case 'mtd':
                dates[0] = this.getMTDFrom(lastYear)
                dates[1] = this.getMTDTo(lastYear)
                break
            case 'ytd':
                dates[0] = this.getYTDFrom(lastYear)
                dates[1] = this.getYTDTo(lastYear)
                break
        }
        return dates
    }

    private getPeriodFrom(fromDate: string, lastYear?: boolean): string {
        const date = new Date(fromDate)
        return lastYear ? this.getLastYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    private getPeriodTo(toDate: string, lastYear?: boolean): string {
        const date = new Date(toDate)
        return lastYear ? this.getLastYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    private getMTDFrom(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + '01' : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + '01'
    }

    private getMTDTo(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
    }

    private getYTDFrom(lastYear?: boolean): string {
        const me = lastYear ? this.getLastYear() + '-01-01' : this.getCurrentYear() + '-01-01'
        return me
    }

    private getYTDTo(lastYear?: boolean): string {
        const me = lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
        return me
    }

    private getLastYear(): string {
        return (moment().get('year') - 1).toString()
    }

    private getCurrentDay(): string {
        return ('0' + moment().date()).slice(-2)
    }

    private getCurrentMonth(): string {
        return ('0' + (moment().month() + 1)).slice(-2)
    }

    private getCurrentYear(): string {
        return moment().get('year').toString()
    }

    private createXAxisPeriod(fromDate: string, toDate: string): string[] {
        this.xAxis = []
        const _fromDate = new Date(fromDate)
        const _toDate = new Date(toDate)
        const days = (_toDate.getTime() - _fromDate.getTime()) / (1000 * 3600 * 24) + 1
        let dayOffset = 0
        while (dayOffset < days) {
            const date = new Date()
            date.setDate(_fromDate.getDate() + dayOffset)
            date.setMonth(_fromDate.getMonth())
            const day = '0' + date.getDate()
            const month = '0' + (date.getMonth() + 1)
            const year = date.getFullYear()
            this.xAxis.push(year + '-' + month.substr(month.length - 2, 2) + '-' + day.substr(day.length - 2, 2))
            dayOffset++
        }
        return this.xAxis
    }

    private createXAxisMTD(): string[] {
        this.xAxis = []
        const today = new Date()
        for (let index = 1; index <= today.getDate(); index++) {
            const day = '0' + index
            const me = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day.substr(day.length - 2, 2)
            this.xAxis.push(me)
        }
        return this.xAxis
    }

    private createXAxisYTD(): string[] {
        this.xAxis = []
        const today = new Date()
        for (let index = 1; index <= 12; index++) {
            const month = '0' + index
            const me = today.getFullYear() + '-' + month.substr(month.length - 2, 2)
            this.xAxis.push(me)
        }
        return this.xAxis
    }

    private updateXAxisLocale(): string[] {
        const newXAxis = []
        this.xAxis.forEach((element, index) => {
            newXAxis[index] = this.updateElementLocale(element)
        })
        return newXAxis
    }

    private updateElementLocale(element: string): any {
        const locale = localStorage.getItem('language')
        switch (locale) {
            case 'cs-CZ':
                return moment(element).format('D .M .yyyy')
            case 'de-DE':
                return moment(element).format('D.M.yyyy')
            case 'el-GR':
                return moment(element).format('D/M/yyyy')
            case 'en-GB':
                return moment(element).format('D/M/yyyy')
        }
    }

}
