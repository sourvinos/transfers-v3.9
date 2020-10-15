import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { MessageHintService } from '../../services/messages-hint.service'
import { MessageLabelService } from '../../services/messages-label.service'
import { MessageMenuService } from '../../services/messages-menu.service'
import { MessageSnackbarService } from '../../services/messages-snackbar.service'
import { MessageTableService } from './../../services/messages-table.service'
import { DateAdapter } from '@angular/material/core'
import { HelperService } from '../../services/helper.service'

@Component({
    selector: 'language-bar',
    templateUrl: './language-bar.component.html',
    styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent {

    constructor(private dateAdapter: DateAdapter<any>, private domSanitizer: DomSanitizer, private helperService: HelperService, private matIconRegistry: MatIconRegistry, private messageHintService: MessageHintService, private messageMenuService: MessageMenuService, private messageSnackbarService: MessageSnackbarService, private messageTableService: MessageTableService, private messagelabelService: MessageLabelService,) {
        this.matIconRegistry
            .addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/en-GB.svg'))
            .addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/de-DE.svg'))
            .addSvgIcon('el', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/el-GR.svg'))
            .addSvgIcon('cs', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/cs-CZ.svg'))
    }

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

}
