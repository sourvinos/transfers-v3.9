import { trigger, transition, style, animate } from '@angular/animations'

export const fade = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1s')
    ]),
])

export const slideFromLeft = trigger('slideFromLeft', [
    transition(':enter', [
        style({ transform: 'translateX(-100px)' }),
        animate('0.5s ease-out')
    ])
])

export const slideFromRight = trigger('slideFromRight', [
    transition(':enter', [
        style({ transform: 'translateX(400px)' }),
        animate('0.5s ease-out')
    ])
])

export const slideToLeft = trigger('slideToLeft', [
    transition('* => void', [
        animate(2000, style({ opacity: 0 }))
    ])
])
