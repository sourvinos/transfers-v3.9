import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { MessageHintService } from '../../services/messages-hint.service'
import { MessageLabelService } from '../../services/messages-label.service'
import { MessageMenuService } from '../../services/messages-menu.service'
import { MessageSnackbarService } from '../../services/messages-snackbar.service'
import { MessageTableService } from './../../services/messages-table.service'
import { DateAdapter } from '@angular/material/core'

@Component({
    selector: 'language-bar',
    templateUrl: './language-bar.component.html',
    styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent {

    constructor(private dateAdapter: DateAdapter<any>, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private messageHintService: MessageHintService, private messageMenuService: MessageMenuService, private messageSnackbarService: MessageSnackbarService, private messageTableService: MessageTableService, private messagelabelService: MessageLabelService,) {
        this.matIconRegistry
            .addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/en.svg'))
            .addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/de.svg'))
            .addSvgIcon('el', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/el.svg'))
            .addSvgIcon('cz', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/cz.svg'))
    }

    //#region public methods

    public onGetLanguage(): string {
        return localStorage.getItem("language") == null ? this.onSaveLanguage('en-GB') : localStorage.getItem("language")
    }

    public onSaveLanguage(language: string): string {
        localStorage.setItem('language', language)
        this.messageHintService.getMessages()
        this.messageMenuService.getMessages()
        this.messageSnackbarService.getMessages()
        this.messageTableService.getMessages()
        this.messagelabelService.getMessages()
        this.dateAdapter.setLocale(localStorage.getItem("language"))
        return language
    }

    //#endregion

}
