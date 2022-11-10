import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
  } from '@angular/animations';


// Basic

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ], { optional: true })
    ]),
]);


// Positioned

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') ),
    transition('* => isUp', slideTo2('top') ),
    transition('* => isDown', slideTo2('bottom') ),
    transition('isDown => *', slideTo2('top') ),
    transition('isUp => *', slideTo2('bottom') )
  ]);

export const transformer =
  trigger('routeAnimations', [
    transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 }) ),
    transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 }) ),
    transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 }) ),
    transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 }) )
]);

function slideTo(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}

function slideTo2(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        [direction]: 0,
        left: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      //style({ [direction]: '-100%'})
      style({transform: 'translateY(-100%)'})
    ]),
    group([
      query(':leave', [
        //animate('600ms ease', style({ [direction]: '100%'}))
        animate('600ms ease', style({transform: 'translateY(100%)'}))
      ], optional),
      query(':enter', [
        animate('200ms ease', style({transform: 'translateY(0%)'}))
        //animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}


function translateTo({x = 100, y = 0, rotate = 0}) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`})
    ]),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`}))
      ], optional),
      query(':enter', [
        animate('600ms ease-out', style({ transform: `translate(0, 0) rotate(0)`}))
      ])
    ]),
  ];
}