import { HintService } from './../../services/hint.service'
import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { MessageService } from '../../services/message.service'
import { LabelMessageService } from '../../services/label.service'
import { MenuService } from '../../services/menu.service'

@Component({
    selector: 'language-bar',
    templateUrl: './language-bar.component.html',
    styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent {

    constructor(private domSanitizer: DomSanitizer, private hintService: HintService, private labelService: LabelMessageService, private matIconRegistry: MatIconRegistry, private menuService: MenuService, private messageService: MessageService) {
        this.matIconRegistry
        .addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/en.svg'))
        .addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/de.svg'))
        .addSvgIcon('el', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/el.svg'))
        .addSvgIcon('cz', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/cz.svg'))
    }

    public onGetLanguage() {
        return localStorage.getItem("language") == null ? this.onSaveLanguage('en') : localStorage.getItem("language")
    }

    public onSaveLanguage(language: string) {
        localStorage.setItem('language', language)
        this.menuService.getMenuItems()
        this.messageService.getSnackbarMessages()
        this.labelService.getLabelMessages()
        this.hintService.getHintMessages()
        return language
    }

}
