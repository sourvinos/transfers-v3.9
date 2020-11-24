import { Component } from '@angular/core'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    public appName: string

    constructor(private helperService: HelperService) { }

    ngOnInit(): void {
        this.getAppName()
    }

    private getAppName(): void {
        this.appName = this.helperService.getApplicationTitle()
    }

}
