import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageTableService } from 'src/app/shared/services/messages-table.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'language-menu',
    templateUrl: './language-menu.component.html',
    styleUrls: ['./language-menu.component.css']
})

export class LanguageMenuComponent {

    //#region variables

    public theme = 'light'

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private helperService: HelperService, private messageHintService: MessageHintService, private messageMenuService: MessageMenuService, private messageSnackbarService: MessageSnackbarService, private messageTableService: MessageTableService, private messagelabelService: MessageLabelService,) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.updateTheme()
    }

    ngDoCheck(): void {
        this.compareCurrentThemeWithStored()
    }

    //#endregion

    //#region public methods

    public onGetLanguage(): string {
        return this.helperService.readItem("language") == '' ? this.onSaveLanguage('en-GB') : this.helperService.readItem("language")
    }

    public onSaveLanguage(language: string): string {
        this.helperService.saveItem('language', language)
        this.messageHintService.getMessages()
        this.messageMenuService.getMessages()
        this.messageSnackbarService.getMessages()
        this.messageTableService.getMessages()
        this.messagelabelService.getMessages()
        this.dateAdapter.setLocale(this.helperService.readItem("language"))
        return language
    }

    //#endregion

    //#region private methods

    private compareCurrentThemeWithStored(): void {
        if (this.helperService.readItem('theme') != this.theme) {
            this.theme = this.helperService.readItem('theme')
        }
    }

    private getTheme(): string {
        return this.helperService.readItem('theme')
    }

    private updateTheme(): void {
        this.theme = this.getTheme()
    }

    //#endregion

}
