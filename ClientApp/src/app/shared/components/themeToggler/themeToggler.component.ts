import { Component, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'themeToggler',
    templateUrl: './themeToggler.component.html',
    styleUrls: ['./themeToggler.component.css']
})

export class ThemeTogglerComponent implements OnInit {

    theme = 'light'
    checked: boolean

    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit() {
        this.applyTheme()
    }

    onToggleTheme() {
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
