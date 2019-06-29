import {
  trigger,
  animate,
  transition,
  style,
  query,
  stagger,
  state
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s ease-out')
  ]),
  transition(':leave', [
    animate('.3s ease-out', style({
      opacity: 0
    }))
  ])
]);

export const fadeFastAnimation = trigger('fadeFastAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.1s ease-out')
  ]),
  transition(':leave', [
    animate('.1s ease-out', style({ opacity: 0 }))
  ])
]);

export const fadeScaleAnimation = trigger('fadeScaleAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(.6)', transformOrigin: 'center center' }),
    animate('.2s ease-out')
  ]),
  transition(':leave', [
    animate('.2s ease-out', style({
      opacity: 0, transform: 'scale(.6)', transformOrigin: 'center center'
    }))
  ])
]);

export const fadeOutAnimation = trigger('fadeOutAnimation', [
  // state('in', style({
  //   opacity: 1
  // })),
  transition(':leave', [
    animate(600, style({
      opacity: 0,
    }))
  ])
]);

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s ease-out')
  ])
]);

export const routerAnimation = trigger('routerAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('.15s ease-out', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('.15s ease-out', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
