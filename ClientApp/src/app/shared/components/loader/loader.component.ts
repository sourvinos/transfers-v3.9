import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})

export class LoaderComponent {

    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

}
