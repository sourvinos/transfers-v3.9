import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'theme-bar',
    templateUrl: './theme-bar.component.html',
    styleUrls: ['./theme-bar.component.css']
})

export class ThemeBarComponent {

    //#region variables

    private feature = 'themeColor'
    private theme = 'light'
    public checked: boolean

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private helperService: HelperService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.applyTheme()
    }

    //#endregion

    //#region public methods

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onToggleTheme(): void {
        this.attachStylesheetToHead()
        this.updateLocalStorage()
    }

    //#endregion

    //#region private methods

    private applyTheme(): void {
        this.updateVariables()
        this.attachStylesheetToHead()
        this.updateLocalStorage()
    }

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.theme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private updateLocalStorage(): void {
        this.helperService.saveItem('theme', this.theme)
    }

    private updateVariables(): void {
        this.theme = this.helperService.readItem('theme') || 'light'
        this.checked = this.theme == 'light' ? false : true
    }

    //#endregion

}
