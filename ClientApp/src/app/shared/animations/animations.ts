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
        style({ transform: 'translateX(100px)' }),
        animate('0.5s ease-out')
    ])
])

export const slideFromBottom = trigger('slideFromBottom', [
    transition(':enter', [
        style({ transform: 'translateY(150px)' }),
        animate('2s ease-out')
    ])
])
