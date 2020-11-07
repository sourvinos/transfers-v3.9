import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'theme-toggler',
    templateUrl: './theme-toggler.component.html',
    styleUrls: ['./theme-toggler.component.css']
})

export class ThemeTogglerComponent {

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
        this.changeTheme()
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

    private changeTheme(): void {
        this.theme = this.theme == 'light' ? 'dark' : 'light'
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
