import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CountdownService {

    timedOut = false;
    lastPing?: Date = null;
    countdown: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(private idle: Idle, private keepalive: Keepalive) {

        idle.setIdle(1);
        idle.setTimeout(3600);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onTimeout.subscribe(() => { alert('Timeout!'); });
        idle.onTimeoutWarning.subscribe((countdown: number) => { this.countdown.next(countdown); });

        this.keepalive.interval(15);
        keepalive.onPing.subscribe(() => this.lastPing = new Date());
        this.reset();
    }

    reset() {
        this.idle.watch();
        this.timedOut = false;
    }

}
