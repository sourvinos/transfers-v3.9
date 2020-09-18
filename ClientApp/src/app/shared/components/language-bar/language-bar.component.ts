import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { InteractionService } from '../../services/interaction.service'
import { MessageService } from '../../services/snackbar-message.service'
import { LabelService } from '../../services/label.service.'

@Component({
    selector: 'language-bar',
    templateUrl: './language-bar.component.html',
    styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent {

    constructor(private interactionService: InteractionService, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private labelService: LabelService, private messageService: MessageService) {
        this.matIconRegistry
            .addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/en.svg'))
            .addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/de.svg'))
            .addSvgIcon('el', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/el.svg'))
            .addSvgIcon('cz', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/cz.svg'))
    }

    onGetLanguage() {
        return localStorage.getItem("language") == null ? this.onSaveLanguage('en') : localStorage.getItem("language")
    }

    onSaveLanguage(language: string) {
        localStorage.setItem('language', language)
        this.interactionService.updateLanguage(language)
        this.messageService.getMessagesFromJson(language)
        this.labelService.getLabels()
        return language
    }

}
