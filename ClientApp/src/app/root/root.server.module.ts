import { NgModule } from '@angular/core'
import { AppModule } from '../root/app.module'
import { RootComponent } from '../root/root.component'

@NgModule({
    imports: [AppModule],
    bootstrap: [RootComponent]
})

export class AppServerModule { }
