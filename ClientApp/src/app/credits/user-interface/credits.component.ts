import { fancyAnimation } from './../../shared/animations/animations'
import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { Subject } from "rxjs"
import { slideFromLeft, slideFromRight } from "src/app/shared/animations/animations"
import { ButtonClickService } from "src/app/shared/services/button-click.service"
import { HelperService } from "src/app/shared/services/helper.service"
import { KeyboardShortcuts, Unlisten } from "src/app/shared/services/keyboard-shortcuts.service"
import { MessageLabelService } from "src/app/shared/services/messages-label.service"

@Component({
    selector: 'credits',
    templateUrl: './credits.component.html',
    styleUrls: ['../../../assets/styles/lists.css', './credits.component.css'],
    animations: [slideFromLeft, slideFromRight, fancyAnimation]
})

export class CreditsComponent {

    //#region variables

    private feature = 'credits'
    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private url = '/credits'
    private windowTitle = 'Credits'

    //#endregion

    //#region particular variables

    public credits = [
        {
            "title": "ASP.NET Core 3 and Angular 9 Third Edition",
            "url": "https://www.packtpub.com/product/asp-net-core-3-and-angular-9-third-edition/9781789612165",
            "about": "Packt (c) 2020"
        },
        {
            "title": "ng-book, The complete guide to Angular",
            "url": "https://www.newline.co/ng-book/2/",
            "about": "Fullstack.io (c) 2020"
        },
        {
            "title": "Pro Angular 9 Fourth Edition",
            "url": "https://www.apress.com/gp/book/9781484259979",
            "about": "Apress (c) 2020"
        },
        {
            "title": "Mosh Hamedani",
            "url": "https://codewithmosh.com/p/asp-net-core",
            "about": "C# & Angular"
        },
        {
            "title": "Kudvenkat",
            "url": "https://www.youtube.com/watch?v=CusfUmB6mkY&list=PL6n9fhu94yhWNJaDgh0mfae_9xoQ4E_Zj",
            "about": "Angular forms"
        },
        {
            "title": "Codevolution",
            "url": "https://www.youtube.com/watch?v=nGr3C3wbh9c&list=PLC3y8-rFHvwhwL-XH04cHOpJnkgRKykFi",
            "about": "Angular forms and Validation"
        },
        {
            "title": "Tech Howdy",
            "url": "https://www.youtube.com/watch?v=ayTm_gxUJ1Y&list=PLHy1vgmVoz-KN3R5Grr30oW1dOW0VmWVT",
            "about": "Refresh tokens"
        },
        {
            "title": "Netanel Basal",
            "url": "https://netbasal.medium.com/",
            "about": "Various issues and problem solving"
        },
        {
            "title": "Amir Rustamzadeh",
            "url": "https://www.cypress.io/",
            "about": "e2e testing"
        },
        {
            "title": "Stackoverflow",
            "url": "https://stackoverflow.com/",
            "about": "Difficult to find acceptable answers, nonetheless loads of solutions"
        },
        {
            "title": "FreePic",
            "url": "https://www.freepik.com/",
            "about": "Images and Icons"
        },
        {
            "title": "Figma",
            "url": "https://www.figma.com/",
            "about": "My drawing board for styling"
        },
        {
            "title": "Iconfinder",
            "url": "https://www.iconfinder.com/",
            "about": "Images and icons"
        },
        {
            "title": "Pinterest",
            "url": "https://www.pinterest.de/zerpixelung/dashboard-ui/",
            "about": "Dashboard design"
        },
    ]

    //#endregion

    constructor(private buttonClickService: ButtonClickService, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private router: Router, private titleService: Title) {
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.addShortcuts()
    }

    ngOnDestroy(): void {
        this.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onClose(): void {
        this.router.navigate([this.url])
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate([this.url])
    }

    public onGotoUrl(url: string): void {
        window.open(url, "_blank")
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
                }
            },
            'Alt.D': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'delete')
            },
            'Alt.S': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'save')
                }
            },
            'Alt.C': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'abort')
                }
            },
            'Alt.O': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'ok')
                }
            }
        }, {
            priority: 1,
            inputs: true
        })
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private unsubscribe(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#endregion

}
