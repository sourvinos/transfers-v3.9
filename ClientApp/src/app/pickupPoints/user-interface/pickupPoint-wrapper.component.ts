import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Route } from 'src/app/routes/classes/route'
import { RouteService } from 'src/app/routes/classes/route.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { LabelMessageService } from 'src/app/shared/services/label.service'

@Component({
    selector: 'pickuppoint-wrapper',
    templateUrl: './pickupPoint-wrapper.component.html',
    styleUrls: ['../../../assets/styles/lists.css', './pickupPoint-wrapper.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class PickupPointWrapperComponent implements OnInit, OnDestroy {

    //#region 

    ngUnsubscribe = new Subject<void>();
    unlisten: Unlisten
    windowTitle = 'Pickup points'
    feature = 'pickupPointWrapper'

    //#endregion

    //#region

    id = ''
    routes: Route[] = []

    //#endregion

    constructor(private keyboardShortcutsService: KeyboardShortcuts, private router: Router, private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private labelService: LabelMessageService, private routeService: RouteService, private titleService: Title) { }

    ngOnInit() {
        this.setWindowTitle()
        this.addShortcuts()
        this.populateDropDowns()
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    public getLabel(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    public onLoadPickupPoints() {
        this.navigateToList()
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
                }
            }
        }, {
            priority: 0,
            inputs: true
        })
    }

    private navigateToList() {
        this.router.navigate(['routeId/', this.id], { relativeTo: this.activatedRoute })
    }

    private populateDropDowns() {
        this.routeService.getAllActive().subscribe((result: any) => {
            this.routes = result.sort((a: { description: number; }, b: { description: number; }) => (a.description > b.description) ? 1 : -1)
        })
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

}
