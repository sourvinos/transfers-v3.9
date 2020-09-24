import { MessageLabelService } from 'src/app/shared/services/messages-label.service';
import { Component, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'theme-bar',
    templateUrl: './theme-bar.component.html',
    styleUrls: ['./theme-bar.component.css']
})

export class ThemeBarComponent implements OnInit {

    theme = 'light'
    checked: boolean
    feature = 'themeColor'

    constructor(@Inject(DOCUMENT) private document: Document, private messageLabelService: MessageLabelService) { }

    ngOnInit() {
        this.applyTheme()
    }

    public onGetLabel(id: string) {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onToggleTheme() {
        this.changeTheme()
        this.attachStylesheetToHead()
        this.updateLocalStorage()
    }

    private applyTheme() {
        this.updateVariables()
        this.attachStylesheetToHead()
        this.updateLocalStorage()
    }


    private attachStylesheetToHead() {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.theme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private updateLocalStorage() {
        localStorage.setItem('theme', this.theme)
    }

    private changeTheme() {
        this.theme = this.theme == 'light' ? 'dark' : 'light'
    }

    private updateVariables() {
        this.theme = localStorage.getItem('theme') || 'light'
        this.checked = this.theme == 'light' ? false : true
    }

}
