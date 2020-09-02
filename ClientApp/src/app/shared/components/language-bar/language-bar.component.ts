import { Component, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { InteractionService } from '../../services/interaction.service'

@Component({
    selector: 'language-bar',
    templateUrl: './language-bar.component.html',
    styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent implements OnInit {

    language = ''

    constructor(private interactionService: InteractionService, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {
        this.matIconRegistry
            .addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/en.svg'))
            .addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/de.svg'))
            .addSvgIcon('el', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/el.svg'))
            .addSvgIcon('cz', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/flags/cz.svg'))
    }

    ngOnInit(): void {
        this.language = localStorage.getItem("language") || 'en'
    }

    onSaveLanguage(language: string) {
        localStorage.setItem('language', language)
        this.language = language
        this.interactionService.updateLanguage(this.language)
    }

}
