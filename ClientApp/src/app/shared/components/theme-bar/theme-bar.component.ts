import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { Component, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'theme-bar',
    templateUrl: './theme-bar.component.html',
    styleUrls: ['./theme-bar.component.css']
})

export class ThemeBarComponent implements OnInit {

    //#region variables

    theme = 'light'
    checked: boolean
    feature = 'themeColor'

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private messageLabelService: MessageLabelService) { }

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
        localStorage.setItem('theme', this.theme)
    }

    private updateVariables(): void {
        this.theme = localStorage.getItem('theme') || 'light'
        this.checked = this.theme == 'light' ? false : true
    }

    //#endregion

}
