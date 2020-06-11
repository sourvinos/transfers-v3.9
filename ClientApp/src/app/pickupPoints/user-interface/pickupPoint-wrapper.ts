import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Route } from 'src/app/routes/classes/route';
import { RouteService } from 'src/app/routes/classes/route.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { InteractionService } from 'src/app/shared/services/interaction.service';
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service';

@Component({
    selector: 'pickuppoint-wrapper',
    templateUrl: './pickupPoint-wrapper.html',
    styleUrls: ['./pickupPoint-wrapper.css']
})

export class PickupPointWrapperComponent implements OnInit, OnDestroy {

    //#region 

    ngUnsubscribe = new Subject<void>();
    unlisten: Unlisten
    windowTitle = 'Pickup points'

    //#endregion

    //#region

    id = ''
    routes: Route[] = []

    //#endregion

    constructor(private keyboardShortcutsService: KeyboardShortcuts, private router: Router, private activatedRoute: ActivatedRoute, private helperService: HelperService, private routeService: RouteService, private interactionService: InteractionService, private titleService: Title) { }

    ngOnInit() {
        this.setWindowTitle()
        this.addShortcuts()
        this.populateDropDowns()
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.unsubscribe();
        this.unlisten()
    }

    public onGoBack() {
        this.router.navigate(['/'])
    }

    public onLoadPickupPoints() {
        this.navigateToList()
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': () => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.onGoBack()
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
