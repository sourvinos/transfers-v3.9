import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations'

export const fade = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1s')
    ]),
])

export const listAnimation = trigger('listAnimation', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('0.1s', [
            animate('0.2s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-75px)', offset: 0 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ]))
        ]), { optional: true })
    ])
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
