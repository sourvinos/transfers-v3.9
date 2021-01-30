import moment from 'moment'
import { TransferService } from './transfer.service'
import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })

export class TransferChartService {

    //#region variables

    private xAxis = []
    private yAxis = { yAxisCurrent: [], yAxisPrevious: [] }
    private personsPerDate = []
    private personsPerYear = []

    //#endregion

    constructor(private transferService: TransferService) { }

    public async createXAxis(period: string): Promise<string[]> {
        switch (period) {
            case 'period':
                return this.createXAxisPeriod()
            case 'mtd':
                return this.createXAxisMTD()
            case 'ytd':
                return this.createXAxisYTD()
        }
    }

    public async verticalAxis(period: string, fromDate: string, toDate: string): Promise<any> {
        switch (period) {
            case 'period':
                await this.loadPersonsGroupByYear('personsPerYear', fromDate, toDate, period).then((response) => {
                    this.personsPerYear = response
                    this.yAxis.yAxisCurrent = this.createYAxis(this.personsPerYear, this.xAxis)
                })
                await this.loadPersonsGroupByYear('personsPerYear', fromDate, toDate, period, true).then((response) => {
                    this.personsPerYear = response
                    this.yAxis.yAxisPrevious = this.createYAxis(this.personsPerYear, this.xAxis)
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

    private loadPersonsGroupByYear(viewModel: string, fromDate: string, toDate: string, period: string, lastYear?: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getPersonsPerYear(this.periodSelector(period, fromDate, toDate, lastYear)[0], this.periodSelector(period, fromDate, toDate, lastYear)[1]).toPromise().then((
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
        const from = lastYear ? this.formatDateToISO(date, true) : this.formatDateToISO(date)
        return from
    }

    private getPeriodTo(toDate: string, lastYear?: boolean): string {
        const date = new Date(toDate)
        const to = lastYear ? this.formatDateToISO(date, true) : this.formatDateToISO(date)
        return to
    }

    private getMTDFrom(lastYear?: boolean): string {
        const date = new Date()
        const from = lastYear ? this.getLastYear(date.getFullYear()) + '-' + this.getCurrentMonth() + '-' + '01' : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + '01'
        return from
    }

    private getMTDTo(lastYear?: boolean): string {
        const date = new Date()
        const to = lastYear ? this.getLastYear(date.getFullYear()) + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
        return to
    }

    private getYTDFrom(lastYear?: boolean): string {
        const date = new Date()
        return lastYear ? this.getLastYear(date.getFullYear()) + '-01-01' : this.getCurrentYear() + '-01-01'
    }

    private getYTDTo(lastYear?: boolean): string {
        const date = new Date()
        return lastYear ? this.getLastYear(date.getFullYear()) + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
    }

    private getLastYear(currentYear: number): string {
        return (currentYear - 1).toString()
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

    private createXAxisPeriod(): string[] {
        this.xAxis = []
        this.xAxis.push('0001-01-01')
        return this.xAxis
    }

    private createXAxisMTD(): string[] {
        this.xAxis = []
        const today = new Date()
        for (let index = 1; index <= today.getDate(); index++) {
            const day = '0' + index
            const month = '0' + today.getMonth() + 1
            const year = today.getFullYear()
            this.xAxis.push(year + '-' + month.substr(month.length - 2, 2) + '-' + day.substr(day.length - 2, 2))
        }
        return this.xAxis
    }

    private createXAxisYTD(): string[] {
        this.xAxis = []
        const today = new Date()
        for (let index = 1; index <= 12; index++) {
            const month = '0' + index
            const year = today.getFullYear()
            this.xAxis.push(year + '-' + month.substr(month.length - 2, 2))
        }
        return this.xAxis
    }

    private formatDateToISO(input: any, lastYear?: boolean): string {
        const day = '0' + input.getDate()
        const month = '0' + (input.getMonth() + 1)
        const year = lastYear ? input.getFullYear() - 1 : input.getFullYear()
        const date = year + '-' + (month.substr(month.length - 2, 2)) + '-' + day.substr(day.length - 2, 2)
        return date
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
