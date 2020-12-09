import moment from 'moment'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { Component, HostListener } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Title } from '@angular/platform-browser'
import { TransferOverviewViewModel } from '../../classes/transfer-overview-view-model'
import { TransferService } from '../../classes/transfer.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { TransferOverviewDetailsViewModel } from '../../classes/transfer-overview-details-view-model'

@Component({
    selector: 'transfer-overview',
    templateUrl: './transfer-overview.component.html',
    styleUrls: ['../../../../assets/styles/lists.css', './transfer-overview.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewComponent {

    //#region variables

    public period = new TransferOverviewViewModel; public lastYearPeriod = new TransferOverviewViewModel
    public MTD = new TransferOverviewViewModel; public lastYearMTD = new TransferOverviewViewModel
    public YTD = new TransferOverviewViewModel; public lastYearYTD = new TransferOverviewViewModel

    public details = new TransferOverviewDetailsViewModel
    public detailsLastYear = new TransferOverviewDetailsViewModel

    public isDataFound = false
    public isLoaderVisible = false

    public feature = 'transferOverviewWrapper'
    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    constructor(private buttonClickService: ButtonClickService, private dateAdapter: DateAdapter<any>, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private router: Router, private titleService: Title, private transferService: TransferService) { }

    @HostListener('window:resize', ['$event']) onResize(): any {
        this.setSidebarVisibility('hidden')
        this.setTopLogoVisibility('visible')
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.getLocale()
        this.initPeriod()
        this.loadStatistics('MTD', 'getMTDFrom', 'getMTDTo').then(() => { this.calculateStatisticPercents('MTD'); this.colorizePercent('MTD') })
        this.loadStatistics('YTD', 'getYTDFrom', 'getYTDTo').then(() => { this.calculateStatisticPercents('YTD'); this.colorizePercent('YTD') })
        this.setSidebarVisibility('hidden')
        this.setTopLogoVisibility('visible')
    }

    ngAfterViewInit(): void {
        this.focus('fromDate')
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.setSidebarVisibility()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onGetHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate(['/'])
    }

    public async onLoadDetails(period: string): Promise<void> {
        this.isDataFound = false
        this.isLoaderVisible = true
        await this.loadDetails('details', period)
        await this.loadDetails('detailsLastYear', period, true)
        this.clearActivePeriod()
        this.setActivePeriod(period)
        this.updateDetailsWithLastYear()
        this.isDataFound = this.details.totalPersonsPerCustomer.length > 0 ? true : false
        this.isLoaderVisible = false
    }

    public async onLoadStatisticsForPeriod(): Promise<void> {
        this.loadStatistics('period', 'getPeriodFrom', 'getPeriodTo').then(() => { this.calculateStatisticPercents('period'); this.colorizePercent('period') })
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': () => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.onGoBack()
                }
            },
            'Alt.S': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'search')
            }
        }, {
            priority: 1,
            inputs: true
        })
    }

    private calculatePercent(currentYearPersons: number, lastYearPersons: number): number {
        let percent = (100 * currentYearPersons / lastYearPersons) - 100
        switch (true) {
            case (percent == Infinity):
                percent = 100
                break
            case (isNaN(percent)):
                percent = 0
                break
        }
        return percent
    }

    private calculateStatisticPercents(period: string): void {
        this[period].percent = this.calculatePercent(this[period].persons, this['lastYear' + period].persons)
    }

    private clearActivePeriod(): void {
        const elements = document.querySelectorAll('.period-summary')
        elements.forEach(element => {
            element.classList.remove('active')
        })
    }

    private colorizePercent(period: string): void {
        switch (true) {
            case (this[period].percent == 0 || isNaN(this[period].percent)):
                this[period].color = 'blue'
                break
            case (this[period].percent == Infinity || this[period].percent > 0):
                this[period].color = 'green'
                break
            case (this[period].percent < 0):
                this[period].color = 'red'
        }
    }

    private focus(field: string): void {
        this.helperService.setFocus(field)
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

    private getLastYear(): string {
        return (moment().get('year') - 1).toString()
    }

    private getLocale(): void {
        this.dateAdapter.setLocale(this.helperService.readItem("language"))
    }

    private getPeriodFrom(lastYear?: boolean): string {
        const date = new Date(this.fromDate.value)
        return lastYear ? this.getLastYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    private getPeriodTo(lastYear?: boolean): string {
        const date = new Date(this.toDate.value)
        return lastYear ? this.getLastYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    private getMTDFrom(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + '01' : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + '01'
    }

    private getMTDTo(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
    }

    private getYTDFrom(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-01-01' : this.getCurrentYear() + '-01-01'
    }

    private getYTDTo(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]],
            toDate: ['', [Validators.required]]
        })
    }

    private initPeriod(): void {
        this.period.persons = 0
        this.period.adults = 0
        this.period.kids = 0
        this.period.free = 0
        this.period.percent = 0
        this.period.color = 'blue'
    }

    private loadStatisticsForPeriod(viewModel: any, fromDate: string, toDate: string): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getTransfersOverview(fromDate, toDate).toPromise().then((
                response => {
                    this[viewModel] = response
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private loadDetails(viewModel: string, period: string, lastYear?: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getTransfersOverviewDetails(this.periodSelector(period, lastYear)[0], this.periodSelector(period, lastYear)[1]).toPromise().then((
                response => {
                    this[viewModel] = response
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private async loadStatistics(period: string, fromDateFn: string, toDateFn: string): Promise<void> {
        await this.loadStatisticsForPeriod(period, this[fromDateFn](), this[toDateFn]())
        await this.loadStatisticsForPeriod('lastYear' + period, this[fromDateFn](true), this[toDateFn](true))
    }

    private periodSelector(variable: string, lastYear?: boolean): string[] {
        const dates = []
        switch (variable) {
            case 'period':
                dates[0] = this.getPeriodFrom(lastYear)
                dates[1] = this.getPeriodTo(lastYear)
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

    private setActivePeriod(period: string): void {
        document.querySelector('#' + period).classList.add('active')
    }

    private setTopLogoVisibility(visibility?: string): void {
        if (screen.width < 1599 && visibility) {
            document.getElementById('top-logo').style.display = 'flex'
        } else {
            document.getElementById('top-logo').style.display = 'none'
        }
    }

    private setSidebarVisibility(visibility?: string): void {
        if (screen.width < 1599 && visibility) {
            document.getElementById('side-logo').style.opacity = '0'
            document.getElementById('side-image').style.opacity = '0'
            document.getElementById('side-footer').style.opacity = '0'
            document.getElementById('side-bar').style.width = '0'
            document.getElementById('side-bar').style.overflow = 'hidden'
        } else {
            document.getElementById('side-logo').style.opacity = '1'
            document.getElementById('side-image').style.opacity = '1'
            document.getElementById('side-footer').style.opacity = '1'
            document.getElementById('side-bar').style.width = '16.5rem'
        }
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private updateDetailsWithLastYear(): void {
        this.updateDetailsWithLastYearPersons(this.details.totalPersonsPerCustomer, 'totalPersonsPerCustomer')
        this.updateDetailsWithLastYearPersons(this.details.totalPersonsPerDestination, 'totalPersonsPerDestination')
        this.updateDetailsWithLastYearPersons(this.details.totalPersonsPerDriver, 'totalPersonsPerDriver')
        this.updateDetailsWithLastYearPersons(this.details.totalPersonsPerPort, 'totalPersonsPerPort')
        this.updateDetailsWithLastYearPersons(this.details.totalPersonsPerRoute, 'totalPersonsPerRoute')
        this.updateDetailsWithPercentage(this.details.totalPersonsPerCustomer)
        this.updateDetailsWithPercentage(this.details.totalPersonsPerDestination)
        this.updateDetailsWithPercentage(this.details.totalPersonsPerDriver)
        this.updateDetailsWithPercentage(this.details.totalPersonsPerPort)
        this.updateDetailsWithPercentage(this.details.totalPersonsPerRoute)
    }

    private updateDetailsWithPercentage(group: any[]): void {
        group.forEach((element) => { element.percent = this.calculatePercent(element.persons, element.personsLastYear) })
    }

    private updateDetailsWithLastYearPersons(group: any[], variable: string): void {
        group.forEach((element, index) => {
            const found = this.detailsLastYear[variable].filter((x: { description: any }) => x.description == element.description)
            if (found.length > 0) {
                this.details[variable][index].personsLastYear = found[0].persons
            }
        })
    }

    //#endregion

    //#region getters

    get fromDate(): AbstractControl {
        return this.form.get('fromDate')
    }

    get toDate(): AbstractControl {
        return this.form.get('toDate')
    }

    //#endregion    

}
