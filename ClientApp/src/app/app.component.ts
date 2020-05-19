import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    countdown = 0;
    title = 'ClientApp';
    constructor(private userIdle: UserIdleService) { }
    ngOnInit() {
        console.log('Init');
        this.userIdle.startWatching();
        this.userIdle.onTimerStart().subscribe(count => { console.log(count); });
        this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
    }

    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }

}
