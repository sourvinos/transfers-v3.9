import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import moment from 'moment'
import { Subject } from 'rxjs'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { TransferFlat } from 'src/app/transfers/classes/transfer-flat'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { LabelMessageService } from 'src/app/shared/services/label.service'

@Component({
    selector: 'transfer-wrapper',
    templateUrl: './transfer-wrapper.component.html',
    styleUrls: ['../../../assets/styles/lists.css', './transfer-wrapper.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferWrapperComponent implements OnInit, OnDestroy {

    //#region 

    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    windowTitle = 'Transfers'
    feature = 'transferWrapper'

    //#endregion

    //#region 

    dateIn = ''
    dateInISO = ''
    records: string[] = []
    transfersFlat: TransferFlat[] = []

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private labelService: LabelMessageService, private keyboardShortcutsService: KeyboardShortcuts, private router: Router, private titleService: Title) { }

    ngOnInit() {
        this.setWindowTitle()
        this.addShortcuts()
        this.focus('dateIn')
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
        this.removeSelectedIdsFromLocalStorage()
    }

    public getLabel(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    public onGoBack() {
        this.router.navigate(['/'])
    }

    public onLoadTransfers() {
        this.clearSelectedArraysFromLocalStorage()
        if (this.onCheckValidDate()) {
            this.updateLocalStorageWithDate()
            this.navigateToList()
        }
    }

    public onCheckValidDate(): boolean {
        const date = (<HTMLInputElement>document.getElementById('dateIn')).value
        if (date.length === 10) {
            this.dateInISO = moment(date, 'DD/MM/YYYY').toISOString(true)
            this.dateInISO = moment(this.dateInISO).format('YYYY-MM-DD')
            return true
        } else {
            this.dateInISO = ''
            return false
        }
    }

    private addShortcuts() {
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

    private clearSelectedArraysFromLocalStorage() {
        localStorage.removeItem('transfers')
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private navigateToList() {
        this.router.navigate(['date/', this.dateInISO], { relativeTo: this.activatedRoute })
    }

    private removeSelectedIdsFromLocalStorage() {
        localStorage.removeItem('selectedIds')
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private updateLocalStorageWithDate() {
        localStorage.setItem('date', this.dateInISO)
    }

}
