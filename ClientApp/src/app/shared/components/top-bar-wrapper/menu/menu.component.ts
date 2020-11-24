import { Component } from '@angular/core'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'top-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {

    constructor(private helperService: HelperService) { }

    public appName: string

    ngOnInit(): void {
        this.getAppName()
    }

    private getAppName(): void {
        this.appName = this.helperService.getApplicationTitle()
    }

}
