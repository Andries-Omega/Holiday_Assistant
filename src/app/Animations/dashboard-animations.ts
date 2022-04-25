import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export let fade = trigger('fade', [
  state('In', style({ opacity: '1' })),
  state('Out', style({ opacity: '0' })),

  transition('In <=> Out', animate(1000)),
]);

export let slide = trigger('slide', [
  state('left', style({ transform: 'translateX(-250px)' })),
  state('right', style({ transform: 'translateX(250px)' })),
  state('top', style({ 'margin-top': '{{topby}}px', height: '{{height}}px' }), {
    params: { topby: 0, height: 0 },
  }),
  state('bottom', style({ height: '{{height}}px' }), { params: { height: 0 } }),

  transition('* <=> *', animate(350)),
]);

export let sizeAnime = trigger('sizeAnime', [
  state('heightOpen', style({ height: '{{height}}px' }), {
    params: { height: 0 },
  }),
  state('heightClose', style({ height: '{{height}}px' }), {
    params: { height: 0 },
  }),
  state('widthInfluence', style({ width: '{{width}}px' }), {
    params: { width: 0 },
  }),
  transition('* <=> *', animate(500)),
]);

export let rotateAxis = trigger('rotateAxis', [
  state('anti_clockwise', style({ transform: 'rotateZ(-45deg)' })),
  state(
    'clockwiseUp',
    style({ transform: ' rotateZ(45deg)', left: '2px', top: '2px' })
  ),
  state(
    'clockwiseDown',
    style({ transform: ' rotateZ(45deg)', right: '2px', bottom: '2px' })
  ),
  transition('* <=> *', animate(350)),
]);
