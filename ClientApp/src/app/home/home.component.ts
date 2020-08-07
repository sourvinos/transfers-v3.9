import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { HelperService } from '../shared/services/helper.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    windowTitle = 'Home'

    constructor(private helperService: HelperService, private titleService: Title) { }

    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

    ngOnInit() {
        this.setWindowTitle()
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

}
