import { CountdownService } from './countdown.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    countdown = 0;
    title = 'ClientApp';
    constructor(private countdownService: CountdownService) { }

    ngOnInit() {
        this.countdownService.reset();
        this.countdownService.countdown.subscribe(data => { this.countdown = data; });
    }


}
