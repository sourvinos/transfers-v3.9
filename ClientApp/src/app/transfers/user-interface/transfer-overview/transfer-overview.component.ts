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
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Subject } from 'rxjs'
import { Title } from '@angular/platform-browser'
import { TransferOverviewViewModel } from './../../classes/transferOverviewViewModel'
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

    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public LastYearMTD = new TransferOverviewViewModel
    public LastYearYTD = new TransferOverviewViewModel
    public LastYearPeriod = new TransferOverviewViewModel
    public MTD = new TransferOverviewViewModel
    public YTD = new TransferOverviewViewModel
    public Period = new TransferOverviewViewModel
    public feature = 'transferOverviewWrapper'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    constructor(private buttonClickService: ButtonClickService, private dateAdapter: DateAdapter<any>, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private router: Router, private transferService: TransferService, private snackbarService: SnackbarService, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.getLocale()
        this.initPeriod()
        this.loadRecords('MTD', this.getMTDFrom(), this.getMTDTo())
        this.loadRecords('LastYearMTD', this.getMTDFrom(true), this.getMTDTo(true))
        this.loadRecords('YTD', this.getYTDFrom(), this.getYTDTo())
        this.loadRecords('LastYearYTD', this.getYTDFrom(true), this.getYTDTo(true))
        setTimeout(() => {
            this.calculatePercent('MTD', this.MTD.persons, this.LastYearMTD.persons)
            this.calculatePercent('YTD', this.YTD.persons, this.LastYearYTD.persons)
        }, 1000)
    }

    ngAfterViewInit(): void {
        this.focus('startDate')
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onDoJobs(): void {
        this.loadRecords('Period', this.getPeriodFrom(), this.getPeriodTo())
        this.loadRecords('LastYearPeriod', this.getPeriodFrom(true), this.getPeriodTo(true))
        setTimeout(() => {
            this.calculatePercent('Period', this.Period.persons, this.LastYearPeriod.persons)
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

    private calculatePercent(variable: string, currentYearPersons: number, lastYearPersons: number): void {
        let percent = (100 * currentYearPersons / lastYearPersons) - 100
        if (isNaN(percent)) {
            percent = 0
        }
        if (percent == Infinity) {
            percent = 100
        }
        if (percent == 0) {
            this[variable].color = 'blue'
            this[variable].percent = '(' + percent.toFixed(2) + '%)'
        }
        if (percent > 0) {
            this[variable].color = 'green'
            this[variable].percent = '(▲' + percent.toFixed(2) + '%)'
        }
        if (percent < 0) {
            this[variable].color = 'red'
            this[variable].percent = '(▼' + (percent * -1).toFixed(2) + '%)'
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
            const date = this.getLastYear() + '-' + this.startDate.value.format('MM') + '-' + this.startDate.value.format('DD')
            return date
        }
        const date = this.startDate.value.format('YYYY-MM-DD')
        return date
    }

    private getPeriodTo(lastYear?: boolean): string {
        if (lastYear) {
            const date = this.getLastYear() + '-' + this.endDate.value.format('MM') + '-' + this.endDate.value.format('DD')
            return date
        }
        const date = this.endDate.value.format('YYYY-MM-DD')
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
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]]
        })
    }

    private initPeriod(): void {
        this.Period.persons = 0
        this.Period.adults = 0
        this.Period.kids = 0
        this.Period.free = 0
        this.Period.percent = '(0.00%)'
        this.Period.color = 'blue'
    }

    private loadRecords(variable: any, fromDate: string, toDate: string): Promise<any> {
        const promise = new Promise((resolve) => {
            this.transferService.getTransfersOverview(fromDate, toDate).toPromise().then((
                response => {
                    this[variable] = response
                    resolve(this[variable])
                }))
        })
        return promise
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    //#endregion

    //#region getters

    get startDate(): AbstractControl {
        return this.form.get('startDate')
    }

    get endDate(): AbstractControl {
        return this.form.get('endDate')
    }

    //#endregion    

}
