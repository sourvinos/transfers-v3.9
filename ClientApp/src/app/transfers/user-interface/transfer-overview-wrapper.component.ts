import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { TransferFlat } from 'src/app/transfers/classes/transfer-flat'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { DateAdapter } from '@angular/material/core'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import moment from 'moment'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'

@Component({
    selector: 'transfer-overview-wrapper',
    templateUrl: './transfer-overview-wrapper.component.html',
    styleUrls: ['../../../assets/styles/lists.css', './transfer-overview-wrapper.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewWrapperComponent {

    //#region variables

    private dateEnd = ''
    private dateStart = ''
    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public feature = 'transferOverviewWrapper'
    public form: FormGroup
    public input: InputTabStopDirective
    public records: string[] = []
    public transfersFlat: TransferFlat[] = []

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dateAdapter: DateAdapter<any>, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private router: Router, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.getLocale()
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
        this.formatDates()
        this.navigateToList()
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

    private focus(field: string): void {
        this.helperService.setFocus(field)
    }

    private formatDate(date: moment.MomentInput): string {
        let myDate = moment(date, 'DD/MM/YYYY').toISOString(true)
        myDate = moment(date).format('YYYY-MM-DD')
        return myDate
    }

    private formatDates(): void {
        this.dateStart = this.formatDate(this.startDate.value)
        this.dateEnd = this.formatDate(this.endDate.value)
    }

    private getLocale(): void {
        this.dateAdapter.setLocale(this.helperService.readItem("language"))
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]]
        })
    }

    private navigateToList(): void {
        const route = 'fromDate/' + this.dateStart + '/toDate/' + this.dateEnd
        this.router.navigate([route], { relativeTo: this.activatedRoute })
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
