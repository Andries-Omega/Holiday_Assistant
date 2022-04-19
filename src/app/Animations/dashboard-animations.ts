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
  state('left', style({ transform: 'translateX(1000px)' })),
  state('right', style({ transform: 'translateX(-1000px)' })),
  transition('* <=> *', animate(1000)),
]);
