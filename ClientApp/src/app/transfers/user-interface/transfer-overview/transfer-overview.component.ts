import moment from 'moment'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { Component } from '@angular/core'
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

@Component({
    selector: 'transfer-overview',
    templateUrl: './transfer-overview.component.html',
    styleUrls: ['../../../../assets/styles/lists.css', './transfer-overview.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewComponent {

    //#region variables

    public period = new TransferOverviewViewModel
    public mtd = new TransferOverviewViewModel
    public ytd = new TransferOverviewViewModel

    public kastYearPeriod = new TransferOverviewViewModel
    public lastYearMtd = new TransferOverviewViewModel
    public lastYearYtd = new TransferOverviewViewModel

    public details = new TransferOverviewViewModel
    public lastYearDetails = new TransferOverviewViewModel

    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public feature = 'transferOverviewWrapper'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    constructor(private buttonClickService: ButtonClickService, private dateAdapter: DateAdapter<any>, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private router: Router, private transferService: TransferService, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.getLocale()
        this.initPeriod()
        this.loadRecords('mtd', this.getMTDFrom(), this.getMTDTo())
        this.loadRecords('lastYearMtd', this.getMTDFrom(true), this.getMTDTo(true))
        this.loadRecords('ytd', this.getYTDFrom(), this.getYTDTo())
        this.loadRecords('lastYearYtd', this.getYTDFrom(true), this.getYTDTo(true))
        setTimeout(() => {
            this.mtd.percent = this.calculatePercent(this.mtd.persons, this.lastYearMtd.persons)
            this.ytd.percent = this.calculatePercent(this.ytd.persons, this.lastYearYtd.persons)
            this.mtd.color = this.colorizePercent(this.mtd.percent)
            this.ytd.color = this.colorizePercent(this.ytd.percent)
            // console.log(this.mtd)
        }, 1000)
    }

    ngAfterViewInit(): void {
        this.focus('fromDate')
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onDoJobs(): void {
        this.loadRecords('period', this.getPeriodFrom(), this.getPeriodTo())
        this.loadRecords('lastYearPeriod', this.getPeriodFrom(true), this.getPeriodTo(true))
        setTimeout(() => {
            this.period.percent = this.calculatePercent(this.period.persons, this.lastYearDetails.persons)
            this.period.color = this.colorizePercent(this.period.percent)
        }, 1000)
    }

    public onGetHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate(['/'])
    }

    public onLoadDetails(viewModel: string, period: string): void {
        this.loadDetails(viewModel, period)
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
        const percent = (100 * currentYearPersons / lastYearPersons) - 100
        switch (true) {
            case (percent == Infinity):
                return 100
            case (isNaN(percent)):
                return 0
            default:
                return percent
        }
    }

    private colorizePercent(percent: number): string {
        switch (true) {
            case (percent == 0 || isNaN(percent)):
                return 'blue'
            case (percent == Infinity || percent > 0):
                return 'green'
            case (percent < 0):
                return 'red'
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

    private getMTDFrom(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + '01' : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + '01'
    }

    private getMTDTo(lastYear?: boolean): string {
        return lastYear ? this.getLastYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay() : this.getCurrentYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDay()
    }

    private getPeriodFrom(lastYear?: boolean): string {
        if (lastYear) {
            const date = this.getLastYear() + '-' + this.fromDate.value.format('MM') + '-' + this.fromDate.value.format('DD')
            return date
        }
        const date = this.fromDate.value.format('YYYY-MM-DD')
        return date
    }

    private getPeriodTo(lastYear?: boolean): string {
        if (lastYear) {
            const date = this.getLastYear() + '-' + this.toDate.value.format('MM') + '-' + this.toDate.value.format('DD')
            return date
        }
        const date = this.toDate.value.format('YYYY-MM-DD')
        return date

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
        this.period.percent = 0.00
        this.period.color = 'blue'
    }

    private loadRecords(viewModel: any, fromDate: string, toDate: string): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getTransfersOverview(fromDate, toDate).toPromise().then((
                response => {
                    this[viewModel] = response
                    // console.log(this[viewModel])
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private loadDetails(viewModel: string, period: string, lastYear?: boolean): Promise<any> {
        console.log('Loading details for period', period)
        const promise = new Promise((resolve) => {
            this.transferService.getTransfersOverviewDetails(this.periodSelector(period, lastYear)[0], this.periodSelector(period, lastYear)[1]).toPromise().then((
                response => {
                    this[viewModel] = response
                    console.log('Details', this[viewModel])
                    resolve(this[viewModel])
                }))
        })
        return promise
    }

    private periodSelector(variable: string, lastYear?: boolean): string[] {
        const dates = []
        switch (variable) {
            case 'period':
                dates[0] = this.fromDate.value
                dates[1] = this.toDate.value
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


    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
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
