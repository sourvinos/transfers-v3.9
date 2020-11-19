import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import moment from 'moment'
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

@Component({
    selector: 'transfer-overview-wrapper',
    templateUrl: './transfer-overview-wrapper.component.html',
    styleUrls: ['../../../assets/styles/lists.css', './transfer-overview-wrapper.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewWrapperComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public feature = 'transferOverviewWrapper'

    //#endregion

    //#region particular variables

    private fromDateISO = ''
    public form: FormGroup
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
        this.focus('fromDate')
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onCheckValidDate(): boolean {
        const date = (<HTMLInputElement>document.getElementById('fromDate')).value
        if (moment(moment(date, 'DD/MM/YYYY')).isValid()) {
            this.fromDateISO = moment(date, 'DD/MM/YYYY').toISOString(true)
            this.fromDateISO = moment(this.fromDateISO).format('YYYY-MM-DD')
            return true
        } else {
            this.fromDateISO = ''
            return false
        }
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

    public onLoadTransfers(): void {
        if (this.onCheckValidDate()) {
            this.navigateToList()
        }
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

    private getLocale(): void {
        this.dateAdapter.setLocale(this.helperService.readItem("language"))
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]]
        })
    }

    private navigateToList(): void {
        const route = 'fromDate/' + this.fromDateISO + '/toDate/' + this.fromDateISO
        this.router.navigate([route], { relativeTo: this.activatedRoute })
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    //#endregion

    //#region getters

    get fromDate(): AbstractControl {
        return this.form.get('fromDate')
    }

    //#endregion    
}
